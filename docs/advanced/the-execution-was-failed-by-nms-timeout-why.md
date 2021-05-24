---
layout: default
title: The execution was failed by Nms timeout at `open.0.js`, why?
parent: Advanced
nav_order: 5
---

# :question: The execution was failed by Nms timeout at `open.0.js`, why?

As you can see the code `open.0.js`,  
we specify `{ waitUntil: 'networkidle0' }` option to get the web page initially.

This option indicates waits until no connection remained,  
althogh some frameworks may keep pinping to get status of your page.

For instance,  
Nuxt.js has such connections `/__webpack_hmr/client` and `_loading/sse` to maintain HMR (hot module replacement),  
since we thought people need to stabilize e2e the tests must get fixed HTML elements after all connectios done,  
we intercept the requests-responses sending to such shady URLs and abort.  
please look at the `prepare.js` code.

Therefore, a suggestion you'd better to check is that which connection lasts for a long time.  
Below code might be help for your investigation,  
please replace code in `open.0.js`.

When you find the suspicios URL,  
please report issue.

```javascript
class InflightRequests {
  constructor(page) {
    this._page = page
    this._requests = new Set()
    this._onStarted = this._onStarted.bind(this)
    this._onFinished = this._onFinished.bind(this)
    this._page.on('request', this._onStarted)
    this._page.on('requestfinished', this._onFinished)
    this._page.on('requestfailed', this._onFinished)
  }

  _onStarted(request) {
    this._requests.add(request)
  }
  _onFinished(request) {
    this._requests.delete(request)
  }

  inflightRequests() {
    return Array.from(this._requests)
  }

  dispose() {
    this._page.removeListener('request', this._onStarted)
    this._page.removeListener('requestfinished', this._onFinished)
    this._page.removeListener('requestfailed', this._onFinished)
  }
}

module.exports = async ({ browser, page }) => {
  const tracker = new InflightRequests(page)
  await page
    .goto('http://localhost:3000/', {
      waitUntil: 'networkidle0',
      timeout: 10000,
    })
    .catch((e) => {
      console.log('Navigation failed: ' + e.message)
      const inflight = tracker.inflightRequests()
      console.log(inflight.map((request) => '  ' + request.url()).join('\n'))
    })
  tracker.dispose()
  await page.waitTillHTMLRendered()
}

```


ref: see puppeteer's [issue](https://github.com/puppeteer/puppeteer/issues/1908)

