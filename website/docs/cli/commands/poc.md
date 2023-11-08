---
title: CLI Command - poc
sidebar_label: poc
---

One common scenario during the Portals development lifecycle is that a Portal has been defined in the Native
application but there is not yet a web application available to test against it. This command
is meant resolve this scenario and allow native developers to have confidence in how the Portal
was configured.

The `poc` command will download a prebuilt example application to a predefined directory. The portal
can then be configured to point to this application for testing purposes. The web application reflects
the `initialContext` and plugins that have been exposed. You can also even use the web application to
test some pub/sub interactions.

### Usage:

```bash
portals poc [flags]
```

### Aliases:

```bash
poc, sample-app
```

### Examples:

```bash
portals poc [--destination path/to/copy/web/apps]
```

### Flags:

- `--destination` **(string)** The location to download the web application to.
- `-h, --help` help for sync

### Global Flags:

- `--config` **(string)** config file (default is $PWD/.portals.yaml)
