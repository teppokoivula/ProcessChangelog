Process Changelog Module
========================

This module keeps track of changes (edits, additions, removals etc.) on your
site. It is not intended as a version control solution; rather than that, it's
primary goal is to provide admin users with quick overview of changes.

## Installing

Copy ProcessChangelog folder to your /site/modules/, go to Admin > Modules,
hit "Check for new modules" and install Process Changelog. Process Changelog
Hooks module will be installed automatically with Process Changelog.

Note: this module requires ProcessWire 2.2 or newer. Automatic cleanup feature
requires LazyCron module, which is included in ProcessWire core distribution.
Automatic cleanup isn't required for this module to work but it's highly
recommended to avoid cluttering custom database table used by Process
Changelog with unnecessary / unwanted old rows.

## How to use

During install a new Changelog page is created, placed by default under
Admin > Settings. From there you'll find information about each change on
public pages since this module was installed. Clicking *more* link at the
end of each row reveals more information about that particular change.

## Settings

This module provides couple of settings you should be aware of. Since this
module actually consists of two modules, one of which handles view side and
other data collection, both have their own settings:

### Process Changelog

**Date Format**

* Defines how dates are formatted on Changelog page
* See the PHP date function reference for information on how to customize
  this setting: http://www.php.net/manual/en/function.date.php
* Default: j.n.Y H:i

**Row Limit**

* Defines number of rows visible at once on Changelog page
* Default: 25

**Row Label**

* Defines which field will be used as row label (page identifier) on
  Changelog page
* Default: Page name

### Process Changelog Hooks

**Operations**

* Defines which operations to keep track of / which should be ignored.
* Default: all available operations

**Caller Logging**

* Defines whether path/URL for script that triggered action should be stored.
* Default: disabled

**Data Max Age**

* Defines how long collected data is kept before being removed automatically.
* Please note that automatic cleanup requires LazyCron module!
* Default: forever (no automatic cleanup)

## Roadmap

These are new features, fixes and improvements to current feature set planned
for later releases:

**1.1**

* filter additions
  * flags
  * template
* visibility settings for filters

**1.2**

* alternative views
  * JSON output

**1.3**

* usage statistics, possibly even graphs

## Icons

Icons used by this module are part of Gnome Project and licensed under GNU
GPL v2 (http://www.gnu.org/licenses/gpl-2.0.html). Visit http://gnome.org
or http://art.gnome.org/themes/icon for more information.