import * as React from 'react';
import { useRef } from 'react';
import styles from './input.module.css';
import type { InputProps } from './types';

function cn(...args: (string | false | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

const CloseCircleIcon = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
  </svg>
);

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const {
      size = 'middle',
      variant = 'outlined',
      status,
      prefix,
      suffix,
      allowClear = false,
      onClear,
      className,
      disabled,
      readOnly,
      value,
      defaultValue,
      onChange,
      ...rest
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const mergedRef = (node: HTMLInputElement) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current =
        node;
      if (typeof ref === 'function') ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    };

    const [innerValue, setInnerValue] = React.useState(defaultValue ?? '');
    const isControlled = value !== undefined;
    const displayValue = isControlled ? value : innerValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInnerValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInnerValue('');
      onClear?.();
      if (inputRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value',
        )?.set;
        nativeInputValueSetter?.call(inputRef.current, '');
        inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };

    const sizeClass = {
      small: styles.sizeSmall,
      middle: styles.sizeMiddle,
      large: styles.sizeLarge,
    }[size];

    const wrapperClasses = cn(
      styles.wrapper,
      sizeClass,
      variant === 'filled' && styles.filled,
      variant === 'borderless' && styles.borderless,
      status === 'error' && styles.statusError,
      status === 'warning' && styles.statusWarning,
      disabled && styles.disabled,
      className,
    );

    const showClear =
      allowClear && !disabled && !readOnly && String(displayValue).length > 0;

    return (
      <span className={wrapperClasses}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          ref={mergedRef}
          className={styles.input}
          disabled={disabled}
          readOnly={readOnly}
          value={displayValue}
          onChange={handleChange}
          {...rest}
        />
        {showClear && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label="clear"
            tabIndex={-1}
          >
            <CloseCircleIcon />
          </button>
        )}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </span>
    );
  },
);
