import * as React from 'react';
import type { ButtonProps } from './types';
/**
 * Button：生产级可复用按钮组件
 * - variant/size/loading/disabled/icon/asChild
 * - 默认 type="button" 避免表单误提交
 * - loading/disabled 统一语义与交互拦截
 * - focus-visible 清晰可见
 */
export declare const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;
