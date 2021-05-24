---
layout: default
title: The assertion is always filed, why?
parent: Advanced
nav_order: 4
---

# :question: The assertion is always filed, why?

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