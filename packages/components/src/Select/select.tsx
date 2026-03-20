import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './select.module.css';
import type { SelectOptionType, SelectProps } from './types';

function cn(...args: (string | false | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

const DownArrow = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
  </svg>
);

const CloseCircle = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
  </svg>
);

export const Select: React.FC<SelectProps> = (props) => {
  const {
    options = [],
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder = '请选择',
    size = 'middle',
    variant = 'outlined',
    status,
    disabled = false,
    allowClear = false,
    mode,
    showSearch = false,
    filterOption = true,
    notFoundContent = '暂无数据',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    placement = 'bottomLeft',
    open: controlledOpen,
    onOpenChange,
    onSearch,
    className,
    style,
    ...rest
  } = props;

  const isMultiple = mode === 'multiple' || mode === 'tags';
  const [innerValue, setInnerValue] = useState(
    defaultValue ?? (isMultiple ? [] : undefined),
  );
  const isControlled = controlledValue !== undefined;
  const mergedValue = isControlled ? controlledValue : innerValue;

  const [innerOpen, setInnerOpen] = useState(false);
  const isOpenControlled = controlledOpen !== undefined;
  const mergedOpen = isOpenControlled ? controlledOpen : innerOpen;

  const [searchText, setSearchText] = useState('');
  const selectorRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  const setOpen = useCallback(
    (next: boolean) => {
      if (disabled) return;
      if (!isOpenControlled) setInnerOpen(next);
      onOpenChange?.(next);
      if (!next) setSearchText('');
    },
    [disabled, isOpenControlled, onOpenChange],
  );

  const selectedValues = useMemo(() => {
    if (mergedValue === undefined || mergedValue === null) return [];
    return Array.isArray(mergedValue) ? mergedValue : [mergedValue];
  }, [mergedValue]);

  const filteredOptions = useMemo(() => {
    if (!showSearch || !searchText) return options;
    if (filterOption === false) return options;
    const fn =
      typeof filterOption === 'function'
        ? filterOption
        : (input: string, opt: SelectOptionType) =>
            String(opt.label).toLowerCase().includes(input.toLowerCase());
    return options.filter((opt) => fn(searchText, opt));
  }, [options, searchText, showSearch, filterOption]);

  const handleSelect = (opt: SelectOptionType) => {
    if (opt.disabled) return;
    if (isMultiple) {
      const newVal = selectedValues.includes(opt.value)
        ? selectedValues.filter((v) => v !== opt.value)
        : [...selectedValues, opt.value];
      const selectedOpts = options.filter((o) => newVal.includes(o.value));
      if (!isControlled) setInnerValue(newVal);
      onChange?.(newVal, selectedOpts);
    } else {
      if (!isControlled) setInnerValue(opt.value);
      onChange?.(opt.value, opt);
      setOpen(false);
    }
    setSearchText('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const empty = isMultiple ? [] : undefined;
    if (!isControlled) setInnerValue(empty as any);
    onChange?.(empty as any, (isMultiple ? [] : undefined) as any);
  };

  const removeTag = (val: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newVal = selectedValues.filter((v) => v !== val);
    const selectedOpts = options.filter((o) => newVal.includes(o.value));
    if (!isControlled) setInnerValue(newVal);
    onChange?.(newVal, selectedOpts);
  };

  useEffect(() => {
    if (!mergedOpen || !selectorRef.current) return;
    const rect = selectorRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  }, [mergedOpen]);

  useEffect(() => {
    if (!mergedOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectorRef.current?.contains(e.target as Node) ||
        dropdownRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mergedOpen, setOpen]);

  useEffect(() => {
    if (mergedOpen && showSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [mergedOpen, showSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onSearch?.(e.target.value);
  };

  const sizeClass = {
    small: styles.sizeSmall,
    middle: styles.sizeMiddle,
    large: styles.sizeLarge,
  }[size];

  const hasValue = selectedValues.length > 0;
  const showClearBtn = allowClear && hasValue && !disabled;

  const renderSelection = () => {
    if (showSearch && mergedOpen) {
      return (
        <input
          ref={searchRef}
          className={styles.searchInput}
          value={searchText}
          onChange={handleSearchChange}
          placeholder={hasValue ? '' : placeholder}
        />
      );
    }

    if (isMultiple && hasValue) {
      return (
        <span className={styles.tags}>
          {selectedValues.map((val) => {
            const opt = options.find((o) => o.value === val);
            return (
              <span key={String(val)} className={styles.tag}>
                <span>{opt?.label ?? val}</span>
                <span
                  className={styles.tagClose}
                  onClick={(e) => removeTag(val, e)}
                >
                  ×
                </span>
              </span>
            );
          })}
        </span>
      );
    }

    if (hasValue) {
      const opt = options.find((o) => o.value === selectedValues[0]);
      return (
        <span className={styles.selectionText}>
          {opt?.label ?? selectedValues[0]}
        </span>
      );
    }

    return (
      <span className={cn(styles.selectionText, styles.placeholder)}>
        {placeholder}
      </span>
    );
  };

  const dropdownContent = mergedOpen
    ? createPortal(
        <div
          ref={dropdownRef}
          className={styles.dropdown}
          style={{ top: pos.top, left: pos.left, width: pos.width }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => {
              const selected = selectedValues.includes(opt.value);
              return (
                <div
                  key={String(opt.value)}
                  className={cn(
                    styles.option,
                    selected && styles.optionSelected,
                    opt.disabled && styles.optionDisabled,
                  )}
                  onClick={() => handleSelect(opt)}
                >
                  <span>{opt.label}</span>
                  {selected && (
                    <span className={styles.checkmark}>
                      <CheckIcon />
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className={styles.empty}>{notFoundContent}</div>
          )}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div
        ref={selectorRef}
        className={cn(
          styles.selector,
          sizeClass,
          variant === 'filled' && styles.filled,
          variant === 'borderless' && styles.borderless,
          status === 'error' && styles.statusError,
          status === 'warning' && styles.statusWarning,
          disabled && styles.disabled,
          mergedOpen && styles.selectorOpen,
          className,
        )}
        style={style}
        onClick={() => {
          if (!disabled) setOpen(!mergedOpen);
        }}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={mergedOpen}
        aria-haspopup="listbox"
        {...rest}
      >
        {renderSelection()}
        {showClearBtn ? (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label="clear"
            tabIndex={-1}
          >
            <CloseCircle />
          </button>
        ) : (
          <span className={cn(styles.arrow, mergedOpen && styles.arrowOpen)}>
            <DownArrow />
          </span>
        )}
      </div>
      {dropdownContent}
    </>
  );
};
