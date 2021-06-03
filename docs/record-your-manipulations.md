---
layout: default
title: Record your manipulations
nav_order: 4
---

# Record your manipulations

Install [Katalon Recorder](https://chrome.google.com/webstore/detail/katalon-recorder-selenium/ljdobmomdgdljniojadhoplhkpialdid) extension in your Chrome.

Open `chrome://extensions/` in your Chrome.  
(toggle to turn on the extension if it's disabled).
[![Image from Gyazo](https://t.gyazo.com/teams/diverta/02feaf5b3c0a7cef65ce8d0b3f09ca8e.png)](https://diverta.gyazo.com/02feaf5b3c0a7cef65ce8d0b3f09ca8e)

Check the upper right side in your Chrome,  
you can find the logo icon of the extension.  
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

> :warning: It's better to record wihtout cookies if your app requires login.  
> Please checkout [tips](/katalon2puppeteer/advanced/how-login.html) instead.

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