const basic = require('./basic');
const course = require('./course');

module.exports = {
  routes: {
    basic: basic.router,
    course: course.router,
  },
  handlers: {
    basic: basic.handler,
    course: course.router,
  },
};
