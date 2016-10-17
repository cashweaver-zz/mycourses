/**
 * @module theme
 */
const pugCompile = require('pug').compileFile;
const config = require('./../../config.js');

const activeThemePath = `./../../public/themes/${config.theme.activeTheme}`;

const themePaths = {
  course: require.resolve(`${activeThemePath}/course.pug`),
  courses: require.resolve(`${activeThemePath}/courses.pug`),
  index: require.resolve(`${activeThemePath}/index.pug`),
  notFound: require.resolve(`${activeThemePath}/404.pug`),
  section: require.resolve(`${activeThemePath}/section.pug`),
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
    course: pugCompile(themePaths.course),
    courses: pugCompile(themePaths.courses),
    index: pugCompile(themePaths.index),
    notFound: pugCompile(themePaths.notFound),
    section: pugCompile(themePaths.section),
  },
};

