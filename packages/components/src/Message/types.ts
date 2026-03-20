import * as React from 'react';

export type MessageType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export interface MessageConfig {
  /** Message content */
  content: React.ReactNode;
  /** Duration in seconds (0 = no auto close) */
  duration?: number;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Unique key for update/close */
  key?: string;
  /** Callback on close */
  onClose?: () => void;
  /** Custom class */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface MessageInstance {
  info: (content: React.ReactNode | MessageConfig, duration?: number) => void;
  success: (
    content: React.ReactNode | MessageConfig,
    duration?: number,
  ) => void;
  error: (content: React.ReactNode | MessageConfig, duration?: number) => void;
  warning: (
    content: React.ReactNode | MessageConfig,
    duration?: number,
  ) => void;
  loading: (
    content: React.ReactNode | MessageConfig,
    duration?: number,
  ) => void;
  destroy: (key?: string) => void;
}

export interface InternalMessage {
  id: string;
  type: MessageType;
  content: React.ReactNode;
  duration: number;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
}
