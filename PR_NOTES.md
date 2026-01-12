# Cleanup & Architecture PR Notes

Summary of changes made:

- Consolidated IndiaMap implementation to a single canonical file and added a thin re-export:
  - Edited: `src/components/IndiaMap/index.tsx` (now `export { IndiaMap } from './IndiaMap';`)
- Moved inline components out of `HomePage.tsx` into `src/components/Home/`:
  - Added: `src/components/Home/EducationLinksSection.tsx`
  - Added: `src/components/Home/StateSelectionPanel.tsx`
  - Added: `src/components/Home/CTASection.tsx`
  - Updated: `src/pages/HomePage.tsx` (imports and removed inline component definitions)
- Removed unused files and artifacts:
  - Removed: `src/data/engineeringJobsSample.ts` (unused sample data)
  - Removed: `src/dist/` (build artifacts)
  - Updated: `.gitignore` to ignore `src/dist`
- Fixed TypeScript error in `src/pages/StateJobsPage.tsx` by safely accessing `jobs`.
- Documentation:
  - Updated `README.md` with a short project structure guide
  - Added `CONTRIBUTING.md` with component placement guidelines

Notes & next steps:
- ESLint currently reports browser/global related warnings (e.g., `document`, `window`) — consider enabling the `browser` env in ESLint or adding appropriate globals to the config.
- There were some lint errors (unused vars, console statements) that we left for a follow-up pass; I can clean them up if you want.
- The repository is not initialized as a git repo in this workspace, so I could not create a backup branch here — if you want, create a branch and I can prepare a PR patch or a git-friendly patch.

If you'd like, I can now:
- Run a follow-up lint/fix pass and remove remaining ESLint errors,
- Move more components to `features/` vs `ui/` according to a final architecture plan,
- Open a PR-ready patch file or prepare a git patch you can apply.

Let me know which of the follow-ups you'd like me to take next.
