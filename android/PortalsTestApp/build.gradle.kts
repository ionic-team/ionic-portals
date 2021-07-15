buildscript {
    val kotlinVersion = "1.5.21"
    extra.apply {
        set("kotlinVersion", kotlinVersion)
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:4.2.2")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
        maven {
            url = uri("https://jcenter.bintray.com")
        }

        // Required for resolving Ionic Portals dependencies
        maven {
            name = "portals"
            url = uri("https://maven.pkg.github.com/native-portal/portals")
            credentials {
                username = System.getenv("GITHUB_USER") ?: project.properties["GITHUB_USER"] as String?
                password = System.getenv("GITHUB_PERSONAL_ACCESS_TOKEN") ?: project.properties["GITHUB_PERSONAL_ACCESS_TOKEN"] as String?
            }
        }
    }
}

task<Delete>("clean") {
    delete(rootProject.buildDir)
}
