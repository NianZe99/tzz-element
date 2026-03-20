# Conventions

## Exports

- Prefer **named exports** for components and types.
- Root entry: `packages/components/src/index.ts` re-exports all components.
- Each component folder should have `index.ts` as a barrel.

## File/Folder Naming

- Component folder name: PascalCase: `src/Button/`, `src/Modal/`
- File names inside folder: lowercase (cross-platform safe)
  - `button.tsx`, `types.ts`, `utils.ts`, `button.module.css`, `index.ts`, `index.md`
- Avoid `index.ts` + `index.tsx` in same folder to prevent self-import cycles.

## CSS

- CSS Modules only: `*.module.css`
- Import shared tokens: `@import '../styles/tokens.css';`
- Use `--tzz-*` CSS Variables for theming
- States must include: hover, focus-visible, active, disabled, loading
- Focus style uses `:focus-visible`, not `:focus`
- Use `data-*` attributes for state-based styling (`data-type`, `data-size`, `data-disabled`, `data-loading`, `data-danger`)

## Design Tokens

- All design tokens live in `packages/components/src/styles/tokens.css`
- Color system: primary, success, warning, error (each with -hover, -active, -bg, -border)
- Sizes: `--tzz-size-sm` (24px), `--tzz-size` (32px), `--tzz-size-lg` (40px)
- Spacing: xs (4px), sm (8px), default (12px), lg (16px), xl (24px)
- Motion: `--tzz-duration` (200ms), `--tzz-easing` (cubic-bezier)
- Z-index: dropdown (1050), modal (1000), message (1010), tooltip (1070)

## Accessibility (WAI-ARIA)

- Button default `htmlType="button"` to avoid accidental form submit
- `disabled || loading`:
  - native button uses `disabled`
  - asChild uses `aria-disabled="true"` + blocks click/keyboard events + sets `tabIndex=-1`
  - anchor (href) renders as disabled anchor
- Switch uses `role="switch"` + `aria-checked`
- Modal uses `role="dialog"` + `aria-modal` + `aria-labelledby`
- Select uses `role="combobox"` + `aria-expanded` + `aria-haspopup`
- Icon-only buttons should have `aria-label`

## Component API Patterns

- Props follow ant-design conventions where applicable:
  - `type` for visual variant (Button: default/primary/dashed/text/link)
  - `size` uses string values (small/middle/large or small/default)
  - `variant` for form controls (outlined/filled/borderless)
  - `status` for validation (error/warning)
  - `danger` boolean for danger state
  - Controlled/uncontrolled pattern: `value`/`defaultValue` + `onChange`
  - `open`/`defaultOpen` + `onOpenChange` for visibility
- Use `React.forwardRef` for all components
- Sub-components attached as static properties: `Card.Meta`, `Space.Compact`, `Upload.Dragger`

## asChild (Polymorphism)

- Uses Slot-like pattern (cloneElement + merge props)
- Must NOT leak internal props to DOM
- When disabled/loading: prevent default and stop propagation; do not call child handlers

## Testing

- Use @testing-library/react + user-event
- Fast tests import from `@mariotzz/tzz-element` (alias points to source)
- Add meaningful tests covering: render, props, interaction, a11y

## Imperative APIs

- Message uses module-level singleton pattern with `createRoot`
- Called via `message.success()`, `message.error()`, etc.
