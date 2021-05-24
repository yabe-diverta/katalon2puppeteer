---
layout: default
title: Assert the latest screen captures
parent: Set up CI
nav_order: 2
---

## GithubActions: assert the latest screen captures

Install a yaml to your PJ.
```sh
mkdir -p ./.github/workflows
curl -s https://raw.githubusercontent.com/yabe-diverta/katalon2puppeteer/main/docs/misc/screen.yaml -o ./.github/workflows/screen.yaml
```

Next, commit & update.
```sh
git add ./.github
git commit -m "test: add tester"
git push
```

Now you can find the workflow created in your Github repo website.
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/ca6bc6c3303d9ca3edc0673c7d10bc33.png)](https://diverta.gyazo.com/ca6bc6c3303d9ca3edc0673c7d10bc33)

Dispatch it manually.  
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/4cb12d66476eaac84c966d2332716f48.png)](https://diverta.gyazo.com/4cb12d66476eaac84c966d2332716f48)

After a while,  
you can find an artifact either the test is scceeded or not.  
Please download it, uzip it, and open it by Chrome.
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/d7e0af281826e4457ae8b8b322f1e979.png)](https://diverta.gyazo.com/d7e0af281826e4457ae8b8b322f1e979)

You can find a result GUI screen powered by [reg-cli](https://github.com/reg-viz/reg-cli).  
(below is the example as an error, 1 diff detected)
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/eb9e26123309421b74ccd6932afb0b88.png)](https://diverta.gyazo.com/eb9e26123309421b74ccd6932afb0b88)

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

### Setup notification

You can even have notifications when the test are failed.  
Please checkout commented out lines in `screen.yml`,  
and setup notification with Webhook.  
Please refere to [slack-notify](https://github.com/marketplace/actions/slack-notify) GithubActions app.

