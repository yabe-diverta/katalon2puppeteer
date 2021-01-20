/**
 * @author      SamKirkland
 * @license     MPL
 * @project     https://github.com/SamKirkland/Puppeteer-exporter-for-Katalon-Recorder
 */

/**
 * Automatically adds "waitForNavigation" if the command needs it
 * @param {{command: string, target: string, value: string}} command
 * @return string}
 */
export function waitForNavigationIfNeeded(target: any) {
  if (target.toLowerCase().startsWith('link=')) {
    // It's a link, the page is probably going to change
    return `\n\tawait page.waitForNavigation();`;
  }

  return '';
}
