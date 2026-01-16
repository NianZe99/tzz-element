var _excluded = ['children', 'className', 'style', 'onClick', 'onKeyDown'];
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
function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t =
    null == r
      ? null
      : ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator'];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (((i = (t = t.call(r)).next), 0 === l)) {
        if (Object(t) !== t) return;
        f = !1;
      } else
        for (
          ;
          !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l);
          f = !0
        );
    } catch (r) {
      (o = !0), (n = r);
    } finally {
      try {
        if (!f && null != t.return && ((u = t.return()), Object(u) !== u))
          return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
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
import * as React from 'react';

/**
 * 类名合并工具（不引入 clsx/classnames，保持库自包含）
 * 支持：
 *  - cn('a', 'b')
 *  - cn('a', condition && 'b')
 *  - cn(['a', 'b'])
 *  - cn({ a: true, b: false })
 */

export function cn() {
  var classes = [];
  var push = function push(v) {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') {
      classes.push(String(v));
      return;
    }
    if (Array.isArray(v)) {
      v.forEach(push);
      return;
    }
    if (_typeof(v) === 'object') {
      for (
        var _i = 0, _Object$entries = Object.entries(v);
        _i < _Object$entries.length;
        _i++
      ) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          k = _Object$entries$_i[0],
          ok = _Object$entries$_i[1];
        if (ok) classes.push(k);
      }
    }
  };
  for (
    var _len = arguments.length, inputs = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    inputs[_key] = arguments[_key];
  }
  inputs.forEach(push);
  return classes.join(' ');
}

/**
 * 合并多个 ref（forwardRef + childRef 场景）
 */
export function composeRefs() {
  for (
    var _len2 = arguments.length, refs = new Array(_len2), _key2 = 0;
    _key2 < _len2;
    _key2++
  ) {
    refs[_key2] = arguments[_key2];
  }
  return function (node) {
    for (var _i2 = 0, _refs = refs; _i2 < _refs.length; _i2++) {
      var ref = _refs[_i2];
      if (!ref) continue;
      if (typeof ref === 'function') ref(node);
      else ref.current = node;
    }
  };
}

/**
 * 合并事件处理器：先执行 ours，再执行 theirs
 * - 如果 ours 调用了 preventDefault / stopPropagation，theirs 仍可能执行（取决于你是否 early return）
 *   所以建议在 ours 内部对 disabled/loading 做 early return。
 */
export function mergeHandlers(ours, theirs) {
  return function (event) {
    ours === null || ours === void 0 || ours(event);
    if (event.defaultPrevented) return; // ✅ disabled/loading 时不再触发子元素 handler
    theirs === null || theirs === void 0 || theirs(event);
  };
}

/**
 * Slot：将 props/className/ref 注入到 child（asChild 模式）
 * - 不依赖 @radix-ui/react-slot
 * - 仅支持单个 ReactElement
 */

export var Slot = /*#__PURE__*/ React.forwardRef(function Slot(
  _ref,
  forwardedRef,
) {
  var children = _ref.children,
    className = _ref.className,
    style = _ref.style,
    onClick = _ref.onClick,
    onKeyDown = _ref.onKeyDown,
    rest = _objectWithoutProperties(_ref, _excluded);
  if (!(/*#__PURE__*/ React.isValidElement(children))) return null;
  var childProps = children.props;
  var mergedClassName = cn(childProps.className, className);
  var mergedStyle = _objectSpread(
    _objectSpread({}, childProps.style || {}),
    style || {},
  );
  var mergedOnClick = mergeHandlers(onClick, childProps.onClick);
  var mergedOnKeyDown = mergeHandlers(onKeyDown, childProps.onKeyDown);
  var mergedRef = composeRefs(children.ref, forwardedRef);
  return /*#__PURE__*/ React.cloneElement(
    children,
    _objectSpread(
      _objectSpread(_objectSpread({}, rest), childProps),
      {},
      {
        className: mergedClassName,
        style: mergedStyle,
        onClick: mergedOnClick,
        onKeyDown: mergedOnKeyDown,
        ref: mergedRef,
      },
    ),
  );
});
