---
layout: default
title: Taking fresh screen captures
parent: Set up CI
nav_order: 3
---

## GithubActions: taking fresh screen captures.

You've run a initial test to compile screen captures in your local,  
fortunately this workaround is executable on CI.

it's a better way if you:
- don't have macos.
- are often bothering to update screen captures in your local because the screens are frequently updated.

First, install a yaml to your PJ.  
```sh
mkdir -p ./.github/workflows
curl -s https://raw.githubusercontent.com/yabe-diverta/katalon2puppeteer/main/docs/misc/update-screen.yaml -o ./.github/workflows/update-screen.yaml
```

Next, commit & update.
```sh
git add ./.github
git commit -m "test: add an updater of screen captures"
git push
```

Now you can find the workflow created in your Github repo website,  
dispatch it manually.

After a while,  
the workflow makes a new pull request to your repo.  
Please confirm and marge it.

OK, that's it.
You can refresh screen captures by hitting the dispatch button as you required.

