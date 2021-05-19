/**
 * @author      SamKirkland
 * @license     MPL
 * @project     https://github.com/SamKirkland/Puppeteer-exporter-for-Katalon-Recorder
 */

// built in selenium vars
// https://github.com/Jongkeun/selenium-ide/blob/6d18a36991a9541ab3e9cad50c2023b0680e497b/packages/selenium-ide/src/content/selenium-api.js
// https://github.com/GoogleChrome/puppeteer/blob/master/lib/USKeyboardLayout.js
let keyDictionary: any = {
  '${KEY_LEFT}': 'ArrowLeft',
  '${KEY_UP}': 'ArrowUp',
  '${KEY_RIGHT}': 'ArrowRight',
  '${KEY_DOWN}': 'ArrowDown',
  '${KEY_PGUP}': 'PageUp',
  '${KEY_PAGE_UP}': 'PageUp',
  '${KEY_PGDN}': 'PageDown',
  '${KEY_PAGE_DOWN}': 'PageDown',
  '${KEY_BKSP}': 'Backspace',
  '${KEY_BACKSPACE}': 'Backspace',
  '${KEY_DEL}': 'Delete',
  '${KEY_DELETE}': 'Delete',
  '${KEY_ENTER}': 'Enter',
  '${KEY_TAB}': 'Tab',
  '${KEY_HOME}': 'Home',
};

export function seleniumKeyVars(originalValue: any) {
  let modifiedValue = originalValue;

  // console.log('originalValue', originalValue);
  // loop over all selenium vars and replace all instances with the value in keyDictionary
  Object.keys(keyDictionary).forEach(
    (key) => (modifiedValue = modifiedValue.replaceAll(key, keyDictionary[key]))
  );

  // console.log('modifiedValue', modifiedValue);

  return modifiedValue;
}
