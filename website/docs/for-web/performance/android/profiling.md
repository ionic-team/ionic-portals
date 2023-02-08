---
title: Profiling
sidebar_label: Profiling
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Getting Started

Profiling your web applications is just as important as profiling your native applications. In order to profile your web applications running inside of Portals, you need to open Google Chrome.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/android/thumb/profiling-open-01.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/android/full/profiling-open-01.webP')}
    width="75%"
  />
</em>

Next, navigate to "chrome://inspect" to view a list of target devices to inspect. If your connected device or emulator is running an application containing a Portal, it will display here when loaded.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/android/thumb/profiling-open-02.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/android/full/profiling-open-02.webP')}
    width="75%"
  />
</em>

You may see more than one web application displayed in the menu for the application you're debugging. Click the "inspect" link for the item in the list that corresponds to the Portal you wish to debug.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/android/thumb/profiling-inspect-devices.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/android/full/profiling-inspect-devices.webP')}
    width="75%"
  />
</em>

## Elements

Select the "Elements" tab to view the contents of the page in more detail. Here you can drill down into the rendered HTML on screen and inspect CSS.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/android/thumb/profiling-elements.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/android/full/profiling-elements.webP')}
    width="75%"
  />
</em>

## Network

Another tab of interest is "Network". To see the time it takes to load the files from disk, you can click the red circle button for "Record", then press CTRL+R to reload the page ignoring the cache. 

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/android/thumb/profiling-network-01.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/android/full/profiling-network-01.webP')}
    width="75%"
  />
</em>

Most of the data in the network tab is likely going to be a combination of html, css, and js. The data points for these bits is likely not going to be of much interest since all of these files are loading from disk and should not take long to load.

## Lighthouse

One of the more useful features of the Chome DevTools is [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/). Similar to the [Network](#network) tab, you can click the "Generate report" button to reload the page ignoring the cache to start a Lighthouse report. 

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/android/thumb/profiling-lighthouse-00.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/android/full/profiling-lighthouse-00.webP')}
    width="75%"
  />
</em>

Once the report is finished, you can review the findings for help troubleshooting performance issues in your web app.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/android/thumb/profiling-lighthouse-01.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/android/full/profiling-lighthouse-01.webP')}
    width="75%"
  />
</em>

If load time is a trouble for your app, you can dig into the results to find which content may be causing slowness.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/android/thumb/profiling-lighthouse-02.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/android/full/profiling-lighthouse-02.webP')}
    width="75%"
  />
</em>

## Lighthouse Export

It may be neccessary to share a Lighthouse report with others, such as the web developers who wrote the code being profiled. To export the Lighthouse report data, click the dot menu button in the top right of the report to view export options.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/android/thumb/profiling-lighthouse-03.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/android/full/profiling-lighthouse-03.webP')}
    width="75%"
  />
</em>

Selecting the option to "Print Expanded" will create a printable expanded report that can be saved and shared as a PDF. Saving as HTML will allow the report to be shared and viewed in any web browser.

## Console

The console can provide so additional insight into the behavior of a Portal application. Any communication that occurs across the web/native boundary will be present in the console. The detail will be collapsed initially.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/android/thumb/profiling-console-01.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/android/full/profiling-console-01.webP')}
    width="75%"
  />
</em>

To view the detail, click on the indicator arrows to expand the data.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/android/thumb/profiling-console-02.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/android/full/profiling-console-02.webP')}
    width="75%"
  />
</em>

