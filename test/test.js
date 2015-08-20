'use strict';

var assert  = require('assert'),
    gutil   = require('gulp-util'),
    gtmpl   = require('../index'),
    fs      = require('fs');

it('should add partials to the template', function (cb) {

  var stream = gtmpl();

  stream.on('data', function (file) {
    assert.equal(file.relative, 'index.html');
    assert.equal(file.path, 'test/fixtures/default/index.html');
    assert.equal(file.contents.toString(), fs.readFileSync('./test/fixtures/default/expected.html', 'utf8'));
    cb();
  });

  stream.write(new gutil.File({
    cwd: 'test',
    base: 'test/fixtures/default',
    path: 'test/fixtures/default/index.tmpl',
    contents: fs.readFileSync('./test/fixtures/default/index.tmpl')
  }));

  stream.end();
});

it('should permit custom regex to be passed', function (cb) {

  var stream = gtmpl({ re: /^(.+)\.phtml$/ });

  stream.on('data', function (file) {
    assert.equal(file.relative, 'index.html');
    assert.equal(file.path, 'test/fixtures/custom-re/index.html');
    assert.equal(file.contents.toString(), fs.readFileSync('./test/fixtures/custom-re/expected.html', 'utf8'));
    cb();
  });

  stream.write(new gutil.File({
    cwd: 'test',
    base: 'test/fixtures/custom-re',
    path: 'test/fixtures/custom-re/index.tmpl',
    contents: fs.readFileSync('./test/fixtures/custom-re/index.tmpl')
  }));

  stream.end();
});
