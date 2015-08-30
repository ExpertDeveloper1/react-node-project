var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");


gulp.task('default',['process_css_font'],function() {
	webpack(webpackConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
	
	});
});
gulp.task('process_css_font',function(){
  gulp.src('bower_components/bootstrap/dist/css/*.css')
    .pipe(gulp.dest('public/stylesheets/bootstrap/css'));
  gulp.src('bower_components/bootstrap/dist/fonts/*.*')
    .pipe(gulp.dest('public/stylesheets/bootstrap/fonts'));
});
