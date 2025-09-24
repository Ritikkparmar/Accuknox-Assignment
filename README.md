# React Dashboard (Vite + TypeScript + Tailwind + Zustand)

A production‑ready, componentized dashboard that supports dynamic widgets, per‑section management, charts, search, and local persistence.

## Tech Stack
- Vite + React + TypeScript
- TailwindCSS (utility-first styling)
- Zustand (state and UI management with localStorage persistence)
- Recharts (donut and bar charts)
- Lucide React (icons)

## Key Features

### 1) Sections (Categories)
The dashboard is organized into categories (sections):
- CSPM Executive Dashboard
- CWPP Dashboard
- Registry Scan

Each section renders a grid of “cards” (widgets). The grid is responsive: 1–3 columns depending on viewport.

### 2) Widget Cards
Each widget is rendered inside a reusable `WidgetCard` component with:
- Title (top-left)
- Optional “Add” button (duplicates the card)
- Remove (X) button (removes that card instance only)
- Body content (chart or custom text)

CSPM cards display donut charts with legends; Registry Scan cards display bar charts and show a small category badge.

### 3) Add Widget (Modal)
Each section header has an “Add Widget” button that opens a modal to create a new custom widget:
- Select Category (section where the card will appear)
- Widget Title
- Widget Text (arbitrary content for assignment/demo)

On submit:
- A new dynamic template is created
- A new card instance is appended to the selected section

### 4) Manage Widgets (Right‑Side Panel)
Each section header also has a “Manage” button that opens a slide‑over panel with:
- Category tabs (CSPM / CWPP / Registry)
- Search input to filter widgets by title
- List of widgets for that category with Add/Remove toggles
  - Add: appends one instance of that widget to the section
  - Remove: removes all instances of that widget from the section

This is the category‑wise control you asked for earlier, with search and add/remove in one place.

### 5) Per‑Card Remove (X)
Every card instance has its own X button to remove that single instance from the section without affecting other instances or templates.

### 6) Global Search (Header)
Top header includes a centered search input (placeholder). It’s a hook-in point to wire up page‑level filtering if needed; currently the full content is visible while the category manager has its own real filtering.

### 7) Persistence
Zustand store persists the primary dashboard state (categories/widgets) to `localStorage`, so the dashboard state survives reloads.

### 8) Accessibility & UX
- Keyboard‑reachable buttons
- ARIA roles on dialogs
- Clear focus styles
- Consistent spacing/typography

## Project Structure
```
src/
  components/
    Dashboard.tsx               # initial dashboard (store-based)
    CategorySection.tsx         # category renderer for initial dashboard
    WidgetCard.tsx              # reusable card for initial dashboard
    AddWidgetModal.tsx          # add widget modal for initial dashboard
    SearchBar.tsx               # search input for initial dashboard
    CategoryManager.tsx         # bulk manager (initial dashboard)
    v2/
      Dashboard.tsx             # enhanced dashboard (templates + instances)
      WidgetCard.tsx            # v2 reusable card
      DonutChart.tsx            # donut chart (Recharts)
      BarChart.tsx              # horizontal bars (Recharts)
  store/
    dashboardStore.ts           # Zustand stores (dashboard + UI)
  types/
    dashboard.ts
  data/
    initialData.json
  App.tsx
  main.tsx
```

Notes:
- `components/v2/Dashboard.tsx` implements the requested UX: per‑section Add Widget modal, right‑side Manage panel with category tabs + search, per‑card remove, legends, badges, and responsive grid.

## Running the App
```bash
# install deps
npm i

# start dev server
npm run dev

# build for production
npm run build

# preview production build
npm run preview
```

## How It Works (v2)

### Templates vs. Instances
- Templates define how a type of widget looks (title, category, render function)
- Instances reference a template and represent a real card on screen
- “Add” on a card duplicates its instance (same template)
- Modal “Add Widget” creates a new template (custom text) and one instance
- Panel “Manage” toggles entire templates for a category (add one instance if missing; remove all instances when toggled off)

### Important Components
- `v2/Dashboard.tsx`:
  - Maintains `templates`, `instances`
  - Implements Add Widget modal + Manage slide‑over
  - Renders category sections in a responsive grid
- `v2/WidgetCard.tsx`: header (title, Add, Remove) and body
- `v2/DonutChart.tsx` / `v2/BarChart.tsx`: charts powered by Recharts

## Extending
- Add a new static widget: push a new entry in `baseTemplates` in `v2/Dashboard.tsx`
- Change chart data: edit the arrays near the top of `v2/Dashboard.tsx`
- Customize styles: Tailwind classes throughout; tweak in component markup

## Known Notes
- Global header search is a placeholder; the right‑panel search is fully functional.
- Charts use simplified types for broad compatibility across Recharts versions.

## Troubleshooting
- If types fail for Recharts, we intentionally relaxed the Pie `data` typing.
- If the dev server warns about large chunks, this is a Vite advisory only; you can add code splitting if desired.

---
Built with ❤️ using React, Tailwind, Zustand, and Recharts.
