import lodash = require('lodash');

export function toCamelCase(data: Record<string, any>) {
  if (typeof data !== "object") throw new Error('Argument is not an data!');
  const isArray = Array.isArray(data);
  if (isArray) {
    const newArray: any[] = [];
    data.forEach(object => {
      newArray.push(toCamelCase(object));
    });
    return newArray;
  }
  const keys = Object.keys(data);
  let newdata = {};
  keys.forEach((key, keyIndex) => {
    const newKey = lodash.camelCase(key);
    // @ts-ignore
    newdata[newKey] = data[key];
  });
  return newdata;
}

/* Функция делит пополам строку и возвращает половинки.
   Если число символов нечетное, то возвращает первую строку меньшей длины */
export function divideString(str: string) {
  const l = str.length;
  const firstPartLength = Math.floor(l / 2);
  const firstPart = str.slice(0, firstPartLength);
  const secondPart = str.slice(firstPartLength);
  return [ firstPart, secondPart ];
}
