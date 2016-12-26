
#relative-filepath-from-module

_Returns a filepath relative to the module you are in._

## Usage


```js
// file: /home/username/git/personal/relative-filepath-from-module/test/yet-another-dir/
import modulePathFromFile from 'relative-filepath-from-module'
const modulePath = modulePathFromFile(__dirname)

console.log(modulePath) // relative-filepath-from-module/test/yet-another-dir/
```

```js
// file: /home/username/git/personal/relative-filepath-from-module/test/yet-another-dir/testFile.js

import modulePathFromFile from 'relative-filepath-from-module'
const modulePath = modulePathFromFile(__dirname)

console.log(modulePath) // relative-filepath-from-module/test/yet-another-dir/testFile.js
```


```js
// file: /home/username/git/personal/relative-filepath-from-module/test/yet-another-dir

import modulePathFromFile from 'relative-filepath-from-module'
const modulePath = modulePathFromFile(__dirname)

console.log(modulePath) // relative-filepath-from-module/test/yet-another-dir
```


Should also work on windows, but have not tested. feedback is welcomed.


### See also
* [module-name-from-path](https://github.com/watson/module-name-from-path)
