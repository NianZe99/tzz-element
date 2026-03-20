import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import styles from './input.module.css';
import type { TextAreaProps } from './types';

function cn(...args: (string | false | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(props, ref) {
    const {
      size = 'middle', // eslint-disable-line @typescript-eslint/no-unused-vars
      variant = 'outlined',
      status,
      allowClear = false, // eslint-disable-line @typescript-eslint/no-unused-vars
      onClear, // eslint-disable-line @typescript-eslint/no-unused-vars
      autoSize = false,
      showCount = false,
      className,
      disabled,
      readOnly,
      value,
      defaultValue,
      onChange,
      maxLength,
      ...rest
    } = props;

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const mergedRef = (node: HTMLTextAreaElement) => {
      (
        textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>
      ).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
          node;
    };

    const [innerValue, setInnerValue] = React.useState(defaultValue ?? '');
    const isControlled = value !== undefined;
    const displayValue = String(isControlled ? value : innerValue);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInnerValue(e.target.value);
      onChange?.(e);
    };

    const adjustHeight = useCallback(() => {
      const el = textareaRef.current;
      if (!el || !autoSize) return;

      el.style.height = 'auto';
      const config = typeof autoSize === 'object' ? autoSize : {};
      const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 22;
      const paddingTop = parseInt(getComputedStyle(el).paddingTop, 10) || 0;
      const paddingBottom =
        parseInt(getComputedStyle(el).paddingBottom, 10) || 0;
      const borderTop = parseInt(getComputedStyle(el).borderTopWidth, 10) || 0;
      const borderBottom =
        parseInt(getComputedStyle(el).borderBottomWidth, 10) || 0;

      let minHeight: number | undefined;
      let maxHeight: number | undefined;
      if (config.minRows) {
        minHeight =
          config.minRows * lineHeight +
          paddingTop +
          paddingBottom +
          borderTop +
          borderBottom;
      }
      if (config.maxRows) {
        maxHeight =
          config.maxRows * lineHeight +
          paddingTop +
          paddingBottom +
          borderTop +
          borderBottom;
      }

      let height = el.scrollHeight + borderTop + borderBottom;
      if (minHeight) height = Math.max(height, minHeight);
      if (maxHeight) height = Math.min(height, maxHeight);

      el.style.height = `${height}px`;
    }, [autoSize]);

    useEffect(() => {
      adjustHeight();
    }, [displayValue, adjustHeight]);

    const wrapperClasses = cn(
      styles.textareaWrapper,
      variant === 'filled' && styles.filled,
      variant === 'borderless' && styles.borderless,
      status === 'error' && styles.statusError,
      status === 'warning' && styles.statusWarning,
      disabled && styles.disabled,
      className,
    );

    const countText = maxLength
      ? `${displayValue.length} / ${maxLength}`
      : `${displayValue.length}`;

    return (
      <span className={wrapperClasses}>
        <textarea
          ref={mergedRef}
          className={cn(styles.textarea, autoSize && styles.textareaNoResize)}
          disabled={disabled}
          readOnly={readOnly}
          value={displayValue}
          onChange={handleChange}
          maxLength={maxLength}
          {...rest}
        />
        {showCount && <span className={styles.count}>{countText}</span>}
      </span>
    );
  },
);
