import test from 'ava';
import resolvePath from './../src';

const moduleName = 'relative-filepath-from-module'

test("__filename", async t => {
    const relativePathFromModule = await resolvePath(__filename);
    t.is(relativePathFromModule, `${moduleName}/test/test.js`);
});


test("__dirname", async t => {
    const relativePathFromModule = await resolvePath(`${__dirname}/`);
    t.is(relativePathFromModule, `${moduleName}/test/`);
});

test("package.json is on the same level as file", async t => {
    const relativePathFromModule = await resolvePath(`${__dirname}/../`);
    t.is(relativePathFromModule, `${moduleName}/`);
});

test("__dirname + /", async t => {
    const relativePathFromModule = await resolvePath(`${__dirname}/`);
    t.is(relativePathFromModule, `${moduleName}/test/`);
});

test("package.json is several level above file - with file", async t => {
    const relativePathFromModule = await resolvePath(`${__dirname}/test/subdirectory/README.md`);
    t.is(relativePathFromModule, `${moduleName}/test/test/subdirectory/README.md`);
});

test("not normalize string", async t => {
    const relativePathFromModule = await resolvePath(`${__dirname}/test/../test/subdirectory`);
    t.is(relativePathFromModule, `${moduleName}/test/test/subdirectory`);
});
