---
title: CLI Overview
sidebar_label: Overview
---

# Portals CLI

The Portals CLI is a command-line tool designed to simplify and streamline the management and deployment of your Portals projects. It empowers developers to interact with Portals programmatically, automating common tasks and enhancing productivity. The CLI provides functionality for both Native Developers and Web Developers.

The CLI is a companion tool but is not required to use Portals.

## Installation

Installing the Ionic Portals CLI is a straightforward process, with options available for macOS, Linux, Windows, and various distribution methods to suit your preferences. Here's how to get started on your platform of choice:

### Homebrew

If you're using macOS or Linux, you can streamline the installation process with Homebrew. First, tap into the Portals releases repository and then install Portals with these commands:

```bash
# tap the Portals releases repository
brew tap ionic-team/portals https://github.com/ionic-team/portals-cli-releases.git

# install
brew install portals
```

### Shell script

Another option for macOS and Linux users is the shell script-based installation. Execute this single command to install Portals:

```bash
curl -sL https://raw.githubusercontent.com/ionic-team/portals-cli-releases/main/install.sh | bash
```

### Windows Binaries

For Windows users, manual installation is currently required. You can download the appropriate zip file for your architecture (arm64, i386, or x86_64) from the list provided and extract it to a directory on your system's `PATH` for convenient access.

- [arm64](https://github.com/ionic-team/portals-cli-releases/releases/latest/download/portals_Windows_arm64.zip)
- [i386](https://github.com/ionic-team/portals-cli-releases/releases/latest/download/portals_Windows_i386.zip)
- [x86_64](https://github.com/ionic-team/portals-cli-releases/releases/latest/download/portals_Windows_x86_64.zip)

### Linux Binaries

Debs and RPMs are made available for each [release](https://github.com/ionic-team/portals-cli-releases/releases).
Download the appropriate package for your system and install with your package manager.

## Command List​

View all available CLI commands and options.

- [poc](./commands/poc.md)
- [sync](./commands/sync.md)
