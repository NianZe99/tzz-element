import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './dropdown.module.css';
import type {
  DropdownPlacement,
  DropdownProps,
  DropdownTrigger,
} from './types';

function cn(...args: (string | false | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

function calcPosition(
  triggerRect: DOMRect,
  overlayRect: DOMRect,
  placement: DropdownPlacement,
  gap: number = 4,
): { top: number; left: number } {
  let top = 0;
  let left = 0;

  const isTop = placement.startsWith('top');
  top = isTop
    ? triggerRect.top - overlayRect.height - gap
    : triggerRect.bottom + gap;

  if (placement.endsWith('Left')) {
    left = triggerRect.left;
  } else if (placement.endsWith('Right')) {
    left = triggerRect.right - overlayRect.width;
  } else {
    left = triggerRect.left + (triggerRect.width - overlayRect.width) / 2;
  }

  return { top, left };
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    items = [],
    children,
    trigger = ['hover'],
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    placement = 'bottomLeft',
    disabled = false,
    overlayClassName,
    overlayStyle,
    onItemClick,
    autoClose = true,
  } = props;

  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const mergedOpen = isControlled ? controlledOpen : innerOpen;

  const triggerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const triggers: DropdownTrigger[] = trigger;

  const setOpen = useCallback(
    (next: boolean) => {
      if (disabled) return;
      if (!isControlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange, disabled],
  );

  const delayOpen = useCallback(() => {
    clearTimeout(leaveTimerRef.current);
    enterTimerRef.current = setTimeout(() => setOpen(true), 100);
  }, [setOpen]);

  const delayClose = useCallback(() => {
    clearTimeout(enterTimerRef.current);
    leaveTimerRef.current = setTimeout(() => setOpen(false), 100);
  }, [setOpen]);

  useEffect(() => {
    if (!mergedOpen || !triggerRef.current || !overlayRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const overlayRect = overlayRef.current.getBoundingClientRect();
    setPos(calcPosition(triggerRect, overlayRect, placement));
  }, [mergedOpen, placement]);

  useEffect(() => {
    if (!mergedOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        overlayRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mergedOpen, setOpen]);

  useEffect(() => {
    return () => {
      clearTimeout(enterTimerRef.current);
      clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const triggerProps: Record<string, any> = {};
  if (triggers.includes('hover')) {
    triggerProps.onMouseEnter = delayOpen;
    triggerProps.onMouseLeave = delayClose;
  }
  if (triggers.includes('click')) {
    triggerProps.onClick = () => setOpen(!mergedOpen);
  }
  if (triggers.includes('contextMenu')) {
    triggerProps.onContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(!mergedOpen);
    };
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
          style={{ top: pos.top, left: pos.left, ...overlayStyle }}
          onMouseEnter={triggers.includes('hover') ? delayOpen : undefined}
          onMouseLeave={triggers.includes('hover') ? delayClose : undefined}
        >
          <ul className={styles.menu} role="menu">
            {items.map((item) => {
              if (item.type === 'divider') {
                return (
                  <li
                    key={item.key}
                    className={styles.divider}
                    role="separator"
                  />
                );
              }
              return (
                <li
                  key={item.key}
                  className={cn(
                    styles.menuItem,
                    item.disabled && styles.menuItemDisabled,
                    item.danger && styles.menuItemDanger,
                  )}
                  role="menuitem"
                  onClick={(e) => {
                    if (item.disabled) return;
                    item.onClick?.({ key: item.key, domEvent: e });
                    onItemClick?.({ key: item.key, domEvent: e });
                    if (autoClose) setOpen(false);
                  }}
                >
                  {item.icon && (
                    <span className={styles.menuItemIcon}>{item.icon}</span>
                  )}
                  {item.label}
                </li>
              );
            })}
          </ul>
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
