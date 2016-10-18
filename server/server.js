const bodyParser = require('body-parser');
const config = require('./../config');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const routes = require('./routes').routes;

const server = express();

if (/^(dev)$/.test(process.env.NODE_ENV)) {
  server.use(morgan('dev'));
}

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
server.use(bodyParser.json());
// HTML forms only support POST and GET actions
// A hidden field (named '_method') in the form is used to sidestep this
// limitation by leveraging methodOverride to, well, override the HTTP
// method of the request.
server.use(methodOverride('_method'));

server.use('/', routes.basic);
server.use('/admin', routes.admin);
server.use('/api/1/courses', routes.course);
server.use('/api/1/sections', routes.section);

module.exports = server.listen(config.server.port, () => {
  if (!/^(test)$/.test(process.env.NODE_ENV)) {
    console.log(`Server listening on ${config.server.port} in environment ${process.env.NODE_ENV}`);
  }
});
