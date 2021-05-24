---
layout: default
title: What is this page?
nav_order: 1
---

# What is this page?

> This document is for making visual e2e screen shot testing with GithubActions with a tool [katalon2puppeteer](https://www.npmjs.com/package/katalon2puppeteer)

## Motivation

While developping and providing vary applications,  
you would realize it's really hard to know either the apps are working expectedly now.

Sometimes backends may not work,  
sometimes IaaS platform is down.  
Or your latest change like changing global CSS made your application critical issues, and it would been left.

To prevent it, you should prepare some tests, and make them run regularly.

We'll introduce how maintain your application by visual regression e2e testing with the tool [katalon2puppeteer](https://www.npmjs.com/package/katalon2puppeteer).

## Prerequisites

- chrome
- git
- Node
- yarn

If you don't have yarn in your laptop, please run following comand:  
`npm install --global yarn`
