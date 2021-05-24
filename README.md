# katalon2puppeteer

transpiles json expoeted by katalon web recorder to node script using puppeteer.

## Turorial

Please take a look [a complete tutorial guide](https://yabe-diverta.github.io/katalon2puppeteer/) to get to know how this tool works.

## installation

`npm i katalon2puppeteer -g`

## Useage

`k2p -i './test.json'`

an example with optionis  
```shell
k2p \
    -i 'test/e2e/**/*.json' \
    --delay 2000
```

json files are supposed to be exported with [katalon web recorder](https://chrome.google.com/webstore/detail/katalon-recorder-selenium/ljdobmomdgdljniojadhoplhkpialdid).  
choose `JSON (via plugin)` in each testcase for export json files.  
![instruction.gif](./.github/doc/instruction.gif)
