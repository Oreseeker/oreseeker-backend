function containsUppercase(str) {
  return str !== str.toUpperCase();
}

function containsLowercase(str) {
  return str !== str.toLowerCase();
}

module.exports = {
  containsUppercase,
  containsLowercase,
};
