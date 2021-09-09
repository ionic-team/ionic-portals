buildscript {
    val kotlin_version by extra("1.5.21")
    repositories {
        google()
        mavenCentral()
        maven {
            url = uri("https://plugins.gradle.org/m2/")
        }
    }
    dependencies {
        classpath("com.android.tools.build:gradle:4.2.2")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version")
        classpath("io.github.gradle-nexus:publish-plugin:1.1.0")
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
