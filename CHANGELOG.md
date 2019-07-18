# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.6.0] - 2019-07-18

### Added
- New statuses "hid" and "unhid" for when the visibility status of a page has changed.
- Added composer.json and CHANGELOG.md files.

### Fixed
- When a page visibility status changes, don't log a publish/unpublish event (unless the page was also published/unpublished).
