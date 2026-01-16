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

// src/Button/utils.ts
var utils_exports = {};
__export(utils_exports, {
  Slot: () => Slot,
  cn: () => cn,
  composeRefs: () => composeRefs,
  mergeHandlers: () => mergeHandlers,
});
module.exports = __toCommonJS(utils_exports);
var React = __toESM(require('react'));
function cn(...inputs) {
  const classes = [];
  const push = (v) => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') {
      classes.push(String(v));
      return;
    }
    if (Array.isArray(v)) {
      v.forEach(push);
      return;
    }
    if (typeof v === 'object') {
      for (const [k, ok] of Object.entries(v)) {
        if (ok) classes.push(k);
      }
    }
  };
  inputs.forEach(push);
  return classes.join(' ');
}
function composeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') ref(node);
      else ref.current = node;
    }
  };
}
function mergeHandlers(ours, theirs) {
  return (event) => {
    ours == null ? void 0 : ours(event);
    if (event.defaultPrevented) return;
    theirs == null ? void 0 : theirs(event);
  };
}
var Slot = React.forwardRef(function Slot2(
  { children, className, style, onClick, onKeyDown, ...rest },
  forwardedRef,
) {
  if (!React.isValidElement(children)) return null;
  const childProps = children.props;
  const mergedClassName = cn(childProps.className, className);
  const mergedStyle = { ...(childProps.style || {}), ...(style || {}) };
  const mergedOnClick = mergeHandlers(onClick, childProps.onClick);
  const mergedOnKeyDown = mergeHandlers(onKeyDown, childProps.onKeyDown);
  const mergedRef = composeRefs(children.ref, forwardedRef);
  return React.cloneElement(children, {
    ...rest,
    ...childProps,
    className: mergedClassName,
    style: mergedStyle,
    onClick: mergedOnClick,
    onKeyDown: mergedOnKeyDown,
    ref: mergedRef,
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    Slot,
    cn,
    composeRefs,
    mergeHandlers,
  });
