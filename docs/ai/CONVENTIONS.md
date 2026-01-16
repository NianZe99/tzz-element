# Conventions

## Exports

- Prefer **named exports** for components and types.
- Root entry: `packages/components/src/index.ts` re-exports all components.
- Each component folder should have `index.ts` as a barrel.

## File/Folder Naming

- Component folder name: PascalCase (current repo style): `src/Button/`
- File names inside folder: lowercase (cross-platform safe)
  - `button.tsx`, `types.ts`, `utils.ts`, `button.module.css`, `index.ts`, `index.md`
- Avoid `index.ts` + `index.tsx` in same folder to prevent self-import cycles.

## CSS

- CSS Modules only: `*.module.css`
- states must include: hover, focus-visible, active, disabled, loading
- focus style uses `:focus-visible`, not `:focus`

## Accessibility (WAI-ARIA)

- Button default `type="button"` to avoid accidental form submit
- `disabled || loading`
  - native button uses `disabled`
  - asChild uses `aria-disabled="true"` + blocks click/keyboard events + sets `tabIndex=-1`
- icon-only (`size="icon"`) should have readable label:
  - if no text children, require `aria-label` (warn in dev)

## asChild (Polymorphism)

- Uses Slot-like pattern (cloneElement + merge props)
- Must NOT leak internal props (`asChild`, `startIcon`, etc.) to DOM
- When disabled/loading: prevent default and stop propagation; do not call child handlers

## Testing

- Use @testing-library/react + user-event
- Fast tests should import from `@mariotzz/tzz-element` but alias points to source entry
- Add minimal but meaningful tests:
  - render
  - default type behavior
  - submit behavior when type="submit"
  - disabled
  - loading (aria-busy + click blocked)
  - asChild disabled behavior
  - icon-only a11y warning (optional)
