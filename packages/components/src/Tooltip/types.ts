import * as React from 'react';

export type TooltipPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

export type TooltipTrigger = 'hover' | 'click' | 'focus';

export interface TooltipProps {
  /** Tooltip content */
  title?: React.ReactNode;
  /** Placement of tooltip */
  placement?: TooltipPlacement;
  /** Trigger mode */
  trigger?: TooltipTrigger | TooltipTrigger[];
  /** Controlled visibility */
  open?: boolean;
  /** Default visibility */
  defaultOpen?: boolean;
  /** Callback when visibility changes */
  onOpenChange?: (open: boolean) => void;
  /** Show arrow */
  arrow?: boolean;
  /** Color of tooltip */
  color?: string;
  /** Trigger element */
  children: React.ReactElement;
  /** Additional class for tooltip overlay */
  overlayClassName?: string;
  /** Mouse enter delay (ms) */
  mouseEnterDelay?: number;
  /** Mouse leave delay (ms) */
  mouseLeaveDelay?: number;
}
