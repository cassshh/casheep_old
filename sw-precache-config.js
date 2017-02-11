module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/bower_components/webcomponentsjs/webcomponents-lite.min.js'
  ],
  navigateFallback: '/index.html',
  //https://github.com/Polymer/polymer-cli/issues/290
  navigateFallbackWhitelist: [ /^\/[^\_]+\/?/ ]  
};
