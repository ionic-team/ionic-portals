import useBaseUrl from '@docusaurus/useBaseUrl';

# Embedding a Root Navigation Controller in Swift Using Storyboard

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

1. Select the Bridge View Controller and locate the Editor section in the menu bar.

2. Select Editor -> Embed In -> Navigation Controller. This will embed the Bridge View Controller within a navigation controller, as well as set the navigation controller as the initial view controller.

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




## Step 3: Customize the Navigation Controller

1. To remove the navigation bar, set "Top Bar" to "None" in the Simulated Metrics section of the navigation controller.
