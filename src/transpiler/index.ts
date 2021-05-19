import '../ext';
import { locatorToSelector } from './locatorToSelector';
import { seleniumKeyVars } from './seleniumKeyVars';
import { PuppeteerJsonObj } from '../type';
import { waitForNavigationIfNeeded } from './waitForNavigationIfNeeded';
import { seleniumToPuppeteer } from './seleniumToPuppeteer';

export default function transpile(def: PuppeteerJsonObj) {
  const transpiler = seleniumToPuppeteer[def.command];
  if (typeof transpiler !== 'function') {
    console.error(def.command);
    throw Error(def.command);
  }

  const selector = locatorToSelector(def.target);
  const waifNavigationCommand = waitForNavigationIfNeeded(def.target);
  const keyCommand = seleniumKeyVars(def.value);
  const code = transpiler({
    selector,
    waifNavigationCommand,
    keyCommand,
    ...def,
  });

  return `module.exports = async ({ browser, page }) => {${code}}`;
}
