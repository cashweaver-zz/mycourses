const express = require('express');

const router = express.Router();

const handler = {
  renderRoot: (req, res) => {
    res.send('hello!');
  },
};

router.get('/', handler.renderRoot);

module.exports = { router, handler };
