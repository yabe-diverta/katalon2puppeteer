interface String {
  replaceAll(str1: string, str2: string, ignore: boolean): void;
  add(str: string): string;
}
interface Number {
  pad(): string;
}

String.prototype.replaceAll = function (str1, str2, ignore) {
  return this.replace(
    new RegExp(
      str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, '\\$&'),
      ignore ? 'gi' : 'g'
    ),
    typeof str2 == 'string' ? str2.replace(/\$/g, '$$$$') : str2
  );
};

String.prototype.add = function (str = '') {
  return `${this}${str}`;
};

Number.prototype.pad = function () {
  return `000${this}`.slice(-3);
};
