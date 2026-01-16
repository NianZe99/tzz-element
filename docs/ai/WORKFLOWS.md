# Workflows

## Component Development Workflow (standard)

1. API Design
   - define props: variant, size, disabled, loading, icon, polymorphism (asChild)
   - include WAI-ARIA considerations
2. Implementation
   - React.forwardRef
   - CSS Modules
   - avoid leaking internal props to DOM
3. Docs (dumi)
   - `packages/components/src/<Component>/index.md`
   - demos under `demos/` referenced by `<code src="./demos/xxx.tsx" />`
4. Tests
   - add/extend tests in `packages/tests`
   - tests must run against source (vitest alias)
5. Release record
   - `pnpm changeset` (usually minor for new component; patch for fix)
6. Commit & PR
   - commit message must satisfy commitlint
   - open PR, CI should pass
7. Version & Publish
   - either:
     - CI creates Version PR and publishes after merge, OR
     - local: `pnpm changeset version` then CI publish

## Local Verification Checklist

- docs: `pnpm dev` (Button page + demos render)
- build: `pnpm build` (father outputs `es/` and `lib/`)
- tests: `pnpm test:fast` (vitest run)
- (optional) pack: `pnpm -C packages/components pack` check tarball contents

## Commit Message Cheatsheet

- feature: `feat(button): add Button component`
- fix: `fix(button): prevent click when disabled in asChild`
- test: `test(button): add vitest coverage`
- chore: `chore(release): version packages`
