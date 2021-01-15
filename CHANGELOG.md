# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.10.0] - 2021-01-15

### Changed
- Bumped required PHP version to 7.1.

### Fixed
- More through validation for "field" argument before it gets passed to ProcesChangelogHooks::shouldLogPageEvent(), avoid type mismatch.

## [1.9.0] - 2021-01-15

### Added
- New hookable method ProcessChangelogHooks::shouldLogPageEvent().

## [1.8.0] - 2021-01-10

### Changed
- Added ProcesWire namespace and bumped required ProcessWire version to 3.0+.
- Minor JavaScript and GUI improvements.

### Fixed
- Changing filters restores uk-select class for select elements when using the Uikit admin theme.
- System notification changes are no longer logged as field edit operations on the User page.

## [1.7.1] - 2019-10-13

### Changed
- When guest role is included in ignored_roles, it takes effect only if it's the only role that the current user has.

## [1.7.0] - 2019-10-13

### Added
- New config options ignored_roles and ignored_users for ignoring changes made by specific roles/users (ProcessChangelogHooks).

## [1.6.0] - 2019-07-18

### Added
- New statuses "hid" and "unhid" for when the visibility status of a page has changed.
- Added composer.json and CHANGELOG.md files.

### Fixed
- When a page visibility status changes, don't log a publish/unpublish event (unless the page was also published/unpublished).
