# AGENTS.md

Instructions for AI coding agents working in this repository.

## Project Overview

Server-rendered landing page for **PLASTIMET** (PVC hose/pipe manufacturer).
Built with **Node.js + Express v5 + EJS v4**. No TypeScript, no bundler, no SPA framework.
All content and comments are in **Spanish**.

## Architecture

```
server.js                   # Express entry point (CommonJS)
views/
  pages/index.ejs           # Main page layout
  partials/                 # Reusable EJS components (head, hero, header, footer, scripts)
public/
  css/                      # One CSS file per component (styles.css, hero.css, footer.css)
  js/main.js                # Client-side vanilla JS (typewriter, parallax)
  images/                   # Served static images
img/                        # Source/raw images (NOT served)
```

- `server.js` configures Express, sets EJS as view engine, serves `public/` as static, and defines routes.
- Each page is in `views/pages/`. Partials are in `views/partials/` and included via `<%- include('../partials/name') %>`.
- One CSS file per section/component, all linked from `views/partials/head.ejs`.
- Client JS lives in `public/js/main.js`, loaded via `views/partials/scripts.ejs`.

## Build / Run Commands

| Command         | Description                                        |
|-----------------|----------------------------------------------------|
| `npm start`     | Production: `node server.js`                       |
| `npm run dev`   | Development: `node --watch server.js` (auto-reload)|

Server runs on `process.env.PORT` or defaults to port **3000**.

### No build step

There is no transpilation, bundling, or compilation. Files are served as-is.

### No tests

There is no test framework, test runner, or test files. If you add tests, use a
lightweight runner (e.g., `node --test` built-in, or vitest) and place test files
next to source or in a `test/` directory. Add a `"test"` script to `package.json`.

### No linter/formatter

There is no ESLint, Prettier, or Stylelint configured. If adding one, match the
existing code style documented below.

## Code Style Guidelines

### JavaScript (Server - CommonJS)

- **Module system:** CommonJS (`require` / `module.exports`). Do NOT use ES module `import/export`.
- **Quotes:** Single quotes for strings. Template literals for interpolation.
- **Semicolons:** Always use semicolons.
- **Indentation:** 2 spaces.
- **Naming:** `camelCase` for variables and functions, `UPPER_CASE` for constants (e.g., `PORT`).
- **Arrow functions:** Use for callbacks and route handlers: `(req, res) => { ... }`.
- **Comments:** In Spanish, using `//` single-line style.
- **Import order:** Third-party modules first (`express`), then Node built-ins (`path`), then local files.
- **Environment variables:** Use `process.env.VAR || default` pattern.

### JavaScript (Client - Vanilla)

- **No framework.** Use `document.addEventListener('DOMContentLoaded', () => { ... })` as entry.
- **DOM access:** `document.getElementById()` and `document.querySelector()`.
- **Named functions:** Use `function name() {}` declarations inside the DOMContentLoaded listener (not arrow functions for named functions).
- **Section separators:** Use `// ========================================` banners between logical sections.
- **JSDoc:** Add a block comment at the top of each JS file describing its purpose.
- **Animation:** Prefer `requestAnimationFrame` for scroll handlers. Use `setTimeout` for sequential timing.
- **Guard checks:** Always check if DOM elements exist before using them (`if (element) { ... }`).

### CSS

- **BEM naming:** Strict BEM convention: `.block__element--modifier` (e.g., `hero__title`, `hero__cursor--hidden`).
- **CSS custom properties:** Define all design tokens in `:root` in `styles.css`. Reference them with `var(--name)`.
- **File per component:** One CSS file per section (e.g., `hero.css`, `footer.css`). Global reset and variables in `styles.css`.
- **Section headers:** Use `/* ======================================== */` comment blocks to separate sections.
- **Layout:** Use Flexbox. No Grid unless necessary.
- **Responsive breakpoints:** `768px` (tablet), `480px` (mobile). Use `@media (max-width: ...)`.
- **Performance:** Use `will-change` on animated elements. Use `@supports` for feature detection.
- **Colors:** Use CSS custom properties. Hardcoded colors are acceptable only in component-specific contexts (e.g., text-shadow).
- **No preprocessors:** Vanilla CSS only. No Sass, Less, or PostCSS.

### EJS Templates

- **Partials:** All reusable HTML fragments go in `views/partials/`. Include with `<%- include('../partials/name') %>`.
- **Escaped output:** Use `<%= variable %>` for text content (auto-escaped).
- **Unescaped output:** Use `<%- ... %>` only for includes and trusted HTML.
- **Data passing:** Pass data from Express route handlers via `res.render('pages/name', { key: value })`.
- **HTML lang:** Always set `<html lang="es">`.

### HTML

- **Semantic elements:** Use `<section>`, `<main>`, `<footer>`, `<header>`, `<nav>`.
- **Accessibility:** Include `aria-label` on interactive elements (buttons, toggles).
- **IDs:** Use for JS hooks (e.g., `id="typewriter"`). Classes for styling.

## Error Handling

Currently minimal. When adding features:

- Add Express error-handling middleware: `app.use((err, req, res, next) => { ... })`.
- Add a 404 catch-all route.
- Wrap async route handlers in try/catch.
- Never expose stack traces in production.

## Dependencies

Only two production dependencies. Keep it minimal:

| Package   | Version | Purpose                |
|-----------|---------|------------------------|
| express   | ^5.2.1  | Web framework          |
| ejs       | ^4.0.1  | Templating engine      |

No devDependencies. Add only what is strictly necessary.

## Adding New Sections

1. Create a partial in `views/partials/newsection.ejs`.
2. Create a CSS file `public/css/newsection.css`.
3. Add the `<link>` tag in `views/partials/head.ejs`.
4. Include the partial in `views/pages/index.ejs` with `<%- include('../partials/newsection') %>`.
5. If JS is needed, add a new section in `public/js/main.js` with a `// ========` banner separator.

## Adding New Routes

1. Define the route in `server.js` using `app.get('/path', (req, res) => { ... })`.
2. Create the page template in `views/pages/newpage.ejs`.
3. Pass `title` and `description` to `res.render()` for SEO.

## Git

- `.gitignore` excludes: `node_modules/`, `.env`, `*.log`, IDE files (`.vscode/`, `.idea/`).
- No CI/CD pipelines configured.
- No pre-commit hooks.

## Notes

- The `views/partials/header.ejs` navigation partial exists but is NOT included in `index.ejs` yet.
- The `img/` directory at root contains source images not served by Express. Served images go in `public/images/`.
- Express v5 is used (not v4). Be aware of breaking changes (e.g., `req.query` returns `undefined` for missing keys, path matching differences).
