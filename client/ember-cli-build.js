/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                           Copyright 2016 Chuan Ji                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import(
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    { type: 'vendor' });
  app.import(
    'bower_components/jquery-ui/jquery-ui.js',
    { type: 'vendor' });
  app.import(
    'bower_components/web-workers-fallback/Worker.js',
    { type: 'vendor' });
  var asciidoctor = new Funnel(
    'bower_components/asciidoctor.js/dist',
    {
      destDir: '/assets/asciidoctor.js',
      files: ['asciidoctor-all.min.js']
    });
  var aceEditor = new Funnel(
    'bower_components/ace-builds/src-min-noconflict',
    { destDir: '/assets/ace-editor' });
  var workers = new Funnel(
    'workers',
    { destDir: '/assets/workers' });

  return app.toTree([asciidoctor, aceEditor, workers]);
};
