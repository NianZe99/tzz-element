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
export declare function cn(...inputs: ClassValue[]): string;
/**
 * 合并多个 ref（forwardRef + childRef 场景）
 */
export declare function composeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): (node: T) => void;
/**
 * 合并事件处理器：先执行 ours，再执行 theirs
 * - 如果 ours 调用了 preventDefault / stopPropagation，theirs 仍可能执行（取决于你是否 early return）
 *   所以建议在 ours 内部对 disabled/loading 做 early return。
 */
export declare function mergeHandlers<
  E extends {
    defaultPrevented?: boolean;
  },
>(ours?: (event: E) => void, theirs?: (event: E) => void): (event: E) => void;
/**
 * Slot：将 props/className/ref 注入到 child（asChild 模式）
 * - 不依赖 @radix-ui/react-slot
 * - 仅支持单个 ReactElement
 */
export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement<any>;
}
export declare const Slot: React.ForwardRefExoticComponent<
  SlotProps & React.RefAttributes<HTMLElement>
>;
