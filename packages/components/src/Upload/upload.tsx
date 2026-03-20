import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import type { UploadFile, UploadProps, UploadRequestOption } from './types';
import styles from './upload.module.css';

function cn(...args: (string | false | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

let uidCounter = 0;
function genUid(): string {
  return `tzz-upload-${Date.now()}-${++uidCounter}`;
}

const FileIcon = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" />
  </svg>
);

const DeleteIcon = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
  </svg>
);

function defaultRequest(options: UploadRequestOption) {
  const { file, action, data, headers, onProgress, onSuccess, onError } =
    options;
  const formData = new FormData();
  formData.append(options.filename ?? 'file', file);
  if (data) {
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
  }

  const xhr = new XMLHttpRequest();
  xhr.open('POST', action ?? '');

  if (headers) {
    Object.entries(headers).forEach(([k, v]) => xhr.setRequestHeader(k, v));
  }

  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      onProgress?.({ percent: Math.round((e.loaded / e.total) * 100) });
    }
  });

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      onSuccess?.(xhr.response);
    } else {
      onError?.(new Error(`Upload failed with status ${xhr.status}`));
    }
  });

  xhr.addEventListener('error', () => {
    onError?.(new Error('Upload failed'));
  });

  xhr.send(formData);
}

export const Upload = React.forwardRef<HTMLDivElement, UploadProps>(
  function Upload(props, ref) {
    const {
      action,
      accept,
      multiple = false,
      maxCount,
      fileList: controlledFileList,
      defaultFileList = [],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      listType = 'text',
      showUploadList = true,
      directory = false,
      disabled = false,
      customRequest,
      beforeUpload,
      onChange,
      onRemove,
      data,
      headers,
      name: fieldName = 'file',
      children,
      className,
      style,
      ...rest
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const [innerFileList, setInnerFileList] =
      useState<UploadFile[]>(defaultFileList);
    const isControlled = controlledFileList !== undefined;
    const mergedFileList = isControlled ? controlledFileList : innerFileList;

    const updateFileList = useCallback(
      (updater: (prev: UploadFile[]) => UploadFile[]) => {
        const newList = updater(mergedFileList);
        if (!isControlled) setInnerFileList(newList);
        return newList;
      },
      [mergedFileList, isControlled],
    );

    const uploadFile = useCallback(
      (file: File) => {
        const uploadFile: UploadFile = {
          uid: genUid(),
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploading',
          percent: 0,
          originFileObj: file,
        };

        const newList = updateFileList((prev) => [...prev, uploadFile]);
        onChange?.({ file: uploadFile, fileList: newList });

        const requestFn = customRequest ?? defaultRequest;
        requestFn({
          file,
          filename: fieldName,
          action,
          data,
          headers,
          onProgress: ({ percent }) => {
            const updated = updateFileList((prev) =>
              prev.map((f) =>
                f.uid === uploadFile.uid
                  ? { ...f, percent, status: 'uploading' as const }
                  : f,
              ),
            );
            onChange?.({
              file: { ...uploadFile, percent, status: 'uploading' },
              fileList: updated,
            });
          },
          onSuccess: (response) => {
            const updated = updateFileList((prev) =>
              prev.map((f) =>
                f.uid === uploadFile.uid
                  ? { ...f, status: 'done' as const, percent: 100, response }
                  : f,
              ),
            );
            onChange?.({
              file: { ...uploadFile, status: 'done', percent: 100, response },
              fileList: updated,
            });
          },
          onError: (error) => {
            const updated = updateFileList((prev) =>
              prev.map((f) =>
                f.uid === uploadFile.uid
                  ? { ...f, status: 'error' as const, error }
                  : f,
              ),
            );
            onChange?.({
              file: { ...uploadFile, status: 'error', error },
              fileList: updated,
            });
          },
        });
      },
      [
        action,
        customRequest,
        data,
        headers,
        fieldName,
        onChange,
        updateFileList,
      ],
    );

    const handleFiles = useCallback(
      async (files: File[]) => {
        if (disabled) return;

        let filesToUpload = files;
        if (maxCount) {
          const remaining = maxCount - mergedFileList.length;
          filesToUpload = files.slice(0, Math.max(0, remaining));
        }

        for (const file of filesToUpload) {
          if (beforeUpload) {
            try {
              const result = await beforeUpload(file, filesToUpload);
              if (result === false) continue;
              if (result instanceof File) {
                uploadFile(result);
                continue;
              }
            } catch {
              continue;
            }
          }
          uploadFile(file);
        }
      },
      [disabled, maxCount, mergedFileList.length, beforeUpload, uploadFile],
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      handleFiles(files);
      if (inputRef.current) inputRef.current.value = '';
    };

    const handleRemove = async (file: UploadFile) => {
      if (onRemove) {
        const result = await onRemove(file);
        if (result === false) return;
      }
      const newList = updateFileList((prev) =>
        prev.filter((f) => f.uid !== file.uid),
      );
      onChange?.({ file: { ...file, status: 'removed' }, fileList: newList });
    };

    const triggerClick = () => {
      if (disabled) return;
      inputRef.current?.click();
    };

    const renderFileList = () => {
      if (!showUploadList || mergedFileList.length === 0) return null;

      return (
        <ul className={styles.fileList}>
          {mergedFileList.map((file) => (
            <li key={file.uid}>
              <div className={styles.fileItem}>
                <span className={styles.fileIcon}>
                  <FileIcon />
                </span>
                <span
                  className={cn(
                    styles.fileName,
                    file.status === 'error' && styles.fileNameError,
                  )}
                >
                  {file.url ? (
                    <a href={file.url} target="_blank" rel="noreferrer">
                      {file.name}
                    </a>
                  ) : (
                    file.name
                  )}
                </span>
                <span className={styles.fileActions}>
                  <button
                    type="button"
                    className={styles.fileActionBtn}
                    onClick={() => handleRemove(file)}
                    aria-label="Remove file"
                  >
                    <DeleteIcon />
                  </button>
                </span>
              </div>
              {file.status === 'uploading' && (
                <div className={styles.progress}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${file.percent ?? 0}%` }}
                  />
                </div>
              )}
              {file.status === 'error' && (
                <div className={styles.progress}>
                  <div
                    className={cn(styles.progressBar, styles.progressBarError)}
                    style={{ width: '100%' }}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(styles.wrapper, className)}
        style={style}
        {...rest}
      >
        <input
          ref={inputRef}
          type="file"
          className={styles.fileInput}
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          {...(directory
            ? ({ webkitdirectory: '', directory: '' } as any)
            : {})}
        />
        <div
          className={cn(styles.trigger, disabled && styles.triggerDisabled)}
          onClick={triggerClick}
        >
          {children}
        </div>
        {renderFileList()}
      </div>
    );
  },
);
