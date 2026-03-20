import * as React from 'react';
import styles from './card.module.css';
import type { CardMetaProps, CardProps } from './types';

function cn(...args: (string | false | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

const CardMeta: React.FC<CardMetaProps> = ({
  avatar,
  title,
  description,
  className,
  style,
}) => (
  <div className={cn(styles.meta, className)} style={style}>
    {avatar && <div className={styles.metaAvatar}>{avatar}</div>}
    <div className={styles.metaDetail}>
      {title && <div className={styles.metaTitle}>{title}</div>}
      {description && (
        <div className={styles.metaDescription}>{description}</div>
      )}
    </div>
  </div>
);

const LoadingSkeleton: React.FC = () => (
  <div className={styles.skeleton}>
    <div className={styles.skeletonLine} />
    <div className={styles.skeletonLine} />
    <div className={styles.skeletonLine} />
  </div>
);

const InternalCard = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  props,
  ref,
) {
  const {
    title,
    extra,
    cover,
    size = 'default',
    bordered = true,
    hoverable = false,
    actions,
    bodyStyle,
    headStyle,
    loading = false,
    className,
    children,
    ...rest
  } = props;

  const isSmall = size === 'small';

  const classes = cn(
    styles.card,
    bordered && styles.bordered,
    hoverable && styles.hoverable,
    className,
  );

  const head =
    title || extra ? (
      <div
        className={cn(styles.head, isSmall && styles.headSmall)}
        style={headStyle}
      >
        {title && <div className={styles.title}>{title}</div>}
        {extra && <div className={styles.extra}>{extra}</div>}
      </div>
    ) : null;

  return (
    <div ref={ref} className={classes} {...rest}>
      {cover && <div className={styles.cover}>{cover}</div>}
      {head}
      <div
        className={cn(styles.body, isSmall && styles.bodySmall)}
        style={bodyStyle}
      >
        {loading ? <LoadingSkeleton /> : children}
      </div>
      {actions && actions.length > 0 && (
        <ul className={styles.actions}>
          {actions.map((action, i) => (
            <li key={i} className={styles.actionItem}>
              {action}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

type CardType = typeof InternalCard & {
  Meta: typeof CardMeta;
};

const Card = InternalCard as CardType;
Card.Meta = CardMeta;

export { Card };
