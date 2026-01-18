import * as React from 'react';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'destructive';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export type ButtonIconPosition = 'start' | 'end';
export type ButtonCorner = 'default' | 'rounded' | 'pill';

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export interface ButtonProps extends Omit<NativeButtonProps, 'disabled'> {
  /**
   * 形状：控制圆角风格
   * - default: 默认圆角
   * - rounded: 更大的圆角
   * - pill: 胶囊按钮（左右完全圆）
   */
  shape?: ButtonCorner;

  /**
   * 语法糖：等价于 shape="rounded"
   * - 若同时传 shape，则以 shape 为准
   */
  rounded?: boolean;

  /**
   * 视觉变体
   */
  variant?: ButtonVariant;

  /**
   * 尺寸
   * - icon: 纯图标按钮（建议提供 aria-label）
   */
  size?: ButtonSize;

  /**
   * 是否撑满父容器宽度（类似 antd block）
   */
  block?: boolean;

  /**
   * 禁用（asChild 场景使用 aria-disabled + 阻止交互）
   */
  disabled?: boolean;

  /**
   * 加载态：自动禁用交互，并设置 aria-busy
   */
  loading?: boolean;

  /**
   * loading 时展示的文案（可选）
   */
  loadingText?: React.ReactNode;

  /**
   * 左侧图标
   */
  startIcon?: React.ReactNode;

  /**
   * 右侧图标
   */
  endIcon?: React.ReactNode;

  /**
   * spinner 所在位置（默认 start）
   */
  spinnerPlacement?: ButtonIconPosition;

  /**
   * 多态：将 Button 的 className/事件/属性注入到子元素（类似 shadcn asChild）
   * - children 必须是单个 ReactElement
   */
  asChild?: boolean;

  /**
   * icon-only 的可访问性文案（size="icon" 且无可读文本时强烈建议）
   */
  'aria-label'?: string;

  /**
   * 测试定位
   */
  'data-testid'?: string;
}
