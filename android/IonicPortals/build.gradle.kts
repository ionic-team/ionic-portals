plugins {
    id("maven-publish")
    id("com.android.library")
    id("org.jetbrains.kotlin.plugin.serialization") version "1.5.21"
    id("kotlin-android")
}

android {
    compileSdkVersion(30)

    defaultConfig {
        minSdkVersion(21)
        targetSdkVersion(30)
        versionCode = 1
        versionName = "1.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    sourceSets {
        getByName("main").java.srcDirs("src/main/kotlin")
        getByName("test").java.srcDirs("src/test/kotlin")
        getByName("androidTest").java.srcDirs("src/androidTest/kotlin")
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {
    implementation(kotlin("reflect"))
    implementation("com.capacitorjs:core:3.2.2")
    implementation("org.jetbrains.kotlin:kotlin-stdlib:1.5.21")
    implementation( "androidx.core:core-ktx:1.6.0")
    implementation("androidx.appcompat:appcompat:1.3.1")
    implementation("com.google.android.material:material:1.4.0")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.3")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.4.0")
}

val libraryGroupId = "io.ionic"
val libraryArtifactId = "portalslibrary"
val libraryVersion = "0.0.5"

task<Jar>("sourceJar") {
    from(android.sourceSets["main"].java.srcDirs)
    archiveClassifier.set("sources")
}

publishing {
    repositories {
        maven {
            name = "GithubPackages"
            url = uri("https://maven.pkg.github.com/ionic-team/ionic-portals")
            credentials {
                username = System.getenv("GITHUB_USER") ?: project.properties["GITHUB_USER"] as String?
                password = System.getenv("GITHUB_PERSONAL_ACCESS_TOKEN") ?: project.properties["GITHUB_PERSONAL_ACCESS_TOKEN"] as String?
            }
        }
        maven {
            name = "GithubPackages-PortalsSDK"
            url = uri("https://maven.pkg.github.com/native-portal/portals-sdk")
            credentials {
                username = System.getenv("GITHUB_USER") ?: project.properties["GITHUB_USER"] as String?
                password = System.getenv("GITHUB_PERSONAL_ACCESS_TOKEN") ?: project.properties["GITHUB_PERSONAL_ACCESS_TOKEN"] as String?
            }
        }
        maven {
            name = "MavenRepo"
            url = uri("file://${buildDir}/repo")
        }
    }
    publications {
        create<MavenPublication>("portalslibrary") {
            groupId = libraryGroupId
            artifactId = libraryArtifactId
            version = libraryVersion
            artifact("$buildDir/outputs/aar/IonicPortals-release.aar") {
                builtBy(tasks.assemble)
            }

            artifact(tasks.getByName("sourceJar")) {
                builtBy(tasks.assemble)
            }

            pom.withXml {
                val dependenciesNode = asNode().appendNode("dependencies")
                val addDependency = { dep: Dependency, scope: String ->
                    if (dep.group !== null && dep.version !== null && dep.name !== "unspecified") {
                        val dependencyNode = dependenciesNode.appendNode("dependency")
                        dependencyNode.appendNode("groupId", dep.group)
                        dependencyNode.appendNode("artifactId", dep.name)
                        dependencyNode.appendNode("version", dep.version)
                        dependencyNode.appendNode("scope", scope)
                    }
                }

                configurations.compile.get().dependencies.forEach { dep -> addDependency(dep, "compile") }
                configurations.api.get().dependencies.forEach { dep -> addDependency(dep, "compile") }
                configurations.implementation.get().dependencies.forEach { dep -> addDependency(dep, "runtime") }
            }
        }
    }
}