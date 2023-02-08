---
title: Profiling
sidebar_label: Profiling
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Getting Started

Profiling your web applications is just as important as profiling your native applications. In order to profile your web applications running inside of Portals, you need to open Safari.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-open-01.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-open-01.webP')}
    width="75%"
  />
</em>

Next, click on the "Develop" menu item. If you do not have a "Develop" menu item available, follow the [official Apple documentation](https://support.apple.com/guide/safari/use-the-developer-tools-in-the-develop-menu-sfri20948/mac) to get set up.


<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-open-02.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-open-02.webP')}
    width="75%"
  />
</em>

You may see more than one web application displayed in the menu for the application you're debugging. Click the item in the list when the web content is highlighted when you hover over it.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-open-03.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-open-03.webP')}
    width="75%"
  />
</em>

## Elements

If you have never opened Safari developer tools before, it should open on the "Elements" tab. Here you can drill down into the rendered HTML on screen and inspect CSS.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-network-01.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-network-01.webP')}
    width="75%"
  />
</em>

## Network

Another tab of interest is "Network". To see the time it takes to load the files from disk, you can click the "Reload" button, press ⌘R, or ⌥⌘R to reload the page ignoring the cache. 

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-network-02.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-network-02.webP')}
    width="75%"
  />
</em>

Most of the data in the network tab is likely going to be a combination of html, css, and js. The data points for these bits is likely not going to be of much interest since all of these files are loading from disk and should not take long to load. However, if your web team is **_not_** using the CapacitorHttp plugin and any network requests occur in your page interactions, you will see those network requests in this tab as well.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-network-03.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-network-03.webP')}
    width="75%"
  />
</em>

## Timeline

One of the more useful features of Safari Dev Tools is the Timeline. Similar to the [Network](#network) tab, you can click the "Reload" button, press ⌘R, or ⌥⌘R to reload the page ignoring the cache to start recording the Timeline. 

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-timeline-record-01.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-timeline-record-01.webP')}
    width="75%"
  />
</em>

The timeline will continue to record until you click the stop button.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-timeline-record-02.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-timeline-record-02.webP')}
    width="75%"
  />
</em>

Once the timeline is finished recording, you can zoom in and slice the parts of the timeline that are of interest.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-timeline-record-03.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-timeline-record-03.webP')}
    width="75%"
  />
</em>

### Native Http Caveat

Due to a limitation in Safari Dev Tools, if the web application uses CapacitorHttp you will not get any insight into how those requests may be impacting your application performance in the timeline tab. Starting in Capacitor 4.6.3, a total time for the network request will be logged out to the console. This is not an issue for Android developers debugging their web applications in Chrome.

## Timeline Export

It may be neccessary to share recorded timeline data with others, such as the web developers who wrote the code being profiled. To export the timeline data, click the export button at the top right corner of the Timeline tab.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-export-01.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-export-01.webP')}
    width="75%"
  />
</em>

Save the data to disk.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-export-02.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-export-02.webP')}
    width="75%"
  />
</em>

## Timeline Import

To import the timeline data, click the "Import" button to the left of the export button in the top right corner of the timeline tab and select the appropriate file.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-import-01.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-import-01.webP')}
    width="75%"
  />
</em>

Once loaded, the timeline can be inspected as normal.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-import-02.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-import-02.webP')}
    width="75%"
  />
</em>

## Console

The console can provide so additional insight into the behavior of a Portal application. Any communication that occurs across the web/native boundary will be present in the console. The detail will be collapsed initially.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-console-01.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-console-01.webP')}
    width="75%"
  />
</em>

To view the detail, click on the indicator arrows to expand the data.

<em style={{ textAlign: 'center', display: 'block' }}>
  <img 
    src={useBaseUrl('/img/profiling/ios/thumb/profiling-console-02.webP')} 
    data-zoom-src={useBaseUrl('/img/profiling/ios/full/profiling-console-02.webP')}
    width="75%"
  />
</em>


