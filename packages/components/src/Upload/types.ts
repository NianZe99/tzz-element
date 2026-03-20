import * as React from 'react';

export type UploadListType = 'text' | 'picture' | 'picture-card';
export type UploadFileStatus = 'uploading' | 'done' | 'error' | 'removed';

export interface UploadFile {
  uid: string;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  size?: number;
  type?: string;
  url?: string;
  thumbUrl?: string;
  originFileObj?: File;
  response?: any;
  error?: any;
}

export interface UploadRequestOption {
  file: File;
  filename?: string;
  onProgress?: (event: { percent: number }) => void;
  onSuccess?: (response: any) => void;
  onError?: (error: Error) => void;
  headers?: Record<string, string>;
  data?: Record<string, any>;
  action?: string;
}

export interface UploadProps {
  /** Upload URL */
  action?: string;
  /** Accepted file types */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Max number of files */
  maxCount?: number;
  /** Controlled file list */
  fileList?: UploadFile[];
  /** Default file list */
  defaultFileList?: UploadFile[];
  /** File list type */
  listType?: UploadListType;
  /** Show upload list */
  showUploadList?: boolean;
  /** Allow directory upload */
  directory?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Custom request handler (overrides built-in XHR) */
  customRequest?: (options: UploadRequestOption) => void;
  /** Called before upload; return false to abort, return Promise for async */
  beforeUpload?: (
    file: File,
    fileList: File[],
  ) => boolean | Promise<boolean | File>;
  /** Called when file list changes */
  onChange?: (info: { file: UploadFile; fileList: UploadFile[] }) => void;
  /** Called when file is removed */
  onRemove?: (file: UploadFile) => boolean | Promise<boolean> | void;
  /** Extra data to send with request */
  data?: Record<string, any>;
  /** Request headers */
  headers?: Record<string, string>;
  /** Field name for file in the request */
  name?: string;
  /** Trigger element */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

export interface DraggerProps extends UploadProps {
  /** Height of dragger area */
  height?: number | string;
}
