function _typeof(o) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o;
          }),
    _typeof(o)
  );
}
var _excluded = [
  'shape',
  'rounded',
  'variant',
  'size',
  'block',
  'disabled',
  'loading',
  'loadingText',
  'startIcon',
  'endIcon',
  'spinnerPlacement',
  'asChild',
  'className',
  'children',
  'onClick',
  'onKeyDown',
  'type',
];
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2
      ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
      : ownKeys(Object(t)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, 'string');
  return 'symbol' == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
  if ('object' != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || 'default');
    if ('object' != _typeof(i)) return i;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return ('string' === r ? String : Number)(t);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
import * as React from 'react';
import styles from './button.module.css';
import { Slot, cn } from './utils';

/**
 * 判断 children 是否包含可读文本（用于 icon-only 的 a11y 提示）
 */
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
function hasReadableText(node) {
  if (node === null || node === undefined || typeof node === 'boolean')
    return false;
  if (typeof node === 'string' || typeof node === 'number')
    return String(node).trim().length > 0;
  if (Array.isArray(node)) return node.some(hasReadableText);
  if (/*#__PURE__*/ React.isValidElement(node))
    return hasReadableText(node.props.children);
  return false;
}

/**
 * Button：生产级可复用按钮组件
 * - variant/size/loading/disabled/icon/asChild
 * - 默认 type="button" 避免表单误提交
 * - loading/disabled 统一语义与交互拦截
 * - focus-visible 清晰可见
 */
export var Button = /*#__PURE__*/ React.forwardRef(function Button(props, ref) {
  var shape = props.shape,
    _props$rounded = props.rounded,
    rounded = _props$rounded === void 0 ? false : _props$rounded,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'default' : _props$variant,
    _props$size = props.size,
    size = _props$size === void 0 ? 'md' : _props$size,
    _props$block = props.block,
    block = _props$block === void 0 ? false : _props$block,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$loading = props.loading,
    loading = _props$loading === void 0 ? false : _props$loading,
    loadingText = props.loadingText,
    startIcon = props.startIcon,
    endIcon = props.endIcon,
    _props$spinnerPlaceme = props.spinnerPlacement,
    spinnerPlacement =
      _props$spinnerPlaceme === void 0 ? 'start' : _props$spinnerPlaceme,
    _props$asChild = props.asChild,
    asChild = _props$asChild === void 0 ? false : _props$asChild,
    className = props.className,
    children = props.children,
    onClick = props.onClick,
    onKeyDown = props.onKeyDown,
    type = props.type,
    rest = _objectWithoutProperties(props, _excluded);
  var isDisabled = disabled || loading;
  var resolvedShape =
    shape !== null && shape !== void 0
      ? shape
      : rounded
      ? 'rounded'
      : 'default';
  // icon-only 场景的可访问性提示（开发态）
  if (process.env.NODE_ENV !== 'production') {
    if (size === 'icon') {
      var hasText = hasReadableText(children);
      var ariaLabel = props['aria-label'];
      if (!hasText && (!ariaLabel || ariaLabel.trim().length === 0)) {
        // 不强制 throw，避免影响 demo/运行，但会提示使用者补齐 a11y
        // 你也可以改为 throw new Error(...) 来更严格
        // eslint-disable-next-line no-console
        console.warn(
          '[tzz-element/Button] size="icon" 时建议提供 aria-label（或 children 包含可读文本），以满足无障碍要求。',
        );
      }
    }
  }

  /**
   * 统一事件拦截：disabled/loading 时阻止交互
   * - 对于原生 button：disabled 属性即可阻止，但我们仍做防御性拦截（避免 asChild 情况差异）
   * - 对于 asChild：必须拦截 click/keyboard
   */
  var handleClick = function handleClick(e) {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick === null || onClick === void 0 || onClick(e);
  };
  var handleKeyDown = function handleKeyDown(e) {
    if (isDisabled) {
      // 禁用态阻止键盘触发（Enter/Space）
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(e);
  };
  var shapeClassMap = {
    default: styles.shapeDefault,
    rounded: styles.shapeRounded,
    pill: styles.shapePill,
  };
  var classes = cn(
    styles.button,
    styles[variant],
    styles[size],
    shapeClassMap[resolvedShape],
    block && styles.block,
    className,
  );

  // loading 时文案：有 loadingText 则优先，否则沿用 children
  var content = loading
    ? loadingText !== null && loadingText !== void 0
      ? loadingText
      : children
    : children;
  var Spinner = /*#__PURE__*/ _jsx('span', {
    className: styles.iconSlot,
    'aria-hidden': 'true',
    children: /*#__PURE__*/ _jsx('span', {
      className: styles.spinner,
    }),
  });
  var Start =
    loading && spinnerPlacement === 'start'
      ? Spinner
      : startIcon
      ? /*#__PURE__*/ _jsx('span', {
          className: styles.iconSlot,
          'aria-hidden': 'true',
          children: startIcon,
        })
      : null;
  var End =
    loading && spinnerPlacement === 'end'
      ? Spinner
      : endIcon
      ? /*#__PURE__*/ _jsx('span', {
          className: styles.iconSlot,
          'aria-hidden': 'true',
          children: endIcon,
        })
      : null;

  /**
   * asChild:
   * - 注入 className / data-* / aria-* / 事件
   * - disabled/loading 时设置 aria-disabled 与 tabIndex（避免被聚焦）
   *
   * 注意：asChild 会把语义交给 child（例如 <a> / <Link>）。
   * 组件会尽力提供一致的“禁用交互”行为，但最终语义仍建议由使用者选择正确元素。
   */
  var sharedProps = _objectSpread(
    {
      className: classes,
      'data-variant': variant,
      'data-size': size,
      'data-disabled': isDisabled ? 'true' : 'false',
      'data-shape': resolvedShape,
      // ✅ 新增
      'data-loading': loading ? 'true' : 'false',
      'aria-busy': loading ? true : undefined,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    },
    rest,
  );
  if (asChild) {
    return /*#__PURE__*/ _jsx(
      Slot,
      // Slot ref 类型为 HTMLElement，这里为了保持 Button 对外签名为 HTMLButtonElement，使用 cast
      _objectSpread(
        _objectSpread(
          {
            ref: ref,
          },
          sharedProps,
        ),
        {},
        {
          'aria-disabled': isDisabled ? true : undefined,
          tabIndex: isDisabled ? -1 : rest.tabIndex,
          children: children,
        },
      ),
    );
  }
  return /*#__PURE__*/ _jsxs(
    'button',
    _objectSpread(
      _objectSpread(
        {
          ref: ref,
          disabled: isDisabled,
        },
        sharedProps,
      ),
      {},
      {
        // ✅ eslint-plugin-react 认可：静态字面量 / 简单三元（且最终返回字面量）
        type:
          type === 'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button',
        children: [Start, content, End],
      },
    ),
  );
});
