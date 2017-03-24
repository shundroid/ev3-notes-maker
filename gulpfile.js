var exec = require('child_process').exec;
var webpack = require('webpack');
var electronConnect = require('electron-connect').server.create();
var gulp = require('gulp');
var config = require('./webpack.renderer.config')

var isStarted = false;
gulp.task('webpack', () => {
  config.watch = true;
  webpack(config, () => {
    if (!isStarted) {
      console.log("Starting Electron Connect Server...");
      electronConnect.start();
      isStarted = true;
    } else {
      console.log("Reloading Electron Connect Server...");
      electronConnect.reload();
    }
  });
  gulp.watch("./app/src/main/**/*.js", electronConnect.restart);
});