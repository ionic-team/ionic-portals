buildscript {
    val kotlinVersion = "1.5.31"
    extra.apply {
        set("kotlinVersion", kotlinVersion)
    }

    repositories {
        google()
        mavenCentral()
        maven {
            url = uri("https://plugins.gradle.org/m2/")
        }
    }
    dependencies {
        classpath("com.android.tools.build:gradle:7.0.3")
        classpath(kotlin("gradle-plugin", version = kotlinVersion))
        classpath(kotlin("serialization", version = kotlinVersion))
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
    }
}

apply(plugin = "io.github.gradle-nexus.publish-plugin")
apply(from = file("./IonicPortals/scripts/publish-root.gradle"))

allprojects {
    repositories {
        google()
        jcenter()
        mavenCentral()
    }
}

// register Clean task
tasks.register("clean").configure {
    delete("build")
}
