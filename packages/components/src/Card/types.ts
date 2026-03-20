import * as React from 'react';

export type CardSize = 'default' | 'small';

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card title */
  title?: React.ReactNode;
  /** Extra content in top-right corner */
  extra?: React.ReactNode;
  /** Cover image at top */
  cover?: React.ReactNode;
  /** Card size */
  size?: CardSize;
  /** Show border */
  bordered?: boolean;
  /** Lift on hover */
  hoverable?: boolean;
  /** Action list at bottom */
  actions?: React.ReactNode[];
  /** Body style */
  bodyStyle?: React.CSSProperties;
  /** Header style */
  headStyle?: React.CSSProperties;
  /** Loading skeleton */
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface CardMetaProps {
  /** Avatar element */
  avatar?: React.ReactNode;
  /** Title text */
  title?: React.ReactNode;
  /** Description text */
  description?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
