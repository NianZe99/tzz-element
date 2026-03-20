# Current Status

Date: 2026-03-19

## Components (11 total)

### Button (refactored)

- Refactored with ant-design inspired API:
  - `type` (default/primary/dashed/text/link) + `danger` + `ghost`
  - `shape` (default/circle/round)
  - `size` (small/middle/large)
  - `loading` with delay support `{ delay: number }`
  - `icon` + `iconPlacement` (start/end)
  - `href` support (renders `<a>` automatically)
  - `asChild` polymorphism preserved
  - `htmlType` instead of native `type`
- CSS Modules + CSS Variables (tokens.css)
- Docs & demos updated
- Tests updated

### Space

- `size` (small/middle/large/number/[row,col])
- `direction` (horizontal/vertical)
- `wrap`, `align`, `split`
- `Space.Compact` sub-component

### Input

- `size`, `variant` (outlined/filled/borderless), `status` (error/warning)
- `prefix`, `suffix`, `allowClear`
- `TextArea` with `autoSize` and `showCount`

### Switch

- `checked`/`defaultChecked`, `onChange`
- `size` (default/small), `loading`, `disabled`
- `checkedChildren`/`unCheckedChildren`

### Tooltip

- Pure CSS positioning (no floating-ui dependency)
- 12 placements, `trigger` (hover/click/focus)
- `arrow`, `color`, `mouseEnterDelay`/`mouseLeaveDelay`

### Card

- `title`, `extra`, `cover`, `actions`
- `size` (default/small), `bordered`, `hoverable`
- `Card.Meta` (avatar + title + description)
- Loading skeleton

### Modal

- Portal-based rendering
- `closable`, `maskClosable`, `keyboard` (ESC)
- `confirmLoading`, `okText`/`cancelText`
- Body scroll lock

### Dropdown

- `items` (MenuItemType[]) with divider support
- `trigger` (hover/click/contextMenu)
- `placement`, `autoClose`
- Click outside to close

### Select

- `options`, `value`/`defaultValue`, `onChange`
- `size`, `variant`, `status`, `allowClear`
- `mode` (multiple/tags)
- `showSearch` with `filterOption`

### Message

- Imperative API: `message.success/error/warning/info/loading`
- `duration`, `key` (for update/destroy)
- Portal-based notification queue

### Upload

- `action`, `accept`, `multiple`, `maxCount`
- `fileList` (controlled), `beforeUpload`, `customRequest`
- File list with progress and remove
- `Upload.Dragger` drag-and-drop sub-component

## Shared Infrastructure

- Design tokens: `packages/components/src/styles/tokens.css`
  - Colors (primary, success, warning, error + hover/active/bg/border variants)
  - Sizes, spacing, radius, font, shadow, z-index, motion, focus ring
- All components use CSS Modules + `--tzz-*` CSS Variables
- Zero external runtime dependencies (no floating-ui, no clsx)

## Tests

- Framework: Vitest + @testing-library/react + user-event
- Test files: `packages/tests/src/*.test.tsx`
- Components with tests: Button, Space, Input, Switch, Card, Modal, Select

## Known Pitfalls Already Resolved

- Avoid `index.ts` + `index.tsx` same folder (self-import cycle)
- macOS case-insensitive FS conflict => use lowercase file names
- eslint react/button-has-type => use htmlType prop + ternary
- Slot handler merge must respect preventDefault

## Release

- changesets workflow works (2FA granular token)
- commitlint active: must use `type(scope): subject`
