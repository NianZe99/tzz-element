import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import type { ModalProps } from './types';

function cn(...args: (string | false | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

const CloseIcon = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 449.8 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9A7.95 7.95 0 00203.8 838h79.8c4.7 0 9.2-2.1 12.3-5.7L512 574.1l216.1 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
  </svg>
);

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    open = false,
    title,
    footer,
    width = 520,
    centered = false,
    closable = true,
    maskClosable = true,
    keyboard = true,
    destroyOnClose = false,
    confirmLoading = false,
    okText = '确定',
    cancelText = '取消',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    okType = 'primary',
    okDanger = false,
    onOk,
    onCancel,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    afterClose,
    zIndex,
    className,
    style,
    children,
    ...rest
  } = props;

  const modalRef = useRef<HTMLDivElement>(null);
  const hasBeenOpened = useRef(false);

  if (open) hasBeenOpened.current = true;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (keyboard && e.key === 'Escape') {
        onCancel?.(e as any);
      }
    },
    [keyboard, onCancel],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  if (!open && (!hasBeenOpened.current || destroyOnClose)) return null;

  const hidden = !open;

  const defaultFooter = (
    <>
      <button
        type="button"
        className={styles.cancelBtn}
        onClick={onCancel as any}
        style={{
          padding: '4px 15px',
          height: 32,
          borderRadius: 6,
          border: '1px solid #d9d9d9',
          background: '#fff',
          cursor: 'pointer',
          fontSize: 14,
        }}
      >
        {cancelText}
      </button>
      <button
        type="button"
        onClick={onOk}
        disabled={confirmLoading}
        style={{
          padding: '4px 15px',
          height: 32,
          borderRadius: 6,
          border: 'none',
          background: okDanger ? '#ff4d4f' : '#1677ff',
          color: '#fff',
          cursor: confirmLoading ? 'not-allowed' : 'pointer',
          opacity: confirmLoading ? 0.65 : 1,
          fontSize: 14,
        }}
      >
        {confirmLoading && '⏳ '}
        {okText}
      </button>
    </>
  );

  const resolvedFooter = footer === null ? null : footer ?? defaultFooter;

  const modal = (
    <>
      <div
        className={styles.mask}
        style={{
          ...(zIndex ? { zIndex } : undefined),
          ...(hidden ? { display: 'none' } : undefined),
        }}
        onClick={maskClosable ? (onCancel as any) : undefined}
      />
      <div
        className={cn(
          styles.wrap,
          centered ? styles.wrapCentered : styles.wrapTop,
        )}
        style={{
          ...(zIndex ? { zIndex: (zIndex ?? 1000) + 1 } : undefined),
          ...(hidden ? { display: 'none' } : undefined),
        }}
        onClick={(e) => {
          if (maskClosable && e.target === e.currentTarget) {
            onCancel?.(e);
          }
        }}
      >
        <div
          ref={modalRef}
          className={cn(styles.modal, className)}
          style={{ width, ...style }}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tzz-modal-title"
          {...rest}
        >
          {closable && (
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onCancel as any}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          )}
          {title && (
            <div className={styles.header}>
              <span className={styles.title} id="tzz-modal-title">
                {title}
              </span>
            </div>
          )}
          <div className={styles.body}>{children}</div>
          {resolvedFooter && (
            <div className={styles.footer}>{resolvedFooter}</div>
          )}
        </div>
      </div>
    </>
  );

  return createPortal(modal, document.body);
};
