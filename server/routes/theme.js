/**
 * @module theme
 */
const pugCompile = require('pug').compileFile;
const config = require('./../../config.js');

const activeThemePath = `./../../public/themes/${config.theme.activeTheme}`;
const publicThemePaths = {
  course: require.resolve(`${activeThemePath}/course.pug`),
  courses: require.resolve(`${activeThemePath}/courses.pug`),
  index: require.resolve(`${activeThemePath}/index.pug`),
  notFound: require.resolve(`${activeThemePath}/404.pug`),
  section: require.resolve(`${activeThemePath}/section.pug`),
};

const adminThemePath = './../../public/themes/admin';
const adminThemePaths = {
  addCourse: require.resolve(`${adminThemePath}/addCourse.pug`),
  addSection: require.resolve(`${adminThemePath}/addSection.pug`),
  editCourse: require.resolve(`${adminThemePath}/editCourse.pug`),
  editSection: require.resolve(`${adminThemePath}/editSection.pug`),
  courses: require.resolve(`${adminThemePath}/courses.pug`),
  index: require.resolve(`${adminThemePath}/index.pug`),
  notFound: require.resolve(`${adminThemePath}/404.pug`),
  sections: require.resolve(`${adminThemePath}/sections.pug`),
};

// ref: https://strongloop.com/strongblog/bypassing-express-view-rendering-for-speed-and-modularity/
const render = (res, template) => {
  res.set('Content-Type', 'text/html');
  res.write(template);
  res.end();
};

module.exports = {
  render,
  publicTemplates: {
    course: pugCompile(publicThemePaths.course),
    courses: pugCompile(publicThemePaths.courses),
    index: pugCompile(publicThemePaths.index),
    notFound: pugCompile(publicThemePaths.notFound),
    section: pugCompile(publicThemePaths.section),
  },
  adminTemplates: {
    addCourse: pugCompile(adminThemePaths.addCourse),
    addSection: pugCompile(adminThemePaths.addSection),
    courses: pugCompile(adminThemePaths.courses),
    editCourse: pugCompile(adminThemePaths.editCourse),
    editSection: pugCompile(adminThemePaths.editSection),
    index: pugCompile(adminThemePaths.index),
    notFound: pugCompile(adminThemePaths.notFound),
    sections: pugCompile(adminThemePaths.sections),
  },
};

