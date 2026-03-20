import * as React from 'react';
import { useState } from 'react';
import styles from './switch.module.css';
import type { SwitchProps } from './types';

function cn(...args: (string | false | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch(props, ref) {
    const {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      disabled = false,
      loading = false,
      size = 'default',
      checkedChildren,
      unCheckedChildren,
      className,
      onClick,
      ...rest
    } = props;

    const [innerChecked, setInnerChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const mergedChecked = isControlled ? controlledChecked : innerChecked;
    const isDisabled = disabled || loading;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      const newChecked = !mergedChecked;
      if (!isControlled) setInnerChecked(newChecked);
      onChange?.(newChecked, e);
      onClick?.(e);
    };

    const classes = cn(
      styles.switch,
      mergedChecked && styles.checked,
      size === 'small' && styles.small,
      isDisabled && styles.disabled,
      className,
    );

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={mergedChecked}
        disabled={isDisabled}
        className={classes}
        onClick={handleClick}
        {...rest}
      >
        <span className={styles.handle}>
          {loading && <span className={styles.handleSpinner} />}
        </span>
        <span className={styles.inner}>
          {mergedChecked ? checkedChildren : unCheckedChildren}
        </span>
      </button>
    );
  },
);
