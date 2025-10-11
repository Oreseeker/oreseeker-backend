global.APP_ROOT_PATH = __dirname;

global.load = function(path) {
  return require(resolve(path));
}

global.resolve = function(path) {
  return path.startsWith('@') ? path.join(APP_ROOT_PATH, 'src', path.slice(1)) : path;
}
