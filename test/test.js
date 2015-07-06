'use strict';

var assert  = require('assert'),
    gutil   = require('gulp-util'),
    gtmpl   = require('../index'),
    fs      = require('fs');

it('should add partials to the template', function (cb) {

  var stream = gtmpl();

  stream.on('data', function (file) {
    assert.equal(file.relative, 'index.html');
    assert.equal(file.path, 'test/fixture/index.html');
    assert.equal(file.contents.toString(), fs.readFileSync('./test/fixture/expected.html', 'utf8'));
    cb();
  });

  stream.write(new gutil.File({
    cwd: 'test',
    base: 'test/fixture',
    path: 'test/fixture/index.tmpl',
    contents: fs.readFileSync('./test/fixture/index.tmpl')
  }));

  stream.end();
});

