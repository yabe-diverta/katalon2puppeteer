/**
 * @author      SamKirkland
 * @license     MPL
 * @project     https://github.com/SamKirkland/Puppeteer-exporter-for-Katalon-Recorder
 */
export const seleniumToPuppeteer: { [cmd: string]: (x: any) => string } = {
  open: (x) => `
        await page.goto("${x.selector}", { waitUntil: 'networkidle0' });
        await page.waitTillHTMLRendered();`,
  doubleclick: (x) => `
        await page.waitForXPath("${x.selector}");
        element = await page.$x("${x.selector}");
        await Promise.all([await element[0].click({ clickCount: 2 }), page.waitTillHTMLRendered()]);`,
  click: (x) => `
        await page.waitForXPath("${x.selector}");
        element = await page.$x("${x.selector}");
        await Promise.all([await element[0].click(), page.waitTillHTMLRendered()]);`,
  store: (x) => `
        await let ${x.selector} = ${x.value};`,
  type: (x) => `
        await page.waitForXPath("${x.selector}")
        element = await page.$x("${x.selector}");
        await element[0].type('${x.value}');`,
  typeKeys: (x) => `
        await page.waitForXPath("${x.selector}")
        element = await page.$x("${x.selector}");
        await element[0].type('${x.value}');`,
  pause: (x) => `
        await page.waitFor(parseInt("${x.selector}"));`,
  mouseover: (x) => `
        await page.hover("${x.selector}");`,
  deleteallvisiblecookies: (x) => `
        await page.deleteCookie(await page.cookies());`,
  capturescreenshot: (x) => `
        await page.screenshot({
            path: "${x.selector || 'sc'}.jpg"
        });`,
  captureentirepagescreenshot: (x) => `
        await page.screenshot(
            path: "${x.selector || 'sc'}.jpg",
            fullPage: true
        });`,
  bringbrowsertoforeground: (x) => `
        await page.bringToFront();`,
  refresh: (x) => `
        await page.reload();
        await page.waitTillHTMLRendered();`,
  echo: (x) => `
        console.log("${x.selector}", "${x.value}");`,
  get: (x) => `
        await page.goto("${x.selector}}");
        await page.waitTillHTMLRendered();`,
  comment: (x) => `
        // ${x.selector}`,
  submit: (x) => `
        await page.waitForXPath("${x.selector}");
        formElement = await page.$x("${x.selector}");
        await page.evaluate(form => form.submit(), formElement[0]);
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        await page.waitTillHTMLRendered();`,
  sendkeys: (x) => `
        await page.keyboard.press("${x.keyCommand}");
        await page.waitTillHTMLRendered();`,
  selectframe: (x) => `
        var frames = await page.frames();
        var newFrame = await frames.find(f => f.name() === "${x.target}");`,
  selectwindow: (x) => `
        tabs = await browser.pages();
        console.log(tabs);`,
  assertelementpresent: (x) => `
        if (await page.$("${x.selector}") !== null) {
            console.log("assertElementPresent PASSED.");
        } else {
            throw "assertElementPresent FAILED. Element not found.";
        }`,
  verifyelementpresent: (x) => `
        if (await page.$("${x.selector}") !== null) {
        console.log("verifyElementPresent PASSED.");
        } else {
        console.log("verifyElementPresent FAILED. Element not found.");
        }`,
  waitforpagetoload: (x) =>
        `await page.waitForFunction(() => 
            while (document.readyState !== 'complete'); return true;
        });
        await page.waitTillHTMLRendered();`,
  waitforvisible: (x) => `
        await page.waitForXPath("${x.selector}", { visible: true });`,
  waitforelementpresent: (x) => `
        await page.waitForXPath("${x.selector}");`,
};
