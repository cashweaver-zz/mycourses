const express = require('express');
const morgan = require('morgan');
const routes = require('./routes').routes;

const server = express();

if (!/^(prod|production)$/.test(process.env.NODE_ENV)) {
  server.use(morgan('dev'));
}

server.use('/', routes.basic);

// TODO: change port to config variable
module.exports = server.listen(3000, () => {
  if (!/^(prod|production)$/.test(process.env.NODE_ENV)) {
    console.log('Server listening on 3000');
  }
});
