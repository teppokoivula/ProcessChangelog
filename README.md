Process Changelog Module
========================

Changelog module for ProcessWire CMS/CMF.
Copyright (c) 2013-2019 Teppo Koivula

This module keeps track of changes (edits, additions, removals etc.) on your
ProcessWire site. It is not intended as a version control solution: for that
purpose there are other modules. The goal of this module is to provide admin
users with a quick overview of sitewide changes.

## Requirements

The master branch of this module requires ProcessWire 2.3.1+. If you're running
an earlier version of ProcessWire you probably should consider updating it, but
if that's not an option, please check out the legacy branch instead:

https://github.com/teppokoivula/ProcessChangelog/tree/legacy

Automatic cleanup (which is recommended) requires that you install the LazyCron
module. While said modue is bundled with the core package, it is not installed
by default. Without automatic cleanup your database can eventually become slow
as more and more changelog data gets stored in it.

## Installing

This module is installed just like any other ProcessWire module: copy or clone
the directory containing this module to your /site/modules/ directory, log in,
go to Admin > Modules, click "Check for new modules", and install "Changelog".

Process Changelog Hooks will be automatically installed with the main module,
Process Changelog. Installing Process Changelog RSS is completely optional: if
installed, it provides you with a publicly viewable RSS feed of the changes to
your site. More details under heading "Changelog RSS feed".

## How to use

When you install this module, it creates a new page into the Admin called
Changelog (Settings > Changelog). This page contains a list of changes to
pages on the site since the moment this module was installed. By clicking
the *more* link next to each row reveals more information about that
particular change.

In order to access the Changelog page, users need to a) be authenticated and
b) have a role with the "changelog" permission *or* have the superuser role.
While the changelog permission will be added automatically when this module
is installed, it needs to be given to any applicable roles manually.

### Changelog RSS feed

This module provides two types of RSS feeds: one that can be accessed only by
authenticated users via the Changelog page (/setup/changelog/rss/), and other
which can be enabled by installing the optional Process Changelog RSS module,
typing in a key to it's config settings, and accessing the feed via URL such
as this: http://example.com/process-changelog-rss.xml?key=1234567890.

Since the latter feed can be accessed via a public URL, please make sure that
your key is as difficult to guess as possible (and never use key 1234567890).
If you are unsure about whether you really need this feature, please leave
the Process Changelog RSS module uninstalled.

### Schema update instructions

This module updates the database schema automatically, but there may be cases
where an update doesn't work as expected, particularly if you've got *a lot*
of data in your database table(s).

If an error occurs, you can run schema update manually. Easiest way to trigger
this would be creating a simple bootstrap script and running it on the server:

```
<?php

// place this script in your site's root directory, at the same level as the
// ProcessWire index.php file, and execute via the php command.

require __DIR__ . '/index.php';
$changelog = $wire->modules->get('ProcessChangelogHooks');
$changelog->updateDatabaseSchema(true);
```

This may take a while to run, but shouldn't result in a timeout, which is the
most likely cause for errors when running schema updates via admin.

If you are unable to run the schema update this way, you may perform expected
changes (see ProcessChangelogHooks::updateDatabaseSchema() for applicable SQL
command(s)) directly in the database and then manually update "schema version"
setting in Process Changelog Hooks module config.

## Settings

This module contains a bunch of settings you should be aware of. Settings can
be defined via ProcessWire's native module configuration screen, and each of
the bundled module's has it's own settings.

### Process Changelog

**Date Format**

* Defines how dates are formatted on Changelog page. See the PHP date function
  reference for information on how to customize this setting:
  http://www.php.net/manual/en/function.date.php
* Default: j.n.Y H:i

**Row Limit**

* Defines number of rows visible at once on Changelog page
* Default: 25

**Row Label**

* Defines which field will be used as row label (page identifier) on
  Changelog page
* Default: Page name

**Visible filters**

* Defines which filters are visible on the Changelog page
* Default: operation, username, when, date_range

**Values for hidden filters**

* Defines values used for filters that are not currently visible
* Default: operation=all, flags=any, when=whenever

### Process Changelog Hooks

**Operations**

* Defines which operations to keep track of / which should be ignored.
* Default: all available operations

**Ignored templates**

* Defines which (if any) templates should be completely ignored from the log.
* Default: none

**Ignored fields**

* Defines which (if any) fields should be completely ignored from the log.
* Default: none

**Ignored roles**

* Define which (if any) roles should be completely ignored from the log.
* Default: none

**Ignored users**

* Define which (if any) users should be completely ignored from the log.
* Default: none

**Caller logging**

* Defines whether path/URL for script that triggered action should be stored.
* Default: disabled

**Data max age**

* Defines how long collected data is kept before being removed automatically.
  Please note that automatic cleanup requires LazyCron module!
* Default: forever (no automatic cleanup)

**Add Changelog to the page editor**

* Defines whether a Changelog section should be added to the Settings tab of the
  page editor. Can be enabled for everyone, users with the Changelog permission,
  or superusers only. Note that this may affect the performance of page editor.
* Default: add for everyone

### Process Changelog RSS

**Key**

* Key required to view the public changelog RSS feed; if omitted, the feed won't
  be available. Please note that the key has to be at least 10 characters long.
* Default: null (feed not available)

## Roadmap

These are new features, fixes and improvements to current feature set planned
for later releases:

**1.x**

* usage statistics, possibly even graphs

## Icons

Icons used by this module are part of Gnome Project and licensed under GNU
GPL v2 (http://www.gnu.org/licenses/gpl-2.0.html). Visit http://gnome.org
or http://art.gnome.org/themes/icon for more information.

## License

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

(See included LICENSE file for full license text.)
