/**
 * @module theme
 */
const pugCompile = require('pug').compileFile;
const config = require('./../../config.js');

const activeThemePath = `./../../public/themes/${config.theme.activeTheme}`;

const themePaths = {
  index: require.resolve(`${activeThemePath}/index.pug`),
  courses: require.resolve(`${activeThemePath}/courses.pug`),
};

// ref: https://strongloop.com/strongblog/bypassing-express-view-rendering-for-speed-and-modularity/
const render = (res, template) => {
  res.set('Content-Type', 'text/html');
  res.write(template);
  res.end();
};

module.exports = {
  render,
  templates: {
    index: pugCompile(themePaths.index),
    courses: pugCompile(themePaths.courses),
  },
};

