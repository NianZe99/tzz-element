import * as React from 'react';

export type SelectSize = 'small' | 'middle' | 'large';
export type SelectVariant = 'outlined' | 'filled' | 'borderless';
export type SelectStatus = 'error' | 'warning';

export interface SelectOptionType {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps {
  /** Options list */
  options?: SelectOptionType[];
  /** Controlled value */
  value?: string | number | (string | number)[];
  /** Default value */
  defaultValue?: string | number | (string | number)[];
  /** Change handler */
  onChange?: (
    value: string | number | (string | number)[],
    option: SelectOptionType | SelectOptionType[],
  ) => void;
  /** Placeholder */
  placeholder?: string;
  /** Size */
  size?: SelectSize;
  /** Variant */
  variant?: SelectVariant;
  /** Status */
  status?: SelectStatus;
  /** Disabled */
  disabled?: boolean;
  /** Show clear button */
  allowClear?: boolean;
  /** Multiple select mode */
  mode?: 'multiple' | 'tags';
  /** Enable search */
  showSearch?: boolean;
  /** Search filter function */
  filterOption?:
    | boolean
    | ((input: string, option: SelectOptionType) => boolean);
  /** Not found content */
  notFoundContent?: React.ReactNode;
  /** Dropdown placement */
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  /** Controlled open state */
  open?: boolean;
  /** Open change callback */
  onOpenChange?: (open: boolean) => void;
  /** Search callback */
  onSearch?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}
