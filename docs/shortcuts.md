---
layout: default
title: Shortcuts
nav_order: 2
---

# Shortcuts

We'll conduct below from now on!
```sh
# run local server for your application in advance if it's supposed to be executed in your local
# record your manipulations through katalon web recorder, then dump it to ~/Download/ExampleTest.json

# move files
mkdir -p test/e2e
mv ~/Downloads/ExampleTest.json test/e2e

# install dependencies
npm install puppeteer # install puppeteer module as a dependency of repo
npm install katalon2puppeteer@latest -g # install katalon2puppeteer module globally

# generate test code
k2p test/e2e/ExampleTest.json

# run test
node test/e2e/ExampleTest/index.js

# push the result
git add .
git commit -m "test: add test resources"
git push

# install GithubActions workflows
mkdir -p ./.github/workflows
curl -s https://raw.githubusercontent.com/yabe-diverta/katalon2puppeteer/main/docs/misc/screen.yaml -o ./.github/workflows/screen.yaml
curl -s https://raw.githubusercontent.com/yabe-diverta/katalon2puppeteer/main/docs/misc/update-screen.yaml -o ./.github/workflows/update-screen.yaml

# push the workflows 
git add ./.github
git commit -m "test: add an updater of screen captures"
git push

# GithubActions in Github,
# dispatch "visual regression e2e testing for management screen" workflow
```