import * as React from 'react';
import styles from './space.module.css';
import type { SpaceCompactProps } from './types';

function cn(...args: (string | false | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export const SpaceCompact = React.forwardRef<HTMLDivElement, SpaceCompactProps>(
  function SpaceCompact(props, ref) {
    const {
      direction = 'horizontal',
      block = false,
      className,
      children,
      ...rest
    } = props;

    const classes = cn(
      styles.compact,
      direction === 'vertical'
        ? styles.compactVertical
        : styles.compactHorizontal,
      block && styles.compactBlock,
      className,
    );

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);
