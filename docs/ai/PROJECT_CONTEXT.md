# Project Context: tzz-element

## Overview

- Repo: `tzz-element` (pnpm workspace monorepo)
- Goal: personal open-source-quality React component library

## Tech Stack

- React 18+
- TypeScript
- CSS Modules (`*.module.css`)

## Monorepo Layout

- `packages/components`
  - publish package: `@mariotzz/tzz-element`
  - build tool: father
  - outputs: `es/` and `lib/`
  - sources: `packages/components/src/*`
- `packages/tests`
  - vitest + @testing-library/react + user-event
  - fast tests should run against **source code** (alias to `packages/components/src/index.ts`)
- docs site: dumi v2
  - `atomDirs` points to `packages/components/src` (component docs + demos)
  - dev alias: `@mariotzz/tzz-element` -> `packages/components/src/index.ts`

## Release

- changesets + GitHub Actions workflow already works
- npm account has 2FA enabled
  - uses granular token + 2FA bypass
  - workflow writes token into npm config (temporary userconfig) and exports `NPM_TOKEN` at job env
- intended flow:
  - PR contains code + `.changeset/*`
  - CI creates Version PR (or local `changeset version`) and then publish

## Git / Commit Rules

- husky + commitlint enabled
- must follow Conventional Commits: `type(scope): subject`
  - examples: `feat(button): add Button component`, `test(button): add tests`, `chore(release): version packages`
