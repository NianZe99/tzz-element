# Component Template (copy/paste skeleton)

## Folder Structure

packages/components/src/<Component>/

- index.ts (barrel export)
- <component>.tsx (implementation, lowercase filename)
- types.ts
- utils.ts (optional)
- <component>.module.css
- index.md (dumi docs)
- demos/
  - basic.tsx
  - variant.tsx
  - size.tsx
  - loading.tsx
  - as-child.tsx

## Barrel Export (index.ts)

```ts
export { Component } from './<component>';
export type { ComponentProps } from './types';
```
