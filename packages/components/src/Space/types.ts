import * as React from 'react';

export type SpaceSize = 'small' | 'middle' | 'large' | number;
export type SpaceDirection = 'horizontal' | 'vertical';
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap size between items */
  size?: SpaceSize | [SpaceSize, SpaceSize];
  /** Layout direction */
  direction?: SpaceDirection;
  /** Cross-axis alignment */
  align?: SpaceAlign;
  /** Allow items to wrap */
  wrap?: boolean;
  /** Custom separator between items */
  split?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export interface SpaceCompactProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of compact group */
  direction?: 'horizontal' | 'vertical';
  /** Size for children */
  size?: 'small' | 'middle' | 'large';
  /** Make children fill available space */
  block?: boolean;
  className?: string;
  children?: React.ReactNode;
}
