'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolvePath;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var pathModule = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolvePath(path) {
  return new Promise(function (resolve, reject) {
    try {

      var directory = pathModule.parse(pathModule.normalize(path));
      var fullpath = directory.dir;
      if (!directory.ext) {
        fullpath += pathModule.sep + directory.base;
      }
      var pathToModuleP = findModuleDirectory(fullpath);
      pathToModuleP.then(function (pathToModule) {
        return moduleName(pathToModule);
      }).then(getModulePath.bind(null, fullpath)).then(resolve).catch(reject);
    } catch (err) {
      reject(err);
    }
  });
}

function findModuleDirectory(directory) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readdir(directory, function (err, files) {
      if (err) {
        reject(err);
      }
      // console.log('files', files);
      // console.log('in directory ', directory);
      var file = files.filter(function (name) {
        return name === 'package.json';
      });
      if (file.length === 1) {
        resolve(directory);
      } else {
        findModuleDirectory(pathModule.dirname(directory)).then(resolve).catch(reject);
      }
    });
  });
}

function getModulePath(fullpath, moduleName) {
  return './' + fullpath.substr(fullpath.lastIndexOf(moduleName));
}

function moduleName(modulePath) {
  return pathModule.basename(modulePath);
}
