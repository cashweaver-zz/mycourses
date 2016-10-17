const Course = require('./../db').Course;
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
  renderCourses: (req, res) => {
    Course.findAll()
      .then((courses) => {
        render(res, templates.courses({
          courses,
          pageTitle: 'Online Learning Platform',
        }));
      });
  },
};

router.get('/', handler.renderRoot);
router.get('/courses', handler.renderCourses);

module.exports = { router, handler };
