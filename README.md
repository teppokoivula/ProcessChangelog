Process Changelog Module
========================

Changelog module for ProcessWire CMS/CMF.
Copyright (c) 2013-2022 Teppo Koivula

This module keeps track of changes (edits, additions, removals etc.) on your ProcessWire site. It is not intended as a version control solution: for that purpose there are other modules. The goal of this module is to provide admin users with a quick overview of sitewide changes.

## Requirements

- ProcessWire 3.x (at least last two master versions will be officially supported)
- PHP 7.1+

Automatic cleanup (highly recommended) requires that you install the LazyCron module. While LazyCron is bundled with the core package, it is not installed by default. Without automatic cleanup your database can eventually become slow as more and more changelog data is accumulated.

## Installing

This module is installed just like any other ProcessWire module: copy or clone the directory containing this module to your /site/modules/ directory, log in, go to Admin > Modules, click "Check for new modules", and install "Changelog".

Alternatively you can get module files via Composer:

```
composer require teppokoivula/process-changelog
```

Process Changelog Hooks will be automatically installed with the main module, while installing Process Changelog RSS is completely optional: if installed, it provides you with a publicly viewable RSS feed of the changes to your site. More details under "Changelog RSS feed" heading.

## How to use

When you install this module, it creates a new page into the Admin called Changelog (Settings > Changelog). This page contains a list of changes to pages on the site since the moment this module was installed. By clicking the *more* link next to each row reveals more information about that particular change.

In order to access the Changelog page, users need to a) be authenticated and b) have a role with the "changelog" permission *or* have the superuser role. While the changelog permission will be added automatically when this module is installed, it needs to be given to any applicable roles manually.

### Changelog RSS feed

This module provides two types of RSS feeds: one that can be accessed only by authenticated users via the Changelog page (/setup/changelog/rss/), and other which can be enabled by installing the optional Process Changelog RSS module, typing in a key to it's config settings, and accessing the feed via URL such as this: http://example.com/process-changelog-rss.xml?key=1234567890.

Since the latter feed can be accessed via a public URL, please make sure that your key is as difficult to guess as possible (and never use key 1234567890). If you are unsure about whether you really need this feature, please leave the Process Changelog RSS module uninstalled.

### Schema update instructions

This module updates the database schema automatically, but there may be cases where an update doesn't work as expected, particularly if you've got *a lot* of data in your database table(s).

If an error occurs, you can run schema update manually. Easiest way to trigger this would be creating a simple bootstrap script and running it on the server:

```
<?php

// place this script in your site's root directory, at the same level as the
// ProcessWire index.php file, and execute via the php command.

require __DIR__ . '/index.php';
$changelog = $wire->modules->get('ProcessChangelogHooks');
$changelog->updateDatabaseSchema(true);
```

This may take a while to run, but shouldn't result in a timeout, which is the most likely cause for errors when running schema updates via admin.

If you are unable to run the schema update this way, you may perform expected changes (see ProcessChangelogHooks::updateDatabaseSchema() for applicable SQL command(s)) directly in the database and then manually update "schema version" setting in Process Changelog Hooks module config.

### Hooks

Process Changelog exposes various hookable methods, some of which you can use to customize the data that is collected, while others are more useful for triggering actions or simply modifying the output of the module itself. Here we'll provide some ideas about hooking into the module's execution.

Note: this section of the README is a work in progress; more tips and tricks will likely be added later.

#### Adding new column(s) to the admin table view

You can customize the admin table view, typically to add new columns (but alternatively to remove some columns) by hooking into `ProcessChangelog::getHeaderRow()` and `ProcessChangelog::parseTableRow()`:

```php
// add header row for our new column
$wire->addHookAfter('ProcessChangelog::getHeaderRow', function($event) {
	$event->return = array_merge($event->arguments[0], ['Fields']);
});

// add data for our new column
$wire->addHookAfter('ProcessChangelog::parseTableRow', function($event) {
	$details = json_decode($event->arguments[0]['data'], true) ?: [];
	$event->return = array_merge($event->return, [$details['Fields edited'] ?? '']);
});
```

## Settings

This module contains a bunch of settings you should be aware of. Settings can be defined via ProcessWire's native module configuration screen, and each of the bundled module's has it's own settings.

*See Process Changelog, Process Changelog Hooks, and Process Changelog RSS module config screens for more details.*

## Icons

Icons used by this module are part of Gnome Project and licensed under GNU GPL v2 (http://www.gnu.org/licenses/gpl-2.0.html). Visit http://gnome.org or http://art.gnome.org/themes/icon for more information.

## License

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

(See included LICENSE file for full license text.)
