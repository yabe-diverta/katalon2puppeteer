import { css2xpath } from './css2xpath';

/**
 * @author      SamKirkland
 * @license     MPL
 * @project     https://github.com/SamKirkland/Puppeteer-exporter-for-Katalon-Recorder
 */

/**
 * This function assumes that Katalon's Record uses the ExtensionScript.js (deleted this file), which
 * should be found in the same directory as this file (background.js). The preference of
 * locators is absoluteCSS, xpath:position, xpath:idRelative, xpath:link, css.
 * It is unlikely that anything other than xpath will be received, as absoluteCSS does not
 * currently work. The rest of the checks are just in case.
 * */
export function locatorToSelector(target: any) {
  let selector = target;

  if (target.substring(0, 1) === '/' || target.substring(0, 2) === '//') {
    return selector;
  } else if (target.substring(0, 6) === 'xpath=') {
    selector = target.substring(6, target.length);
  } else if (target.substring(0, 12) === 'absoluteCSS=') {
    selector = css2xpath(target.substring(12, target.length));
  } else if (target.substring(0, 4) === 'css=') {
    selector = css2xpath(target.substring(4, target.length));
  } else if (target.substring(0, 5) === 'name=') {
    selector = "//*[@name='" + target.substring(5, target.length) + "']";
  } else if (target.substring(0, 3) === 'id=') {
    selector = "//*[@id='" + target.substring(3, target.length) + "']";
  } else if (target.substring(0, 5) === 'link=') {
    let offset = 5;
    if (target.substring(5, 11) == 'exact:') {
      offset = 11;
    }
    selector =
      "//a[normalize-space()='" + target.substring(offset, target.length) + "']"
  }

  return selector;
}
