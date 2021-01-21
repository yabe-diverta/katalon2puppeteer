# katalon2puppeteer

transpiles json expoeted by katalon web recorder to node script using puppeteer.

## installation

`npm i katalon2puppeteer`

## Useage

`k2p -i './test.json'`

an example with optionis  
`k2p -i 'test/e2e/**/*.json' --basicAuth username:password --capture --delay 2000 --capture --headlless`

json files are supposed to be exported with [katalon web recorder](https://chrome.google.com/webstore/detail/katalon-recorder-selenium/ljdobmomdgdljniojadhoplhkpialdid).  
choose `JSON (via plugin)` in each testcase for export json files.  
![instruction.gif](./.github/doc/instruction.gif)