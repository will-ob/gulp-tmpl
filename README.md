gulp-tmplt
==============

Html partials in jst.

Install
-----------

Install with [npm](https://npmjs.org/package/gulp-tmplt)

```javascript
npm install --save-dev gulp-tmplt
```

Usage
---------

```
cd src/
mkdir splash && cd splash

touch _header.html
touch _content1.html
touch _content2.html
touch _content3.html
touch _footer.html
touch index.tmpl

cat <<EOT >> index.tmpl
<!DOCTYPE html>
<html><head><title></title></head>
<body>

  <%= header %>
  <%= content1 %>
  <%= content2 %>
  <%= content3 %>
  <%= footer %>

</body>
</html>
EOT
```

```javascript
var tmpl   = require('gulp-tmpl');

gulp.task('html', function(){

  gulp.src('src/**/index.tmpl')
    .pipe(tmpl())
    .pipe(gulp.dest('./public/'));

});
```

License
--------

Apache 2.0 (c) Will O'Brien 2015
