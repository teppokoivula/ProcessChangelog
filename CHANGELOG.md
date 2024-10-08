# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.18.0] - 2024-08-21

### Added
- Option to display the "field" filter in the GUI. Disabled by default, can be enabled via the module config screen option for visible filters.

## [1.17.0] - 2024-08-21

### Added
- Added open / collapse all toggle for changelog entries.

## [1.16.2] - 2024-03-05

### Changed
- ProcessChangelogHooks config screen now uses autocomplete search for users (performance).

## [1.16.1] - 2023-12-25

### Fixed
- Fix for handling of LIMIT setting when provided via GET param.

## [1.16.0] - 2023-12-25

### Added
- New hookable methods ProcessChangelog::getHeaderRow() and ProcessChangelog::parseTableRow().

## [1.15.3] - 2023-10-12

### Changed
- New CDN URL for FontAwesome icons by @snobjorn (#39).

## [1.15.2] - 2023-08-26

### Fixed
- Fixed database error occurring in some environments while running cleanup based on a max number of rows.
- Pruning data to a specific number of rows should now prune it to exactly that number, even if there are identical timestamps.

## [1.15.1] - 2023-08-16

### Fixed
- Issue introduced in previous version where duplicate entry detection was not working properly.

## [1.15.0] - 2023-08-16

### Added
- New hookable method ProcessChangelogHooks::getPageEventDetails().

## [1.14.12] - 2023-08-12

### Fixed
- Clear date_from/date_until values after changing the value of "when" filter but before updating content if "when" filter has a value that doesn't work with these options.

## [1.14.11] - 2023-08-10

### Fixed
- Clear date_from/date_until inputs and remove date_from/date_until from URL if "when" filter has a value that doesn't work with these options.

## [1.14.10] - 2023-08-10

### Fixed
- Prevent PHP notices in cases where previous page values are not available.
- Prevent duplicate entries, which could occur e.g. when dragging page to trash or out of trash.

## [1.14.9] - 2023-08-10

### Fixed
- Fixed attr/prop issue in jQuery 3.

## [1.14.8] - 2022-07-10

### Fixed
- Missing "Previous page URL" notice in changelog views.
- Issue where page name was sometimes handled incorrectly on multi-lingual sites while renaming page.

## [1.14.7] - 2022-02-13

### Changed
- Remove log row now has a clearer confirmation message, to signal that it's removing a log row rather than a page.

## [1.14.6] - 2022-02-13

### Added
- New "view page" link for each existing and viewable item in the changelog table.

## [1.14.5] - 2022-01-22

### Changed
- Accessibility improvements.

### Fixed
- In some core versions Page::is() can return an integer (https://github.com/processwire/processwire-issues/issues/1510), in which case extraneous hid/unhid/publish/unpublish events were recorded. Return value is now typecasted to boolean to avoid this.

## [1.14.3] - 2022-01-09

### Changed
- Accessibility improvements.

### Fixed
- Properly init AdminDataTable(s) after content has been updated asynchronously.

## [1.14.1] - 2022-01-09

### Changed
- Improvements to PHP 8 compatibility.
- Various smaller updates and general code cleanup.

### Fixed
- RSS rendering issues when content included encoded characters.

## [1.14.0] - 2022-01-07

### Added
- New filter option "role" for filtering results by user role. This option is disabled by default, but can be enabled via Process Changelog module config.

## [1.13.0] - 2022-01-07

### Added
- New "prune data now" option to Process Changelog Hooks module config screen. This option triggers cleanup instantly when module config is saved, and gets then reset to default (unset) state.
- New "data max rows" config setting for Process Changelog Hooks module. If defined, this will limit the number of data rows stored to specified value. Extra rows are removed during cleanup.

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
