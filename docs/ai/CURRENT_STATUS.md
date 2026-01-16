# Current Status

Date: (update when necessary)

## Button

- Button component implemented with:
  - variant/size/block/disabled/loading/startIcon/endIcon/spinnerPlacement/asChild
  - React.forwardRef
  - CSS Modules styles
  - WAI-ARIA semantics
- Dumi docs & demos:
  - `packages/components/src/Button/index.md`
  - `packages/components/src/Button/demos/*`
- Tests:
  - `packages/tests/src/button.test.tsx` added
  - vitest config aliases `@mariotzz/tzz-element` -> `packages/components/src/index.ts`

## Known Pitfalls Already Resolved

- Avoid `index.ts` + `index.tsx` same folder (self-import cycle)
- macOS case-insensitive FS conflict (`Button.tsx` vs `button.tsx`) => use lowercase file names
- eslint react/button-has-type => keep `type` as simple inline ternary and place after spread
- Slot handler merge must respect preventDefault to avoid calling child handlers when disabled/loading

## Release

- changesets workflow works (2FA granular token)
- commitlint active: must use `type(scope): subject`

## Next Suggested Components

- Icon (unify icons + a11y labels)
- Link (paired with Button asChild)
- Space/Stack (layout utilities)
