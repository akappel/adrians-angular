var gulp = require('gulp');
var server = require('gulp-express');
var child_process = require('child_process');

gulp.task('default', function() {
	gulp.run('server');
});

gulp.task('server',  ['mongodb'], function() {
	server.run(['app.js']);
	gulp.watch(['app.js'], [server.run]);
});

gulp.task('mongodb', function() {
	child_process.exec('start mongod --dbpath ./data');
});
