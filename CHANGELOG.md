# Changelog

All notable changes to this project will be documented in this file.

## [0.10.1] - 2026-03-18

### Navigation
- Smoother transition between steps

## [0.10.0] - 2026-03-18

### History graphs
- Adds line graph and trending score

## [0.9.1] - 2026-03-12

### Sanity check
- Adds guard before calculation

## [0.9.0] - 2026-03-12

### Testing
- Adds unit, integration and e2e test suite

### UI/UX
- Better phrasing
- Progress bar when timer is running

## [0.5.1] - 2026-03-10

### Navigation
- Adds home logo to every page

### UX
- Adds sand clock icon to "pause" button

## [0.5.0] - 2026-03-10

### About page
- New about page

### UI/UX
- Navigation improved
- Prettier links

## [0.3.1] - 2026-03-10

### Chore (i18n)
- Better text messages

## [0.3.0] - 2026-03-09

### Chore (routing)
- Routes migrated to English slugs

## [0.2.0] - 2026-03-09

### Enhancement (UX)
- Better phrasing across user-facing copy for clearer, more natural guidance.
- UI improvements focused on flow clarity and action visibility (headers, buttons, and evaluation navigation).

## [0.1.0] - 2026-03-09

### Added
- Initial guided loop-interruption flow.
- Local session persistence and attempt history.
- Intervention timers and localized Spanish content.
- Intervention extra-info modal with scientific notes.
- Two-step final evaluation flow (`/evaluacion` and `/evaluacion-feedback`).
- Evaluation feedback image support (`feedback-low`, `feedback-medium`, `feedback-high`).
- GitHub Actions CI workflow for lint and build checks.
- Project licensing file (`LICENSE.md`) and this changelog.

### Changed
- Landing page now shows `Ver historial` only on the home screen.
- `Finalizar` flow now returns to `/` and resets session values.
- Buttons are center-aligned by default.
- Secondary buttons now have visible borders for better differentiation.
- Intervention list visual treatment improved for clearer click affordance.

### Fixed
- Related feelings are deduplicated in summaries (accent/case-insensitive normalization).
- Multiple navigation and evaluation flow edge cases around guarded routes.
