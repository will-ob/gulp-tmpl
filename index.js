'use strict';

var through  = require('through2'),
    gutil    = require('gulp-util'),
    fs       = require('fs'),
    _        = require('lodash'),
    path     = require('path'),
    ext      = gutil.replaceExtension;

module.exports = function(opts){
  if(opts == null){opts = {};}

  return through.obj(function(file, enc, cb){
    var template, data, dir;

    if(file.isNull()) {
      this.push(file);
      return cb();
    }
    if(file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-tmpl', 'Streaming not supported'));
      return cb();
    }
    try {

      template = _.template(file.contents.toString('utf8'));
      dir = path.dirname(file.path);

      fs.readdir(dir, function(err, files){
        var data = {},
            re = opts.re || /^_(.+)\.html$/,
            x;

        _.each(files, function(basename){
          if(x = re.exec(basename)) {
            data[x[1]] = fs.readFileSync(dir + "/" + basename).toString('utf8');
          }
        });

        var out = template(data);
        file.contents = new Buffer(out, 'utf8');
        file.path = ext(file.path, ".html");
        this.push(file);
        return cb();
      }.bind(this));
    } catch (e) {
      console.log(e);
      this.emit('error', new gutil.PluginError('gulp-tmpl', 'Error processing template file', e));
      return cb();
    }
  });

};
