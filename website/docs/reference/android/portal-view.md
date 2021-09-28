---
title: PortalView
sidebar_label: Portal View
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [PortalView](./portal-view) class is an Android [FrameLayout](https://developer.android.com/reference/android/widget/FrameLayout) that you can use to easily build a  `View` via XML for a [Portal](./portal). While you can show a [Portal](./portal) to a user using the [PortalView](./portal-view) class directly, it is recommended to use this via XML. If you need to programmtically create a view, you should use [PortalFragment](./portal-fragment) if you can.

You can use [PortalView](./portal-view) like any other [View](https://developer.android.com/reference/android/view/View) class. Below is an example of using XML to load the [Portal](./portal) with the ID of _"help"_.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <io.ionic.portals.PortalView
        app:portalId="help"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

Because [PortalView](./portal-view) is an extended [FrameLayout](https://developer.android.com/reference/android/widget/FrameLayout) class, there are additional functions you not listed below. Refer to the [Android documentation on FrameLayout for more information](https://developer.android.com/reference/android/widget/FrameLayout)

## Constructors

### constructor

#### Usage 
 
<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val context: Context = someValue
val view: PortalView = PortalView(context)
``` 

</TabItem>
<TabItem value="java">

```java
Context context = someValue;
PortalView view = new PortalView(context);
``` 

</TabItem>
</Tabs>

Additionally, you can pass in an [AttributeSet](https://developer.android.com/reference/android/util/AttributeSet) and `Int` as you can in a [FrameLayout](https://developer.android.com/reference/android/widget/FrameLayout)

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val context: Context = someValue
val attrs: AttributeSet = someAttributeSet
val defStyleAttr: Int = someDefStyleAttr
val fragment: PortalView = PortalView(context, attrs, defStyleAttr)
``` 

</TabItem>
<TabItem value="java">

```java
Context context = someValue;
AttributeSet attrs = someAttributeSet;
int defStyleAttr = someDefStyleAttr
PortalView view = new PortalView(context, attrs, defStyleAttr)
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`context` | `Context` | The `Context` for this view. Cannot be `null`.
`attrs` (optional) | `AttributeSet` | The `AttributeSet` for this view. Optional parameter. Can be `null`.
`defStyleAttr` (optional) | `Int` | The default style attribute. Optional parameter. Can be `null`.

## Methods

### getPortalFragment

Gets the attached [PortalFragment](./portal-fragment) instance.

#### Usage 

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val view: PortalView = PortalView(context)
val fragment: PortalFragment? = view.getPortalFragment()
``` 

</TabItem>
<TabItem value="java">

```java
PortalView view = new PortalView(context);
PortalFragment fragment = view.getPortalFragment();
``` 

</TabItem>
</Tabs>

**Returns:** <span class="return-code">[*PortalFragment*](./portal-fragment)</span>

### setDrawDisappearingViewsLast

Used to indicate the container should change the default drawing order.

#### Usage 

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val view: PortalView = PortalView(context)
view.setDrawDisappearingViewsLast(true)
``` 

</TabItem>
<TabItem value="java">

```java
PortalView view = new PortalView(context);
view.setDrawDisappearingViewsLast(true);
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`drawDisappearingViewsFirst` | `Boolean` | Used to indicate the container should change the default drawing order.
