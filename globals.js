global.APP_ROOT_PATH = __dirname;

global.load = function(path) {
  let newPath = path;
  if (path.startsWith('@')) newPath = path.join(APP_ROOT_PATH, 'src', path.slice(1));
  return require(newPath);
}
