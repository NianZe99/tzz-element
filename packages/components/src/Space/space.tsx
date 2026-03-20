import * as React from 'react';
import styles from './space.module.css';
import type { SpaceProps, SpaceSize } from './types';

function resolveSize(size: SpaceSize): number {
  if (typeof size === 'number') return size;
  const map = { small: 8, middle: 16, large: 24 };
  return map[size] ?? 16;
}

function cn(...args: (string | false | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
  function Space(props, ref) {
    const {
      size = 'middle',
      direction = 'horizontal',
      align,
      wrap = false,
      split,
      className,
      children,
      style,
      ...rest
    } = props;

    const [colGap, rowGap] = Array.isArray(size)
      ? [resolveSize(size[0]), resolveSize(size[1])]
      : [resolveSize(size), resolveSize(size)];

    const alignMap = {
      start: styles.alignStart,
      end: styles.alignEnd,
      center: styles.alignCenter,
      baseline: styles.alignBaseline,
    } as const;

    const resolvedAlign =
      align ?? (direction === 'horizontal' ? 'center' : undefined);

    const classes = cn(
      styles.space,
      direction === 'vertical' ? styles.vertical : styles.horizontal,
      wrap && styles.wrap,
      resolvedAlign && alignMap[resolvedAlign],
      className,
    );

    const items = React.Children.toArray(children).filter(
      (c) => c !== null && c !== undefined,
    );

    return (
      <div
        ref={ref}
        className={classes}
        style={{ gap: `${rowGap}px ${colGap}px`, ...style }}
        {...rest}
      >
        {items.map((child, i) => (
          <React.Fragment key={(child as React.ReactElement).key ?? i}>
            {child}
            {split && i < items.length - 1 && (
              <span className={styles.split}>{split}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  },
);
