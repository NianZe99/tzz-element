import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './tooltip.module.css';
import type { TooltipPlacement, TooltipProps, TooltipTrigger } from './types';

function cn(...args: (string | false | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

function getArrowClass(placement: TooltipPlacement): string {
  if (placement.startsWith('top')) return styles.arrowTop;
  if (placement.startsWith('bottom')) return styles.arrowBottom;
  if (placement.startsWith('left')) return styles.arrowLeft;
  return styles.arrowRight;
}

function calcPosition(
  triggerRect: DOMRect,
  overlayRect: DOMRect,
  placement: TooltipPlacement,
  gap: number = 8,
): { top: number; left: number } {
  let top = 0;
  let left = 0;

  switch (placement) {
    case 'top':
      top = triggerRect.top - overlayRect.height - gap;
      left = triggerRect.left + (triggerRect.width - overlayRect.width) / 2;
      break;
    case 'topLeft':
      top = triggerRect.top - overlayRect.height - gap;
      left = triggerRect.left;
      break;
    case 'topRight':
      top = triggerRect.top - overlayRect.height - gap;
      left = triggerRect.right - overlayRect.width;
      break;
    case 'bottom':
      top = triggerRect.bottom + gap;
      left = triggerRect.left + (triggerRect.width - overlayRect.width) / 2;
      break;
    case 'bottomLeft':
      top = triggerRect.bottom + gap;
      left = triggerRect.left;
      break;
    case 'bottomRight':
      top = triggerRect.bottom + gap;
      left = triggerRect.right - overlayRect.width;
      break;
    case 'left':
      top = triggerRect.top + (triggerRect.height - overlayRect.height) / 2;
      left = triggerRect.left - overlayRect.width - gap;
      break;
    case 'leftTop':
      top = triggerRect.top;
      left = triggerRect.left - overlayRect.width - gap;
      break;
    case 'leftBottom':
      top = triggerRect.bottom - overlayRect.height;
      left = triggerRect.left - overlayRect.width - gap;
      break;
    case 'right':
      top = triggerRect.top + (triggerRect.height - overlayRect.height) / 2;
      left = triggerRect.right + gap;
      break;
    case 'rightTop':
      top = triggerRect.top;
      left = triggerRect.right + gap;
      break;
    case 'rightBottom':
      top = triggerRect.bottom - overlayRect.height;
      left = triggerRect.right + gap;
      break;
  }

  return { top, left };
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const {
    title,
    placement = 'top',
    trigger = 'hover',
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    arrow = true,
    color,
    children,
    overlayClassName,
    mouseEnterDelay = 100,
    mouseLeaveDelay = 100,
  } = props;

  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const mergedOpen = isControlled ? controlledOpen : innerOpen;

  const triggerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const triggers: TooltipTrigger[] = Array.isArray(trigger)
    ? trigger
    : [trigger];

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const delayOpen = useCallback(() => {
    clearTimeout(leaveTimerRef.current);
    enterTimerRef.current = setTimeout(() => setOpen(true), mouseEnterDelay);
  }, [mouseEnterDelay, setOpen]);

  const delayClose = useCallback(() => {
    clearTimeout(enterTimerRef.current);
    leaveTimerRef.current = setTimeout(() => setOpen(false), mouseLeaveDelay);
  }, [mouseLeaveDelay, setOpen]);

  useEffect(() => {
    if (!mergedOpen || !triggerRef.current || !overlayRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const overlayRect = overlayRef.current.getBoundingClientRect();
    setPos(calcPosition(triggerRect, overlayRect, placement));
  }, [mergedOpen, placement]);

  useEffect(() => {
    return () => {
      clearTimeout(enterTimerRef.current);
      clearTimeout(leaveTimerRef.current);
    };
  }, []);

  if (!title) return <>{children}</>;

  const triggerProps: Record<string, any> = {};
  if (triggers.includes('hover')) {
    triggerProps.onMouseEnter = delayOpen;
    triggerProps.onMouseLeave = delayClose;
  }
  if (triggers.includes('click')) {
    triggerProps.onClick = () => setOpen(!mergedOpen);
  }
  if (triggers.includes('focus')) {
    triggerProps.onFocus = () => setOpen(true);
    triggerProps.onBlur = () => setOpen(false);
  }

  const child = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<any>, {
        ref: triggerRef,
        ...triggerProps,
      })
    : children;

  const overlay = mergedOpen
    ? createPortal(
        <div
          ref={overlayRef}
          className={cn(styles.overlay, overlayClassName)}
          style={{ top: pos.top, left: pos.left }}
          onMouseEnter={triggers.includes('hover') ? delayOpen : undefined}
          onMouseLeave={triggers.includes('hover') ? delayClose : undefined}
        >
          {arrow && (
            <span
              className={cn(styles.arrow, getArrowClass(placement))}
              style={color ? { background: color } : undefined}
            />
          )}
          <div
            className={styles.inner}
            style={color ? { background: color } : undefined}
          >
            {title}
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      {child}
      {overlay}
    </>
  );
};
