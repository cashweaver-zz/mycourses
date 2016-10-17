const basic = require('./basic');
const course = require('./course');
const section = require('./section');

module.exports = {
  routes: {
    basic: basic.router,
    course: course.router,
    section: section.router,
  },
  handlers: {
    basic: basic.handler,
    course: course.handler,
    section: section.handler,
  },
};
