# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.12.2] - 2021-12-23

### Changed
- Removed ProcessWire Composer dependency.

## [1.12.1] - 2021-07-11

### Added
- Support for filtering results by edited field. This option is intended as a power user tool and intentionally omitted from the GUI due to performance issues with larger amounts of data.

## [1.12.0] - 2021-03-15

### Added
- Schema update #3, which removes earlier index for pages_id and instead adds a new index for pages_id + id to the process_changelog database table.
- Various updates for the schema update process: ability to execute multiple SQL queries, improved fault tolerance, etc.

## [1.11.0] - 2021-03-08

### Added
- Schema update #2, which adds new indexes to the existing database table to better accommodate cases where the table contains large amounts of data.
- Support for schema updates requiring manual triggering by superuser. Useful for cases where the update may take a while to run, such as update #2.
- Optimizations for the page editor changelog section for cases where there are a lot of rows stored for a single page.
- Support for retaining data for specific number of days instead of using one of the predefined intervals.

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
