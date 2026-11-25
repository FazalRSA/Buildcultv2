# Bolt's Journal - Critical Learnings

## 2025-05-18 - Continuous 3D/Filter Background Animation Overhead
**Learning:** Continuous CSS/framer-motion animations on fixed elements with heavy filters (`blur(80px)`) or nested 3D transforms (`rotateX`, `translateZ`) force constant CPU/GPU layout recalculations and rasterization unless explicitly promoted to GPU compositor layers using `will-change: transform`.
**Action:** Always hint `will-change: transform` or `will-change: transform, opacity` on continuous background animations (`.atmosphere`, infinite marquee, floating isometric shapes) to isolate them to GPU compositor layers.
## 2025-09-30 - Route Code-Splitting in React 19 + Vite
**Learning:** Secondary route components (`ServicesPage`, `Podcast`, `ProjectDetail`) were eagerly imported in `App.tsx`, inflating the initial entry JS bundle. Utilizing `React.lazy()` and `Suspense` splits these routes into async chunks, saving ~13 kB (uncompressed) on initial page load.
**Action:** Always check `App.tsx` for eager route imports when profiling single-page React applications with multiple routes.
