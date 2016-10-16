const basic = require('./basic');

module.exports = {
  routes: {
    basic: basic.router,
  },
  handlers: {
    basic: basic.handler,
  },
};
