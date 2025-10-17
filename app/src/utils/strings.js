function containsUppercase(str, count = 1) {
  let counter = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== str[i].toUpperCase()) continue;
    counter += 1;
    if (counter === count) return true;
  }

  return false;
}

function containsLowercase(str, count = 1) {
  let counter = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== str[i].toLowerCase()) continue;
    counter += 1;
    if (counter === count) return true;
  }

  return false;
}

function containsDigits(str, count = 1) {
  let counter = 0;
  for (let i = 0; i < str.length; i++) {
    if (isNaN(+str[i])) continue;
    counter += 1;
    if (counter === count) return true;
  }

  return false; 
}

function containsSpecialSymbols(str, count = 1) {
  let counter = 0;
  for (let i = 0; i < str.length; i++) {
    const isNumber = !isNaN(+str[i]);
    const isSpecialSymbol = !isNumber && str[i].toLowerCase() === str[i] && str[i].toUpperCase() === str[i];
    if (!isSpecialSymbol) continue;
    counter += 1;
    if (counter === count) return true;
  }

  return false; 
}

module.exports = {
  containsUppercase,
  containsLowercase,
  containsSpecialSymbols,
  containsDigits,
};
