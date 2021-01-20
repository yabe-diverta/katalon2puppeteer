import './extensions';
import { locatorToSelector } from './locatorToSelector';
import { waitForNavigationIfNeeded } from './waitForNavigationIfNeeded';
import { seleniumKeyVars } from './seleniumKeyVars';

/**
 * @author      SamKirkland
 * @license     MPL
 * @project     https://github.com/SamKirkland/Puppeteer-exporter-for-Katalon-Recorder
 */

const seleniumToPuppeteer: { [cmd: string]: (x: any) => string } = {
  open: (x) => {
    const [protocol, hostname] = x.selector
      .split(/^(http:\/\/|https:\/\/)/gi)
      .filter((v: string) => v !== '');
    const [username, password] = x.basicAuth;
    const url =
      username !== ''
        ? `${protocol}${username}:${password}@${hostname}`
        : `${protocol}${hostname}`;
    return `
    await page.goto("${url}", { waitUntil: 'networkidle0' });`;
  },
  doubleclick: (x) => `
    await page.waitForXPath("${x.selector}")
    element = await page.$x("${x.selector}");
    await element[0].click({ clickCount: 2 });`,
  click: (x) => `
    await page.waitForXPath("${x.selector}")
    element = await page.$x("${x.selector}");
    await element[0].click();
    ${x.waifNavigationCommand}`,
  store: (x) => `
    await let ${x.selector} = ${x.value};`,
  type: (x) => `
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
    await page.reload();`,
  echo: (x) => `
    console.log("${x.selector}", "${x.value}");`,
  get: (x) => `
    await page.goto("${x.selector}}");
    ${x.waifNavigationCommand}`,
  comment: (x) => `
    // ${x.selector}`,
  submit: (x) => `
    await page.waitForXPath("${x.selector}");
    formElement = await page.$x("${x.selector}");
    await page.evaluate(form => form.submit(), formElement[0]);
    await page.waitForNavigation();`,
  sendkeys: (x) => `
    await page.keyboard.press("${x.keyCommand}");
    ${x.waifNavigationCommand}`,
  selectframe: (x) => `
    var frames = await page.frames();
    var newFrame = await frames.find(f => f.name() === "${x.target}");`,
  selectwindow: (x) => `
    tabs = await browser.pages();
    console.log(tabs);`,
  assertelementpresent: (x) =>
    `
    if (await page.$("${x.selector}") !== null) {
        console.log("assertElementPresent PASSED.");
    } else {
        throw "assertElementPresent FAILED. Element not found.";
    }`,
  verifyelementpresent: (x) =>
    `
    if (await page.$("${x.selector}") !== null) {
      console.log("verifyElementPresent PASSED.");
    } else {
      console.log("verifyElementPresent FAILED. Element not found.");
    }`,
  waitforpagetoload: (x) =>
    `await page.waitForFunction(() => 
      while (document.readyState !== 'complete'); return true;
    });`,
  waitforvisible: (x) => `
    await page.waitForXPath("${x.selector}", { visible: true });`,
  waitforelementpresent: (x) => `
    await page.waitForXPath("${x.selector}");`,
};

export function transpile({
  command,
  target,
  value,
  basicAuth,
}: {
  command: any;
  target: any;
  value: any;
  basicAuth: any;
}) {
  const selector = locatorToSelector(target);
  const waifNavigationCommand = waitForNavigationIfNeeded(target);
  const keyCommand = seleniumKeyVars(value);
  const transpiler = seleniumToPuppeteer[command];
  return transpiler({
    command,
    target,
    value,
    selector,
    waifNavigationCommand,
    keyCommand,
    basicAuth,
  });
}
