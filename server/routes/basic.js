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
      pageTitle: 'MyCourses',
      curUser: req.user,
    }));
  },
  renderLogin: (req, res) => {
    console.log(req.session);
    render(res, templates.login({
      req,
      pageTitle: 'Log In',
      curUser: req.user,
    }));
  },

  renderCourses: (req, res) => (
    Course.findAll()
      .then((courses) => {
        render(res, templates.courses({
          courses,
          pageTitle: 'Courses',
          curUser: req.user,
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
          curUser: req.user,
        }));
      } else {
        res.status(404);
        render(res, templates.notFound({
          pageTitle: '404 Not Found',
          curUser: req.user,
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
          curUser: req.user,
        }));
      } else {
        res.status(404);
        render(res, templates.notFound({
          pageTitle: '404 Not Found',
          curUser: req.user,
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
          curUser: req.user,
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
          curUser: req.user,
        }));
      } else {
        res.status(404);
        render(res, templates.notFound({
          pageTitle: '404 Not Found',
          curUser: req.user,
        }));
      }
    })
  ),
};

const ensureAuthenticated = (req, res, next) => (
  (req.isAuthenticated()) ? next() : res.redirect('/login')
);

router.get('/', handler.renderRoot);
router.get('/login', handler.renderLogin);
// Course
router.get('/courses', handler.renderCourses);
router.get('/courses/:courseId', ensureAuthenticated, handler.renderCourse);
// Section
router.get('/courses/:courseId/sections/:sectionId', ensureAuthenticated, handler.renderSection);
// User
router.get('/users/:userId', handler.renderUser);

module.exports = { router, handler };
