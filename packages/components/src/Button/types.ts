import * as React from 'react';

export type ButtonType = 'default' | 'primary' | 'dashed' | 'text' | 'link';
export type ButtonShape = 'default' | 'circle' | 'round';
export type ButtonSize = 'small' | 'middle' | 'large';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'disabled'
>;

type NativeAnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'type'
>;

type SharedProps = {
  /** Visual type of the button */
  type?: ButtonType;
  /** Button shape */
  shape?: ButtonShape;
  /** Button size */
  size?: ButtonSize;
  /** Danger style */
  danger?: boolean;
  /** Ghost style (transparent background) */
  ghost?: boolean;
  /** Full width */
  block?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state; pass object with delay (ms) to debounce */
  loading?: boolean | { delay?: number };
  /** Icon element */
  icon?: React.ReactNode;
  /** Icon position */
  iconPlacement?: 'start' | 'end';
  /** Polymorphic: inject props onto child element (single ReactElement required) */
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  'aria-label'?: string;
  'data-testid'?: string;
};

export interface ButtonProps extends SharedProps, NativeButtonProps {
  /** Native button type attribute */
  htmlType?: ButtonHTMLType;
  /** When provided, renders an <a> element instead of <button> */
  href?: string;
  target?: string;
}

export type AnchorButtonProps = SharedProps &
  NativeAnchorProps & {
    href: string;
  };
