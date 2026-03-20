import * as React from 'react';

export type SwitchSize = 'small' | 'default';

export interface SwitchProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'onChange' | 'value'
  > {
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean, event: React.MouseEvent) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Size */
  size?: SwitchSize;
  /** Content when checked */
  checkedChildren?: React.ReactNode;
  /** Content when unchecked */
  unCheckedChildren?: React.ReactNode;
  'aria-label'?: string;
  'data-testid'?: string;
}
