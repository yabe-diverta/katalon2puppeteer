---
layout: default
title: How integrate tests with "Mutable" app?
parent: Advanced
nav_order: 6
---

# :question: How integrate tests with "Mutable" app?

We mentions as [here](/katalon2puppeteer/advanced/the-assertion-always-fails-why.html),  
the best matching to integrate tests with this tool is for "Immutable" apps.  
Because this tool provides a way of detecting differences on your app screens day by day,  
when your app supposes to change contents frequently,  
the test would railse failures easily.

Although the tool makes a provision for e2e testing and provides a workflow for daily testing on CI.  
We think it's better to standardize a testing way in particular for out-of-data organizations.  
You can adjust assertions freely as you want after providing the skeleton.

for your "Mutable" app,  
we suggest to aviod taking screenshots and apply concrete assertions in each tasks.

It would be like:  
```diff
 module.exports = async ({ browser, page }) => {
+
+  // assertion def
+  const assertionDef = {
+    div1: {
+      query: '#div1',
+      expected: 'This is DIV 1.'
+    },
+    p1: {
+      query: '#p1',
+      expected: 'This is P 1.'
+    }
+  }
+
   await page.goto('http://localhost:8080/', {
     waitUntil: 'networkidle0',
   });
   await page.waitTillHTMLRendered();
+
+  // assert innerText in each testee elements
+  Object.values(assertionDef).forEach(async ({ query, expected }) => {
+    const element = await page.$(query);
+    const content = await page.evaluate(el => el.textContent, element);
+    if (content !== expected) {
+      throw Error(`${query} should match ${expected}`)
+    }
+  })
+
+  // do not take screen capture
+  return { disableScreenshot: true }
 };
```

Alternatively,  
you can use a testing framework for assertions like [jest](https://github.com/smooth-code/jest-puppeteer),  
overwrite all tasks JS files drastically by yourself.
