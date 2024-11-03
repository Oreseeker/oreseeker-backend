function getAccessToken(req) {
  const { accessTokenOne, accessTokenTwo } = getCookies(req);
  if (!accessTokenOne || !accessTokenTwo) return null;
  return accessTokenOne + accessTokenTwo;
}

function getCookies(req) {
  const rawCookies = req.headers.cookie;
  if (!rawCookies) return {};
  const cookies = rawCookies.split('; ').reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split('=');
    if (!isNaN(+value)) {
      accumulator[key] = +value;
    } else {
      accumulator[key] = value;
    }
    return accumulator;
  }, {});

  return cookies;
}

module.exports = { getCookies, getAccessToken };
