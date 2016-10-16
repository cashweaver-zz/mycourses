const express = require('express');
const render = require('./theme').render;
const templates = require('./theme').templates;

const router = express.Router();

const handler = {
  renderRoot: (req, res) => {
      render(res, templates.index({
      pageTitle: 'Online Learning Platform',
    }));
  },
};

router.get('/', handler.renderRoot);

module.exports = { router, handler };
