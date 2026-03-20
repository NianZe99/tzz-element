import * as React from 'react';

export type InputSize = 'small' | 'middle' | 'large';
export type InputVariant = 'outlined' | 'filled' | 'borderless';
export type InputStatus = 'error' | 'warning';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Size of the input */
  size?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
  /** Validation status */
  status?: InputStatus;
  /** Prefix icon or text */
  prefix?: React.ReactNode;
  /** Suffix icon or text */
  suffix?: React.ReactNode;
  /** Show clear button */
  allowClear?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  'data-testid'?: string;
}

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Size of the textarea */
  size?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
  /** Validation status */
  status?: InputStatus;
  /** Show clear button */
  allowClear?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Auto-resize to fit content; pass object for min/max rows */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /** Show character count */
  showCount?: boolean;
  'data-testid'?: string;
}
