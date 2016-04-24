/*
 * JBZoo App is universal Joomla CCK, application for YooTheme Zoo component
 *
 * @package     jbzoo
 * @version     2.x Pro
 * @author      JBZoo App http://jbzoo.com
 * @copyright   Copyright (C) JBZoo.com,  All rights reserved.
 * @license     http://jbzoo.com/license JBZoo Licence
 */

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('scripts', function () {
    gulp.src([
            'src/widget.js',
            'src/jbzoo.js'
        ])
        .pipe(concat('factory.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

gulp.task('build', ['scripts']);
