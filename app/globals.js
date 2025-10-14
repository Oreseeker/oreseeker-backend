const pathModule = require('path');
global.APP_ROOT_PATH = __dirname;

global.load = function(path) {
  console.log('req', resolve(path));
  return require(resolve(path));
}

global.resolve = function(path) {
  return path.startsWith('@')
    ? pathModule.join(APP_ROOT_PATH, 'src', path.slice(1))
    : pathModule.join(__dirname, path);
}
