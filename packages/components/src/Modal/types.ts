import * as React from 'react';

export interface ModalProps {
  /** Whether the modal is visible */
  open?: boolean;
  /** Title */
  title?: React.ReactNode;
  /** Footer content; set to null to hide */
  footer?: React.ReactNode | null;
  /** Width of the modal */
  width?: number | string;
  /** Center vertically */
  centered?: boolean;
  /** Show close button */
  closable?: boolean;
  /** Close when clicking mask */
  maskClosable?: boolean;
  /** Close when pressing ESC */
  keyboard?: boolean;
  /** Destroy child on close */
  destroyOnClose?: boolean;
  /** OK button loading state */
  confirmLoading?: boolean;
  /** OK button text */
  okText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** OK button type */
  okType?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  /** OK button danger */
  okDanger?: boolean;
  /** Callback when OK is clicked */
  onOk?: (e: React.MouseEvent) => void;
  /** Callback when cancel / close */
  onCancel?: (e: React.MouseEvent) => void;
  /** After close animation ends */
  afterClose?: () => void;
  /** z-index */
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  'data-testid'?: string;
}

export interface ModalFuncProps
  extends Omit<ModalProps, 'onCancel' | 'children'> {
  content?: React.ReactNode;
  icon?: React.ReactNode;
  type?: 'info' | 'success' | 'error' | 'warning' | 'confirm';
  onCancel?: () => void;
}
