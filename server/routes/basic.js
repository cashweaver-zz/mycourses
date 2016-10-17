const Course = require('./../db').Course;
const express = require('express');
const render = require('./theme').render;
const Section = require('./../db').Section;
const templates = require('./theme').templates;

const router = express.Router();

const handler = {
  renderRoot: (req, res) => {
    render(res, templates.index({
      pageTitle: 'Online Learning Platform',
    }));
  },
  renderCourses: (req, res) => (
    Course.findAll()
      .then((courses) => {
        render(res, templates.courses({
          courses,
          pageTitle: 'Courses',
        }));
      })
  ),
  renderCourse: (req, res) => (
    Course.findOne({
      where: {
        id: req.params.courseId,
      },
      include: Section,
    })
    .then((course) => {
      if (course !== null) {
        render(res, templates.course({
          course,
          pageTitle: course.get('name'),
        }));
      } else {
        res.status(404);
        render(res, templates.notFound({
          pageTitle: '404 Not Found',
        }));
      }
    })
  ),
  renderSection: (req, res) => {
    let section = null;
    return Section.findOne({
      where: {
        id: req.params.sectionId,
      },
    })
    .then((dbSection) => {
      section = dbSection;

      return Course.findOne({
        where: {
          id: req.params.courseId,
        },
      })
    })
    .then((course) => {
      if (section !== null) {
        render(res, templates.section({
          course,
          section,
          pageTitle: section.get('name'),
        }));
      } else {
        res.status(404);
        render(res, templates.notFound({
          pageTitle: '404 Not Found',
        }));
      }
    })
  },
};

router.get('/', handler.renderRoot);
router.get('/courses', handler.renderCourses);
router.get('/courses/:courseId', handler.renderCourse);
router.get('/courses/:courseId/sections/:sectionId', handler.renderSection);

module.exports = { router, handler };
