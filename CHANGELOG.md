# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project follows Semantic Versioning.


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
