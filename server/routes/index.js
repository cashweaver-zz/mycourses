const admin = require('./admin');
const auth = require('./auth');
const basic = require('./basic');
const course = require('./course');
const section = require('./section');
const user = require('./user');

module.exports = {
  routes: {
    admin: admin.router,
    auth: auth.router,
    basic: basic.router,
    course: course.router,
    section: section.router,
    user: user.router,
  },
  handlers: {
    admin: admin.handler,
    auth: auth.handler,
    basic: basic.handler,
    course: course.handler,
    section: section.handler,
    user: user.handler,
  },
};
