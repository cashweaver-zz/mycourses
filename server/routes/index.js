const admin = require('./admin');
const basic = require('./basic');
const course = require('./course');
const section = require('./section');
const user = require('./user');

module.exports = {
  routes: {
    admin: admin.router,
    basic: basic.router,
    course: course.router,
    section: section.router,
    user: user.router,
  },
  handlers: {
    admin: admin.handler,
    basic: basic.handler,
    course: course.handler,
    section: section.handler,
    user: user.handler,
  },
};
