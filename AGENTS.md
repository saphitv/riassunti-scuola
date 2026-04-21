# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `pnpm dev` [dont user if not told]
- **Build**: `pnpm run build` [dont user if not told]
- **Lint**: `pnpm run lint`

## Architecture Overview

This is a Next.js 16 application for generating printable university study notes. It uses React 19, TypeScript, Tailwind CSS v4, and MathJax for LaTeX rendering.

### Component Hierarchy

**Layout Components** (`components/`):
- `Section` - Main content wrapper with title, controls page breaks
- `Row` / `Column` - Flexbox/grid layout with configurable widths (`half`, `third`, `two-thirds`, `fourth`, `three-fourths`)
- `Box` - Colored content box (variants: `blue`, `green`, `yellow`, `red`, `purple`, `gray`)
- `CourseHeader` - Page title header

**Content Components**:
- `Definition`, `Note`, `Theorem`, `Example` - Semantic content wrappers
- `Math` (inline) / `MathBlock` (display) - LaTeX math rendering
- `CodeBlock` - Syntax highlighting for Java, C, Python

**Sections Pattern** (`components/sections/[course-name]/`):
- Each course has dedicated section components (e.g., `IntegraliSection`, `GenericsSection`)
- Sections are self-contained, composable units of educational content
- Export hubs: `components/sections/index.ts` aggregates all course sections

### Key Patterns

1. **Composition**: Course pages import and arrange section components
2. **Export Hub**: `components/index.ts` centralizes all component exports
3. **Print Optimization**: A4 sizing (210mm width), Crimson Pro font, page break control
4. **Page Variants**: `page` (standard), `page-compact` (dense content for programming courses)


