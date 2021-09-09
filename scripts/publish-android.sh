#!/usr/bin/env bash

DIR=..
ANDROID_DIR=$DIR/android
LOG_OUTPUT=./tmp/portals-android.txt
PORTALS_VERSION=`grep '"version": ' $DIR/plugin/package.json | awk '{print $2}' | tr -d '",'`
echo Attempting to build and publish Portals native library with version $PORTALS_VERSION

# Get the latest version of Capacitor
CAPACITOR_PACKAGE_JSON="https://raw.githubusercontent.com/ionic-team/capacitor/main/android/package.json"
CAPACITOR_VERSION=$(curl -s $CAPACITOR_PACKAGE_JSON | awk -F\" '/"version":/ {print $4}')

# Don't continue if there was a problem getting the latest version of Capacitor
if [[ $CAPACITOR_VERSION ]]; then
    printf %"s\n\n" "Attempting to publish new Portals with dependency on Capacitor Version $CAPACITOR_VERSION"
else
    printf %"s\n\n" "Error resolving latest Capacitor version from $CAPACITOR_PACKAGE_JSON"
    exit 1
fi

# Get latest com.capacitorjs:core XML version info
CAPACITOR_PUBLISHED_URL="https://repo1.maven.org/maven2/com/capacitorjs/core/maven-metadata.xml"
CAPACITOR_PUBLISHED_DATA=$(curl -s $CAPACITOR_PUBLISHED_URL)
CAPACITOR_PUBLISHED_VERSION="$(perl -ne 'print and last if s/.*<latest>(.*)<\/latest>.*/\1/;' <<< $CAPACITOR_PUBLISHED_DATA)"

# Check if we need to publish a new native version of the Capacitor Android library
if [[ "$CAPACITOR_VERSION" != "$CAPACITOR_PUBLISHED_VERSION" ]]; then
    printf %"s\n" "Publish Capacitor Core first! The latest published Android library version $CAPACITOR_PUBLISHED_VERSION in MavenCentral is outdated. There is an unpublished version $CAPACITOR_VERSION in ionic-team/capacitor."
    exit 1
else
    # Capacitor version in MavenCentral is up to date, continue publishing the native Portals library
    printf %"s\n\n" "Latest native Capacitor Android library is version $CAPACITOR_PUBLISHED_VERSION and is up to date, continuing with Portals publishing..."

    # Get latest io.ionic:portals XML version info
    PORTALS_PUBLISHED_URL="https://repo1.maven.org/maven2/io/ionic/portals/maven-metadata.xml"
    PORTALS_PUBLISHED_DATA=$(curl -s $PORTALS_PUBLISHED_URL)
    PORTALS_PUBLISHED_VERSION="$(perl -ne 'print and last if s/.*<latest>(.*)<\/latest>.*/\1/;' <<< $PORTALS_PUBLISHED_DATA)"

    if [[ "$PORTALS_VERSION" == "$PORTALS_PUBLISHED_VERSION" ]]; then
        printf %"s\n\n" "Duplicate: a published Portals exists for version $PORTALS_VERSION, skipping..."
    else
        # Make log dir if doesnt exist
        mkdir -p ./tmp

        # Export ENV variable used by Gradle for Versioning
        export PORTALS_VERSION

        printf %"s\n" "Attempting to build and publish Portals version $PORTALS_VERSION"
        $ANDROID_DIR/gradlew -p $ANDROID_DIR clean build publishReleasePublicationToSonatypeRepository --max-workers 1 -Pandroid.useAndroidX=true -Pandroid.enableJetifier=true > $LOG_OUTPUT 2>&1

        echo $RESULT

        if grep --quiet "BUILD SUCCESSFUL" $LOG_OUTPUT; then
            printf %"s\n" "Success: Ionic Portals published to MavenCentral Staging. Manually review and release from the Sonatype Repository Manager https://s01.oss.sonatype.org/"
        else
            printf %"s\n" "Error publishing, check $LOG_OUTPUT for more info!"
            cat $LOG_OUTPUT
            exit 1
        fi

    fi
fi
