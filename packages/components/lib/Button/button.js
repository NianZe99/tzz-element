var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod,
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// src/Button/button.tsx
var button_exports = {};
__export(button_exports, {
  Button: () => Button,
});
module.exports = __toCommonJS(button_exports);
var React = __toESM(require('react'));
var import_button_module = __toESM(require('./button.module.css'));
var import_utils = require('./utils');
var import_jsx_runtime = require('react/jsx-runtime');
function hasReadableText(node) {
  if (node === null || node === void 0 || typeof node === 'boolean')
    return false;
  if (typeof node === 'string' || typeof node === 'number')
    return String(node).trim().length > 0;
  if (Array.isArray(node)) return node.some(hasReadableText);
  if (React.isValidElement(node)) return hasReadableText(node.props.children);
  return false;
}
var Button = React.forwardRef(function Button2(props, ref) {
  const {
    variant = 'default',
    size = 'md',
    block = false,
    disabled = false,
    loading = false,
    loadingText,
    startIcon,
    endIcon,
    spinnerPlacement = 'start',
    asChild = false,
    className,
    children,
    // 原生 props（我们需要包一层以实现 disabled/loading 的拦截）
    onClick,
    onKeyDown,
    // 原生 button type：默认 button，避免 <form> 内误提交
    type,
    ...rest
  } = props;
  const isDisabled = disabled || loading;
  if (process.env.NODE_ENV !== 'production') {
    if (size === 'icon') {
      const hasText = hasReadableText(children);
      const ariaLabel = props['aria-label'];
      if (!hasText && (!ariaLabel || ariaLabel.trim().length === 0)) {
        console.warn(
          '[tzz-element/Button] size="icon" 时建议提供 aria-label（或 children 包含可读文本），以满足无障碍要求。',
        );
      }
    }
  }
  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick == null ? void 0 : onClick(e);
  };
  const handleKeyDown = (e) => {
    if (isDisabled) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }
    onKeyDown == null ? void 0 : onKeyDown(e);
  };
  const classes = (0, import_utils.cn)(
    import_button_module.default.button,
    import_button_module.default[variant],
    import_button_module.default[size],
    block && import_button_module.default.block,
    className,
  );
  const content = loading ? loadingText ?? children : children;
  const Spinner = /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
    className: import_button_module.default.iconSlot,
    'aria-hidden': 'true',
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
      className: import_button_module.default.spinner,
    }),
  });
  const Start =
    loading && spinnerPlacement === 'start'
      ? Spinner
      : startIcon
      ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
          className: import_button_module.default.iconSlot,
          'aria-hidden': 'true',
          children: startIcon,
        })
      : null;
  const End =
    loading && spinnerPlacement === 'end'
      ? Spinner
      : endIcon
      ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)('span', {
          className: import_button_module.default.iconSlot,
          'aria-hidden': 'true',
          children: endIcon,
        })
      : null;
  const sharedProps = {
    className: classes,
    'data-variant': variant,
    'data-size': size,
    'data-disabled': isDisabled ? 'true' : 'false',
    'data-loading': loading ? 'true' : 'false',
    'aria-busy': loading ? true : void 0,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    ...rest,
  };
  if (asChild) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_utils.Slot, {
      ref,
      ...sharedProps,
      'aria-disabled': isDisabled ? true : void 0,
      tabIndex: isDisabled ? -1 : rest.tabIndex,
      children,
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('button', {
    ref,
    disabled: isDisabled,
    ...sharedProps,
    type: type === 'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button',
    children: [Start, content, End],
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    Button,
  });
