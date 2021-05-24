---
layout: default
title: How JS works detail
parent: Generate JS testing files
nav_order: 2
---

# How JS works detail

Let me explain a little bit if you want to know details.

For instance for my test case,  
i made a simple test including only 4 actions (manipulations).  
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/cca7381189d72719cd79b39037f01df7.png)](https://diverta.gyazo.com/cca7381189d72719cd79b39037f01df7)

I exported this as a resource JSON file as the same way as you did,  
the JSON had 4 elements in it's data.  
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
~/w/nuxt-realworld ❯❯❯ cat test/e2e/ExampleTest/task/index.js
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
outputs messages like `'promise no.0 open.0 was executed.'` in your terminal,  
exports screen captures into `src/test/capture`.  
(If `src/test/capture` is not existed, the test makes the directory implicity).

