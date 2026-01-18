import * as React from 'react';
import styles from './button.module.css';
import type { ButtonCorner, ButtonProps } from './types';
import { Slot, cn } from './utils';

/**
 * 判断 children 是否包含可读文本（用于 icon-only 的 a11y 提示）
 */
function hasReadableText(node: React.ReactNode): boolean {
  if (node === null || node === undefined || typeof node === 'boolean')
    return false;
  if (typeof node === 'string' || typeof node === 'number')
    return String(node).trim().length > 0;
  if (Array.isArray(node)) return node.some(hasReadableText);
  if (React.isValidElement(node)) return hasReadableText(node.props.children);
  return false;
}

/**
 * Button：生产级可复用按钮组件
 * - variant/size/loading/disabled/icon/asChild
 * - 默认 type="button" 避免表单误提交
 * - loading/disabled 统一语义与交互拦截
 * - focus-visible 清晰可见
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      shape,
      rounded = false,
      variant = 'default',
      size = 'md',
      block = false,
      disabled = false,
      loading = false,
      loadingText,
      startIcon,
      endIcon,
      spinnerPlacement = 'start',
      asChild = false,

      className,
      children,

      // 原生 props（我们需要包一层以实现 disabled/loading 的拦截）
      onClick,
      onKeyDown,

      // 原生 button type：默认 button，避免 <form> 内误提交
      type,

      ...rest
    } = props;

    const isDisabled = disabled || loading;
    const resolvedShape: ButtonCorner =
      shape ?? (rounded ? 'rounded' : 'default');
    // icon-only 场景的可访问性提示（开发态）
    if (process.env.NODE_ENV !== 'production') {
      if (size === 'icon') {
        const hasText = hasReadableText(children);
        const ariaLabel = props['aria-label'];
        if (!hasText && (!ariaLabel || ariaLabel.trim().length === 0)) {
          // 不强制 throw，避免影响 demo/运行，但会提示使用者补齐 a11y
          // 你也可以改为 throw new Error(...) 来更严格
          // eslint-disable-next-line no-console
          console.warn(
            '[tzz-element/Button] size="icon" 时建议提供 aria-label（或 children 包含可读文本），以满足无障碍要求。',
          );
        }
      }
    }

    /**
     * 统一事件拦截：disabled/loading 时阻止交互
     * - 对于原生 button：disabled 属性即可阻止，但我们仍做防御性拦截（避免 asChild 情况差异）
     * - 对于 asChild：必须拦截 click/keyboard
     */
    const handleClick = (e: React.MouseEvent<any>) => {
      if (isDisabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<any>) => {
      if (isDisabled) {
        // 禁用态阻止键盘触发（Enter/Space）
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
      onKeyDown?.(e);
    };

    const shapeClassMap = {
      default: styles.shapeDefault,
      rounded: styles.shapeRounded,
      pill: styles.shapePill,
    } as const;

    const classes = cn(
      styles.button,
      styles[variant],
      styles[size],
      shapeClassMap[resolvedShape],
      block && styles.block,
      className,
    );

    // loading 时文案：有 loadingText 则优先，否则沿用 children
    const content = loading ? loadingText ?? children : children;

    const Spinner = (
      <span className={styles.iconSlot} aria-hidden="true">
        <span className={styles.spinner} />
      </span>
    );

    const Start =
      loading && spinnerPlacement === 'start' ? (
        Spinner
      ) : startIcon ? (
        <span className={styles.iconSlot} aria-hidden="true">
          {startIcon}
        </span>
      ) : null;

    const End =
      loading && spinnerPlacement === 'end' ? (
        Spinner
      ) : endIcon ? (
        <span className={styles.iconSlot} aria-hidden="true">
          {endIcon}
        </span>
      ) : null;

    /**
     * asChild:
     * - 注入 className / data-* / aria-* / 事件
     * - disabled/loading 时设置 aria-disabled 与 tabIndex（避免被聚焦）
     *
     * 注意：asChild 会把语义交给 child（例如 <a> / <Link>）。
     * 组件会尽力提供一致的“禁用交互”行为，但最终语义仍建议由使用者选择正确元素。
     */
    const sharedProps = {
      className: classes,
      'data-variant': variant,
      'data-size': size,
      'data-disabled': isDisabled ? 'true' : 'false',
      'data-shape': resolvedShape, // ✅ 新增
      'data-loading': loading ? 'true' : 'false',
      'aria-busy': loading ? true : undefined,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      ...rest,
    } as const;

    if (asChild) {
      return (
        <Slot
          // Slot ref 类型为 HTMLElement，这里为了保持 Button 对外签名为 HTMLButtonElement，使用 cast
          ref={ref as any}
          {...(sharedProps as any)}
          aria-disabled={isDisabled ? true : undefined}
          tabIndex={isDisabled ? -1 : (rest as any).tabIndex}
        >
          {/* asChild 必须是单个 ReactElement */}
          {children as any}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        {...(sharedProps as any)}
        // ✅ eslint-plugin-react 认可：静态字面量 / 简单三元（且最终返回字面量）
        type={
          type === 'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button'
        }
      >
        {Start}
        {content}
        {End}
      </button>
    );
  },
);
