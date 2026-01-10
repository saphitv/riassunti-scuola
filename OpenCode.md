# OpenCode.md

## Commands
- **Build**: `pnpm run build` (Runs Next.js build process)
- **Lint**: `pnpm run lint` (Uses ESLint to check code quality)
- **Test**: No specific test scripts found. Add if testing is required.

## Code Style Guidelines

### Imports
- Use ES6 imports; group external libraries first, followed by internal files.
- Sort imports alphabetically within each group.

### Formatting
- Follow standard Prettier defaults.
- Indentation: 2 spaces.
- Line width: 80 characters max.
- Use single quotes for strings; exceptions for template literals.

### TypeScript
- Use strict typing where applicable.
- Prefer interface over type unless unions required.
- Enable strict mode in tsconfig.json (`"strict": true`).

### Naming Conventions
- Components: Capitalized (e.g., `Box.tsx`).
- Hooks and functions: camelCase.
- Constants: UPPERCASE_SNAKE_CASE.

### Error Handling
- Utilize `try/catch` for async/await errors.
- Use specific error messages to aid debugging.

### Additional Notes
- The repository lacks test scripts. Recommend adding structured tests using Jest or similar frameworks if applicable.

### Pending Enhancements
- Add Cursor or ESLint rules to document organizational patterns.