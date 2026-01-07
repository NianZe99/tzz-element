import * as React from 'react';

/**
 * 类名合并工具（不引入 clsx/classnames，保持库自包含）
 * 支持：
 *  - cn('a', 'b')
 *  - cn('a', condition && 'b')
 *  - cn(['a', 'b'])
 *  - cn({ a: true, b: false })
 */
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean>;

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const push = (v: ClassValue) => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') {
      classes.push(String(v));
      return;
    }
    if (Array.isArray(v)) {
      v.forEach(push);
      return;
    }
    if (typeof v === 'object') {
      for (const [k, ok] of Object.entries(v)) {
        if (ok) classes.push(k);
      }
    }
  };

  inputs.forEach(push);
  return classes.join(' ');
}

/**
 * 合并多个 ref（forwardRef + childRef 场景）
 */
export function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') ref(node);
      else (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}

/**
 * 合并事件处理器：先执行 ours，再执行 theirs
 * - 如果 ours 调用了 preventDefault / stopPropagation，theirs 仍可能执行（取决于你是否 early return）
 *   所以建议在 ours 内部对 disabled/loading 做 early return。
 */
export function mergeHandlers<E>(
  ours?: (event: E) => void,
  theirs?: (event: E) => void,
) {
  return (event: E) => {
    ours?.(event);
    // 如果 ours 已经阻止默认行为（disabled/loading 场景），就不要再触发子元素的 handler
    if ((event as any).defaultPrevented) return;

    theirs?.(event);
  };
}

/**
 * Slot：将 props/className/ref 注入到 child（asChild 模式）
 * - 不依赖 @radix-ui/react-slot
 * - 仅支持单个 ReactElement
 */
export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement<any>;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(function Slot(
  { children, className, style, onClick, onKeyDown, ...rest },
  forwardedRef,
) {
  if (!React.isValidElement(children)) return null;

  const childProps = children.props as any;

  const mergedClassName = cn(childProps.className, className);
  const mergedStyle = { ...(childProps.style || {}), ...(style || {}) };

  const mergedOnClick = mergeHandlers(
    onClick as any,
    childProps.onClick as any,
  );
  const mergedOnKeyDown = mergeHandlers(
    onKeyDown as any,
    childProps.onKeyDown as any,
  );

  const mergedRef = composeRefs<any>((children as any).ref, forwardedRef);

  return React.cloneElement<any>(children, {
    ...rest,
    ...childProps,
    className: mergedClassName,
    style: mergedStyle,
    onClick: mergedOnClick,
    onKeyDown: mergedOnKeyDown,
    ref: mergedRef,
  });
});
