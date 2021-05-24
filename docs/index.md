# Turorial for visual e2e screen shot testing.

## Prerequisites

- chrome
- git
- Node
- yarn

If you don't have yarn in your laptop, please run following comand:  
`npm install --global yarn`

## Clone front-end into your workspace

Before stating this tutorial,  
you have to provide the real-world example application at first for testing.

Open your terminal window, clone a public example.  
```sh
git clone git@github.com:devJang/nuxt-realworld.git
cd nuxt-realworld
yarn install  # <- here would take a few minutes
yarn dev
```

Then you would notice some messages in your console.  
```sh

✔ Client
  Compiled successfully in 10.32s

✔ Server
  Compiled successfully in 10.35s

ℹ Waiting for file changes00:04:14
ℹ Memory usage: 235 MB (RSS: 377 MB)
ℹ Listening on: http://localhost:3000/
No issues found.

```

open your application located in your local by Chrome.  
`open http://localhost:3000`

Anyhow now you have your own application.  
Let's move on to the next to do testing.

## Record your manipulations

Install [Katalon Recorder](https://chrome.google.com/webstore/detail/katalon-recorder-selenium/ljdobmomdgdljniojadhoplhkpialdid) extension in your Chrome.

Then open `chrome://extensions/` in your Chrome.  
You would find the extension installed (toggle to turn on the extension if it's disabled).
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/02feaf5b3c0a7cef65ce8d0b3f09ca8e.png)](https://diverta.gyazo.com/02feaf5b3c0a7cef65ce8d0b3f09ca8e)

Check the upper right side in your Chrome,  
you can find an extension logo icon.  
Click the icon.  
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/636623b4a38f9a1b54c73799e28a3175.png)](https://diverta.gyazo.com/636623b4a38f9a1b54c73799e28a3175)

Launches Kataron Recorder screen (please skip all users guide if it's showed).  
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/6ff598fb8a9bcd6927e0a594576e4be4.png)](https://diverta.gyazo.com/6ff598fb8a9bcd6927e0a594576e4be4)

Click the `New` button, and type `"Example Test"` in the opened dialog, click `OK`.  
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/d91b821d1d81e85abdb0c924fcb93817.png)](https://diverta.gyazo.com/d91b821d1d81e85abdb0c924fcb93817)

A new test suite (and test case) object appears in the left pane.  
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/ae994d8f8d4cf141d3e65a67c1dfba58.png)](https://diverta.gyazo.com/ae994d8f8d4cf141d3e65a67c1dfba58)

Click the `Record` button.  
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/1a4bf37052d0742b875c46f0ab982c54.png)](https://diverta.gyazo.com/1a4bf37052d0742b875c46f0ab982c54)

Now transfers screen to Chrome,  
so do anything freely what you want to test.  
Then each manipulations well be recorderd in Kataron Recorder automatically.
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/a2fbb40234ebca48fc674c903ced1ab7.gif)](https://diverta.gyazo.com/a2fbb40234ebca48fc674c903ced1ab7)

Okay now you are fullfilled with manipulations,  
click the `Stop` button.  
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/38e84b1d0d1f80642dd76c9a526b3366.png)](https://diverta.gyazo.com/38e84b1d0d1f80642dd76c9a526b3366)

All your manipulations are displayed in the main section,  
they will be a resource for the actual testing.  
So Let's output to a static file to let it executable by external programs.

Click the `Export` button.  
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/021042162e3cc68303129809e97646ba.png)](https://diverta.gyazo.com/021042162e3cc68303129809e97646ba)

Opens a dialog,  
select `"JSON (...any...)"` element in the selectbox.  
Then export as a JSON named `"ExampleTest.json"` to your `~/Download` directory.  
> :warning: depends o your OS,  
> system would show an warning message due to change the file extension from `.html` to `.json`.  
> attach `.json` anyway.

[![Image from Gyazo](https://t.gyazo.com/teams/diverta/dfe3c35c8d383c11ac5ab2d70ca65448.gif)](https://diverta.gyazo.com/dfe3c35c8d383c11ac5ab2d70ca65448)

OK, you've finished to make a resource for testing,  
Let's proceed to the next to generate an executable testing scripts.

## Generate JS testing files.

> :warning: If your OS is not macos, don't do this section (please take a look here to know how it works as a reference).  
> Please checkout [tips](question-i-dont-use-macos) instead.

Open another terminal window, change directory there.  
Continue in an another terminal apart from the old one.  
(I believe `yarn dev` process keeps running there).
```sh
cd nuxt-realworld
pwd
# results example ↓↓↓here↓↓↓
# /Users/YOUR_NAME/DIREC/TOR/IES/nuxt-realworld
```

First, prepare the test directory and move the resource file there.  
```sh
mkdir -p test/e2e
mv ~/Downloads/ExampleTest.json test/e2e
```

Next, install a tool by the following command.  
```sh
npm install puppeteer # install puppeteer module as a dependency of repository
npm install katalon2puppeteer@latest -g # install katalon2puppeteer module globally
```

Next, Run below.  
`k2p test/e2e/ExampleTest.json`

Now you can find an executable JS code generated by the tool.  
```sh
tree test/e2e/ExampleTest
# results example ↓↓↓here↓↓↓
# /Users/yabe/Downloads/ExampleTest
# ├── Executor.js
# ├── ext.js
# ├── index.js
# ├── prepare.js
# └── task
#     ├── click.1.js
#     ├── click.2.js
#     ├── click.3.js
#     ├── index.js
#     ├── open.0.js
#     └── ... and other JS files could be here depending on your JSON.
# 
# 1 directory, 99999 files
```

Finally, kick it.  
`node test/e2e/ExampleTest/index.js`

Magic happens.  
Your Chrome automatically opens and does manipulations you've resorded each by each.  
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/29b33272c5731d74732dc7d4be89d288.gif)](https://diverta.gyazo.com/29b33272c5731d74732dc7d4be89d288)

After a wile,  
your test will be done and output message (unless the test does not fail).  
```sh
~/w/nuxt-realworld ❯❯❯ node test/e2e/ExampleTest/index.js
'promise no.0 open.0 was executed.'
'promise no.1 click.1 was executed.'
'promise no.2 click.2 was executed.'
'promise no.3 click.3 was executed.'
'all promises are executed.'    # <- your test finishes here.
```

So what?
You can check each actions in your resource JSON dumps screen captures into `test/e2e/capture`.  
Please type below to confirm it.  
```sh
ls -la test/e2e/capture
#
# you would find the result as ↓below↓
#
# total 1352
# drwxr-xr-x  6 yabe  staff     192 May 24 13:46 .
# drwxr-xr-x  5 yabe  staff     160 May 24 13:53 ..
# -rw-r--r--  1 yabe  staff  308579 May 24 13:55 capture.ExampleTest.0.open.0.png
# -rw-r--r--  1 yabe  staff   32695 May 24 13:55 capture.ExampleTest.1.click.1.png
# -rw-r--r--  1 yabe  staff   35866 May 24 13:55 capture.ExampleTest.2.click.2.png
# -rw-r--r--  1 yabe  staff  308712 May 24 13:55 capture.ExampleTest.3.click.3.png

open test/e2e/capture/capture.ExampleTest.0.open.0.png
```
Do you realize that the test took screen captures and stored in your PJ?

Well done!  
Now your test is made, Let's continue to the next.

### Bonus

Let me explain a little bit if you want to know details.

For instance for my test case,  
i made a simple test including only 4 actions (manipulations).  
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/cca7381189d72719cd79b39037f01df7.png)](https://diverta.gyazo.com/cca7381189d72719cd79b39037f01df7)

I exported that as a resource JSON file as the same way as you did,  
the JSON has 4 elements in it's data.  
```sh
~/w/nuxt-realworld ❯❯❯ cat test/e2e/ExampleTest.json
[
    {
        "command": "open",
        "target": "http://localhost:3000/",
        "value": ""
    },
    {
        "command": "click",
        "target": "link=Sign in",
        "value": ""
    },
    {
        "command": "click",
        "target": "link=Sigin up",
        "value": ""
    },
    {
        "command": "click",
        "target": "link=Home",
        "value": ""
    }
]
```

Then did `k2p test/e2e/ExampleTest.json`,  
the process made 4 task files + 1 index file in my PJ.  
```sh
~/w/nuxt-realworld ❯❯❯ ls -l test/e2e/ExampleTest/task
total 40
-rw-r--r--  1 yabe  staff  442 May 24 13:53 click.1.js
-rw-r--r--  1 yabe  staff  444 May 24 13:53 click.2.js
-rw-r--r--  1 yabe  staff  436 May 24 13:53 click.3.js
-rw-r--r--  1 yabe  staff  340 May 24 13:53 index.js
-rw-r--r--  1 yabe  staff  165 May 24 13:53 open.0.js
```

Which means, `k2p` extracts each actions in your JSON to a single task file one by one.  
Each task files are summalized in `index.js` file as a list,  
the main process in the test will execute the list in order.  
```sh
~/w/nuxt-realworld ❯❯❯ cat test/e2e/ExampleTest/task/index.js                                                                                                             ✘ 130 
const fs = require('fs')
const path = require('path')

const waitMilliSecond = 0

const tasks = ['open.0', 'click.1', 'click.2', 'click.3'].map(  # <- here, a task files array.
    (promiseFactoryName) => ({
        promiseFactoryName,
        promiseFactory: require(path.resolve(__dirname, promiseFactoryName)),
        waitMilliSecond,
    })
)

module.exports = tasks
```

Plus, when the task is done successfully,  
outputs a message like `'promise no.0 open.0 was executed.'` in your terminal,  
exports a screen capture into `src/test/capture`.  
(If `src/test/capture` is not existed, the test makes the directory implicity).

## Setup CI.

### GithubActions: assert the latest screen captures.

You did to run a test and taking screen captures above,  
fortunatelly it's executable in CI of course.

it's a better way if you:
- don't have macos.
- are often bothering to update screen captures in your local because the screens are frequently updated.

First, install a yaml to your PJ.  
```sh
mkdir -p ./.github/workflows
curl -s https://raw.githubusercontent.com/yabe-diverta/katalon2puppeteer/main/docs/misc/screen.yaml -o ./.github/workflows/screen.yaml
```

Second, adjust some lines `screen.yaml` for your PJ.
```yaml
...
      - name: e2e
        id: e2e-sequential-puppeteer-action
        uses: yabe-diverta/e2e-sequential-puppeteer-action@v2
        with:
          serve_cmd: npm run dev  # <- remove this line if your want to test public website.
          wait_on: http://localhost:3000  # <- change this value where your website is served at.
          scripts_dir: test/e2e # <- change this value depending on where your test files exists.
...
```

Finally, commit & update.
```sh
git add ./.github
git commit -m "ci: add tester"
git push
```

Now you can find the workflow created in your Github repo website,  
dispatch it manually.

After a while it's done,  
you can find an artifact either the test is scceeded or not.  
Please download it, uzip it, and open it by Chrome.

You can find a result GUI screen powered by [reg-cli](https://github.com/reg-viz/reg-cli).

In the middle of the workflow,  
there are several lines to take new screen captures and to compare old-new difference.  
So a conclusion what the workflow does is:
- installs dependencies
- serves local web server (if it's required)
- takes new screen captures using the same test files you've done
- asserts old-new compalison
- ships a result as an artifact

Moreover,  
in the head part of the workflow,  
defined regular execution written as cron command,  
thus this test will be dispatched every day.

### GithubActions: taking fresh screens.

You did to run a test and taking screen captures above,  
fortunatelly it's executable in CI of course.

it's a better way if you:
- don't have macos.
- are often bothering to update screen captures in your local because the screens are frequently updated.

First, install a yaml to your PJ.  
```sh
mkdir -p ./.github/workflows
curl -s https://raw.githubusercontent.com/yabe-diverta/katalon2puppeteer/main/docs/misc/update-screen.yaml -o ./.github/workflows/update-screen.yaml
```

Second, adjust some lines `update-screen.yaml` for your PJ.
```yaml
...
      - name: e2e
        id: e2e-sequential-puppeteer-action
        uses: yabe-diverta/e2e-sequential-puppeteer-action@v2
        with:
          serve_cmd: npm run dev  # <- remove this line if your want to test public website.
          wait_on: http://localhost:3000  # <- change this value where your website is served at.
          scripts_dir: test/e2e # <- change this value depending on where your test files exists.
...
```

Finally, commit & update.
```sh
git add ./.github
git commit -m "ci: add an updater of screen captures"
git push
```

Now you can find the workflow created in your Github repo website,  
dispatch it manually.

After a while it's done,  
you can find an pull request created by the workflow.  
Please marge it.

OK, the workflow updated your PJ to add screen captures.  
confirm it by pulling the latest. 
```sh
git pull
ls -la test/e2e/capture # <- will show screen captures.
```

---

## Advanced

### :question: How debug?

Please refer to [public debugging tips for Puppeteer](https://github.com/puppeteer/puppeteer#debugging-tips).

### :question: I don't use macos.

We recommend to use macos because of consistency.  
It is because Chrome has different rendering behavior by OS.  
For example [Font issue](https://github.com/puppeteer/puppeteer/issues/661).

It possibly makes you a big confusion hard to debug in a case across several OS used,  
So please use [GithubActions: taking fresh screens](https://yabe-diverta.github.io/katalon2puppeteer/#githubactions-taking-fresh-screens) to take fresh screen captures instead of execution in local.

### :question: The assertion is always filed, why?

In this tool,  
we assumes that the target website is never changed, shows fixed contents in every executions.  
Because we aim to detect visual-diff changes which are not intentiolal ones like due to global CSS affects some styles carelessly,  
those changes should never be occured.  
We don't make tests for mutable contents.

for example,  
if you build your own site as a Blog,  
each contents would never change.  
It measn a content page never change as well,  
less than mutable pages like top page.

So,  
if the test tasks include some mutable page,  
you can add some customization to the task.

If your `open.0.js` captures a mutable screen capture (like top page in Blog),  
you can use an option `disableScreenshot` to avoid taking it.  
(and add puppeteer assertions by yourself if they are needed)  
```diff
 module.exports = async ({ browser, page }) => {
     await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' })
     await page.waitTillHTMLRendered()
+
+    return { disableScreenshot: true }
}
```


### :question: The execution was failed by Nms timeout at `open.0.js`, why?

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

