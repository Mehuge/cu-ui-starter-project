const npsUtils = require('nps-utils');
const requires = [ 'react', 'react-dom', 'es6-promise' ];
const transpiled = 'build/transpiled/index.js';
const output = 'dist/js/index.js';

module.exports = {
  scripts: {
    // Cleaup everything (except node_modules)
    clean: {
      script: 'rimraf build dist',
      everything: 'rimraf build dist node_modules',
    },

    // Complete build from clean to dist
    build: {
      script: 'nps clean compile transpile sass distribute tidy',
    },

    // Compile TypeScript -> JavaScript
    compile: 'tsc',

    // Transpile ES6/ES2015 to ES5
    transpile: 'babel build/preprocessed -d build/transpiled -q',

    // Compile CSS
    sass: 'node-sass src/index.sass -o build/css --importer node_modules/sass-importer-node/sass-importer-node.js --quiet',

    // Setup dist folder, and bundle the javascript for the browser
    distribute: {
      script: 'nps distribute.dirs distribute.browserify copy',
      dirs: 'mkdirp dist/js dist/css',
      browserify: `browserify ${transpiled} ${['', ...requires].join(' -r ')} -o ${output} --fast --noparse=FILE -t [ envify --NODE_ENV production ]`,
    },

    // Copy resources to dist
    copy: {
      script: 'nps copy.css copy.others copy.images',
      others: 'copyup src/*.html src/*.ui dist',
      css: 'copyup build/css/**/* dist',
      images: 'copyup build/images/**/* dist',
    },

    // Post build clean up intermediate folders
    tidy: 'rimraf build',

    // Watch for changes and update
    watch: {
      // Run the watchers, and the webserver concurrently
      script: npsUtils.concurrent.nps(
        'watch.ts', 'watch.sass', 'watch.images', 'watch.other',
        'watch.livereload', 'watch.browser'),

      // Watchers
      ts: 'watch -p "src/**/*.ts" -p "src/**/*.tsx" -c "nps update.ts"',
      sass: 'watch -p "src/**/*.sass" -c "nps update.sass"',
      images: 'watch -p "src/images/**/*" -c "nps copy.images"',
      other: 'watch -p "src/*.html" -p "src/*.ui" -c "nps copy.others"',

      // Browser and reloader
      browser: 'http-server dist/ -p 9003 -o --cors -c-1',
      livereload: 'livereload dist/',
    },

    // Re-compile in response to updates detected by watchers
    update: {
      ts: 'nps compile transpile distribute.browserify',
      sass: 'nps sass copy.css',
    },

    // Short hand for build+watch
    dev: 'nps build watch',
  }
}
