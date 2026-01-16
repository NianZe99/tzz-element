# tzz-element Copilot Instructions

You are working on a pnpm workspace monorepo.

## Structure

- packages/components: React component library built by father (es/ + lib/)
- packages/components/src: component sources used by dumi v2 atomDirs
- packages/tests: vitest + testing-library

## Conventions

- Use React 18+, TypeScript, CSS Modules (\*.module.css)
- Prefer named exports (no default export)
- File names should be lowercase: button.tsx, types.ts, utils.ts
- Accessibility required: WAI-ARIA, focus-visible, icon-only requires aria-label
- Button: default type="button", asChild supported via Slot, disabled/loading blocks interaction

## Workflows

- New component: API design -> implementation -> dumi demos -> tests -> changeset -> conventional commit
- Commands: pnpm dev, pnpm build, pnpm test:fast
- Conventional commits: feat(scope): subject, fix(scope): subject, test(scope): subject
