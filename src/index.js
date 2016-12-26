import fs from 'fs';
import * as pathModule from 'path';

export default function resolvePath(path) {
  return new Promise((resolve, reject) => {
    try {

      const directory = pathModule.parse(pathModule.normalize(path))
      let directoryPath = directory.dir
      if(!directory.ext) {
        directoryPath += pathModule.sep + directory.base
      }
      const pathToModuleP = findModuleDirectory(directoryPath)
      pathToModuleP
        .then(pathToModule => moduleName(pathToModule))
        .then(getModulePath.bind(null, path))
        .then(resolve)
        .catch(reject)
    } catch(err) {
      reject(err);
    }
  });
}

function findModuleDirectory(directory) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err,  files) => {
      if (err) {
        reject(err);
      }
      // console.log('files', files);
      // console.log('in directory ', directory);
      const file = files.filter(name => name === 'package.json');
      if(file.length === 1) {
        resolve(directory);
      } else {
        findModuleDirectory(pathModule.dirname(directory))
          .then(resolve)
          .catch(reject)
      }
    });
  });
}

function getModulePath(fullpath, moduleName){
  return pathModule.normalize(
          fullpath.substr(
            fullpath.lastIndexOf(moduleName)
          )
        )
}

function moduleName(modulePath) {
  return pathModule.basename(modulePath);
}
