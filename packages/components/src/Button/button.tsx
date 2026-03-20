import * as React from 'react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './button.module.css';
import type { ButtonProps } from './types';
import { Slot, cn } from './utils';

function hasReadableText(node: React.ReactNode): boolean {
  if (node === null || node === undefined || typeof node === 'boolean')
    return false;
  if (typeof node === 'string' || typeof node === 'number')
    return String(node).trim().length > 0;
  if (Array.isArray(node)) return node.some(hasReadableText);
  if (React.isValidElement(node)) return hasReadableText(node.props.children);
  return false;
}

interface LoadingConfig {
  loading: boolean;
  delay: number;
}

function getLoadingConfig(loading: ButtonProps['loading']): LoadingConfig {
  if (typeof loading === 'object' && loading) {
    const delay =
      typeof loading.delay === 'number' && !Number.isNaN(loading.delay)
        ? loading.delay
        : 0;
    return { loading: delay <= 0, delay };
  }
  return { loading: !!loading, delay: 0 };
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    type = 'default',
    shape = 'default',
    size = 'middle',
    danger = false,
    ghost = false,
    block = false,
    disabled = false,
    loading = false,
    icon,
    iconPlacement = 'start',
    asChild = false,
    href,
    target,
    htmlType = 'button',
    className,
    children,
    onClick,
    onKeyDown,
    ...rest
  } = props;

  const loadingConfig = useMemo(() => getLoadingConfig(loading), [loading]);
  const [innerLoading, setInnerLoading] = useState(loadingConfig.loading);

  useLayoutEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (loadingConfig.delay > 0) {
      timer = setTimeout(() => {
        timer = null;
        setInnerLoading(true);
      }, loadingConfig.delay);
    } else {
      setInnerLoading(loadingConfig.loading);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loadingConfig.delay, loadingConfig.loading]);

  const isDisabled = disabled || innerLoading;

  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    if (props.autoFocus && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    const isIconOnly = !children && !!icon;
    if (isIconOnly) {
      const ariaLabel = props['aria-label'];
      if (!ariaLabel || ariaLabel.trim().length === 0) {
        // eslint-disable-next-line no-console
        console.warn(
          '[tzz-element/Button] Icon-only button should provide aria-label for accessibility.',
        );
      }
    }
  }

  const handleClick = (e: React.MouseEvent<any>) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<any>) => {
    if (isDisabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onKeyDown?.(e);
  };

  const isIconOnly = !children && !hasReadableText(children) && !!icon;

  const classes = cn(
    styles.button,
    styles[`type-${type}`],
    styles[`size-${size}`],
    shape !== 'default' && styles[`shape-${shape}`],
    danger && styles.danger,
    ghost && styles.ghost,
    block && styles.block,
    isIconOnly && styles.iconOnly,
    className,
  );

  const Spinner = (
    <span className={styles.iconSlot} aria-hidden="true">
      <span className={styles.spinner} />
    </span>
  );

  const iconNode = innerLoading ? (
    Spinner
  ) : icon ? (
    <span className={styles.iconSlot} aria-hidden="true">
      {icon}
    </span>
  ) : null;

  const contentNode = children ? (
    <span className={styles.content}>{children}</span>
  ) : null;

  const kids =
    iconPlacement === 'end' ? (
      <>
        {contentNode}
        {iconNode}
      </>
    ) : (
      <>
        {iconNode}
        {contentNode}
      </>
    );

  const sharedProps = {
    className: classes,
    'data-type': type,
    'data-size': size,
    'data-disabled': isDisabled ? 'true' : undefined,
    'data-loading': innerLoading ? 'true' : undefined,
    'data-danger': danger ? 'true' : undefined,
    'aria-busy': innerLoading ? true : undefined,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    ...rest,
  } as const;

  if (asChild) {
    return (
      <Slot
        ref={ref as any}
        {...(sharedProps as any)}
        aria-disabled={isDisabled ? true : undefined}
        tabIndex={isDisabled ? -1 : undefined}
      >
        {children as any}
      </Slot>
    );
  }

  if (href !== undefined && !isDisabled) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        {...(sharedProps as any)}
      >
        {kids}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      disabled={isDisabled}
      type={
        htmlType === 'submit'
          ? 'submit'
          : htmlType === 'reset'
          ? 'reset'
          : 'button'
      }
      {...(sharedProps as any)}
    >
      {kids}
    </button>
  );
});
