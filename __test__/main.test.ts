import fs from 'fs';
import * as Transpiler from '../src';

describe('snapshot main transpilation', () => {
  test.skip('will match snapshot', () => {
    // arrange
    fs.mkdirSync = jest.fn().mockReturnValue(() => {});
    fs.writeFileSync = jest.fn().mockReturnValue(() => {});

    // act
    Transpiler.create({
      input: './__test__/etc/test.json',
      delay: 500,
    });

    // assert
    const outDir = (fs.mkdirSync as jest.Mock).mock.calls[0][0];
    const outFile = (fs.writeFileSync as jest.Mock).mock.calls[0][0];
    const code = (fs.writeFileSync as jest.Mock).mock.calls[0][1];

    // console.dir(outDir);
    // console.dir(outFile);
    // console.dir(code);

    expect(fs.mkdirSync).toBeCalled();
    expect(fs.writeFileSync).toBeCalled();

    expect(outDir).toBe(`${process.cwd()}/__test__/etc`);
    expect(outFile).toBe(`./__test__/etc/test.e2e.test.js`);
    expect(code).toMatchSnapshot();
  });
});
