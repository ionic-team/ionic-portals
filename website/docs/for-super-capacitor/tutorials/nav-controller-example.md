import useBaseUrl from '@docusaurus/useBaseUrl';

# Connecting a Root Navigation Controller in Swift Using Storyboard

By default, Capacitor apps are embedded in a `CAPBridgeViewController`. To utilize the "push" type for presenting portals, it is necessary to embed the app within a navigation controller.

## Step 1: Open the Main Storyboard

1. In the project navigator, locate and open the `Main.storyboard` file.

<em
  style={{
    textAlign: 'center',
    display: 'block',
  }}
>
  <img
    src={useBaseUrl('/img/super-capacitor/embed-nav-controller-tutorial/step-1.webp')}
    data-zoom-src={useBaseUrl('/img/super-capacitor/embed-nav-controller-tutorial/step-1.webp')}
    width="75%"
  />
</em>

## Step 2: Add a Navigation Controller

1. Drag and drop a "Navigation Controller" from the Object Library onto the storyboard canvas.

<em
  style={{
    textAlign: 'center',
    display: 'block',
  }}
>
  <img
    src={useBaseUrl('/img/super-capacitor/embed-nav-controller-tutorial/step-2.webp')}
    data-zoom-src={useBaseUrl('/img/super-capacitor/embed-nav-controller-tutorial/step-2.webp')}
    width="75%"
  />
</em>

2. The navigation controller will come with an attached view controller. Remove the attached view controller and add a root view controller seugue from the navigation controller to the bridge view controller.

<em
  style={{
    textAlign: 'center',
    display: 'block',
  }}
>
  <img
    src={useBaseUrl('/img/super-capacitor/embed-nav-controller-tutorial/step-2-1.webp')}
    data-zoom-src={useBaseUrl('/img/super-capacitor/embed-nav-controller-tutorial/step-2-1.webp')}
    width="75%"
  />
</em>

## Step 3: Set the Initial View Controller

1. Set the navigation controller as the initial view controller.

<em
  style={{
    textAlign: 'center',
    display: 'block',
  }}
>
  <img
    src={useBaseUrl('/img/super-capacitor/embed-nav-controller-tutorial/step-3.webp')}
    data-zoom-src={useBaseUrl('/img/super-capacitor/embed-nav-controller-tutorial/step-3.webp')}
    width="75%"
  />
</em>

## Step 4: Customize the Navigation Controller

1. To remove the navigation bar, set "Top Bar" to "None" in the Simulated Metrics section of the navigation controller.
