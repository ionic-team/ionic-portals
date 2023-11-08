---
title: CLI Command - sync
sidebar_label: sync
---

During the build process of Native Applications it is good practice to pull the latest Live Updates available
from each of the web applications that are used in the Portals. This ensures that the native release is shipping
with the latest web applications instead of relying on a live update to immediately update.

The `sync` CLI command will query the Live Update service, download, and extract the latest builds for a set of configured Appflow Applications.

When running inside of an Xcode Run Script build step the destination will default to
the root of the built target: `$BUILT_PRODUCTS_DIR/$TARGET_NAME.app`

When running under any other context the destination will default to the current working
directory.

### Usage:

```bash
portals sync [flags]
```

### Examples:

```bash
portals sync [--destination path/to/copy/web/apps]
```

### Flags:

- `--destination` **(string)** The location to download the web applications to.
- `-h, --help` help for sync

### Global Flags:

- `--config` **(string)** config file (default is $PWD/.portals.yaml)
