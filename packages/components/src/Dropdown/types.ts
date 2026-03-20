import * as React from 'react';

export type DropdownPlacement =
  | 'bottomLeft'
  | 'bottomRight'
  | 'bottomCenter'
  | 'topLeft'
  | 'topRight'
  | 'topCenter';

export type DropdownTrigger = 'hover' | 'click' | 'contextMenu';

export interface MenuItemType {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  type?: 'item' | 'divider';
  onClick?: (info: { key: string; domEvent: React.MouseEvent }) => void;
}

export interface DropdownProps {
  /** Menu items */
  items?: MenuItemType[];
  /** Trigger element */
  children: React.ReactElement;
  /** Trigger mode */
  trigger?: DropdownTrigger[];
  /** Controlled visibility */
  open?: boolean;
  /** Default visibility */
  defaultOpen?: boolean;
  /** Visibility change callback */
  onOpenChange?: (open: boolean) => void;
  /** Placement of dropdown */
  placement?: DropdownPlacement;
  /** Disabled state */
  disabled?: boolean;
  /** Overlay class name */
  overlayClassName?: string;
  /** Overlay style */
  overlayStyle?: React.CSSProperties;
  /** Click item callback */
  onItemClick?: (info: { key: string; domEvent: React.MouseEvent }) => void;
  /** Auto close after click */
  autoClose?: boolean;
}
