const Course = require('./../db').Course;
const express = require('express');
const render = require('./theme').render;
const Section = require('./../db').Section;
const templates = require('./theme').publicTemplates;
const User = require('./../db').User;

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
          pageTitle: course.name,
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
      });
    })
    .then((course) => {
      if (section !== null) {
        render(res, templates.section({
          course,
          section,
          pageTitle: section.name,
        }));
      } else {
        res.status(404);
        render(res, templates.notFound({
          pageTitle: '404 Not Found',
        }));
      }
    });
  },

  renderUsers: (req, res) => (
    User.findAll()
      .then((users) => {
        render(res, templates.users({
          users,
          pageTitle: 'Users',
        }));
      })
  ),
  renderUser: (req, res) => (
    User.findOne({
      where: {
        id: req.params.userId,
      },
    })
    .then((user) => {
      if (user !== null) {
        render(res, templates.user({
          user,
          pageTitle: user.name,
        }));
      } else {
        res.status(404);
        render(res, templates.notFound({
          pageTitle: '404 Not Found',
        }));
      }
    })
  ),


};

router.get('/', handler.renderRoot);
// Course
router.get('/courses', handler.renderCourses);
router.get('/courses/:courseId', handler.renderCourse);
// Section
router.get('/courses/:courseId/sections/:sectionId', handler.renderSection);
// User
router.get('/users/:userId', handler.renderUser);

module.exports = { router, handler };
