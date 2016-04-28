var gulp = require('gulp-npm-run')(require('gulp'));
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = tsProject.src().pipe(sourcemaps.init()).pipe(ts(tsProject));
    return tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest('app'));    
});

gulp.task('app:createAsar', function(){          
    var asar = require('asar');
    var src = "app";
    var dest = "app.asar";
    asar.createPackage(src, dest, function() {});
})

gulp.task('build', ['scripts', 'app:clean', 'app:copy', 'app:createAsar'], function () {
    
});

gulp.task('app:clean', function(){
    var rimraf = require('gulp-rimraf');
    gulp.src('package/**/*.*', { read: false }).pipe(rimraf());    
});

gulp.task('app:copy', function(){
    gulp.src('node_modules/angular/angular.min.js').pipe(gulp.dest('app/scripts/lib'));    
    return gulp.src(['app/**/*', "!app/**/*.ts"]).pipe(gulp.dest('package'));
});