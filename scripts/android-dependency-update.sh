#!/usr/bin/env bash

DIR=../android/IonicPortals
GRADLE_FILE=$DIR/build.gradle.kts

# Get the latest version of Capacitor
CAPACITOR_PACKAGE_JSON="https://raw.githubusercontent.com/ionic-team/capacitor/main/android/package.json"
CAPACITOR_LATEST_VERSION=$(curl -s $CAPACITOR_PACKAGE_JSON | awk -F\" '/"version":/ {print $4}')

# Get latest com.capacitorjs:core XML version info
CAPACITOR_PUBLISHED_URL="https://repo1.maven.org/maven2/com/capacitorjs/core/maven-metadata.xml"
CAPACITOR_PUBLISHED_DATA=$(curl -s $CAPACITOR_PUBLISHED_URL)
CAPACITOR_PUBLISHED_VERSION="$(perl -ne 'print and last if s/.*<latest>(.*)<\/latest>.*/\1/;' <<< $CAPACITOR_PUBLISHED_DATA)"

# Don't continue if there was a problem getting the latest published version of Capacitor
if [[ -z "$CAPACITOR_PUBLISHED_VERSION" ]]; then
    printf %"s\n\n" "Error resolving latest Capacitor version from $CAPACITOR_PUBLISHED_URL"
    exit 1
fi

# Display warning that the latest Capacitor version in the repo is not the latest one published
if [[ "$CAPACITOR_LATEST_VERSION" != "$CAPACITOR_PUBLISHED_VERSION" ]]; then
    printf %"s\n" "WARNING: There is an unpublished version $CAPACITOR_LATEST_VERSION in ionic-team/capacitor. Fully publish that version to MavenCentral if you intend to publish Portals against that Version. Manually update the build.gradle.kts to override."
fi

printf %"s" "Updating Android Capacitor dependency version to $CAPACITOR_PUBLISHED_VERSION... "

# Replace Capacitor library version in Android build.gradle.kts with the latest published version
perl -i -pe"s/com.capacitorjs:core:.*\"/com.capacitorjs:core:$CAPACITOR_PUBLISHED_VERSION\"/g" $GRADLE_FILE

printf %"s\n" "Done!"
