import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import type { DraggerProps } from './types';
import { Upload } from './upload';
import styles from './upload.module.css';

function cn(...args: (string | false | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

const InboxIcon = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" />
  </svg>
);

export const UploadDragger = React.forwardRef<HTMLDivElement, DraggerProps>(
  function UploadDragger(props, ref) {
    const { height, disabled, className, children, ...uploadProps } = props;
    const [dragOver, setDragOver] = useState(false);
    const dragCounterRef = useRef(0);

    const handleDragEnter = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      dragCounterRef.current++;
      setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      dragCounterRef.current--;
      if (dragCounterRef.current <= 0) {
        setDragOver(false);
        dragCounterRef.current = 0;
      }
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        dragCounterRef.current = 0;
        if (disabled) return;
        // Handled by parent Upload via onChange
      },
      [disabled],
    );

    return (
      <Upload ref={ref} disabled={disabled} {...uploadProps}>
        <div
          className={cn(
            styles.dragger,
            dragOver && styles.draggerActive,
            disabled && styles.draggerDisabled,
            className,
          )}
          style={height ? { height } : undefined}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {children ?? (
            <>
              <div className={styles.draggerIcon}>
                <InboxIcon />
              </div>
              <div className={styles.draggerText}>
                点击或拖拽文件到此区域上传
              </div>
              <div className={styles.draggerHint}>支持单个或批量上传</div>
            </>
          )}
        </div>
      </Upload>
    );
  },
);
