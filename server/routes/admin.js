const Course = require('./../db').Course;
const express = require('express');
const moment = require('moment');
const render = require('./theme').render;
const Section = require('./../db').Section;
const templates = require('./theme').adminTemplates;
const User = require('./../db').User;

const router = express.Router();
const handler = {
  renderRoot: (req, res) => {
    render(res, templates.index({
      pageTitle: 'MyCourses',
    }));
  },

  renderCourses: (req, res) => (
    Course.findAll({
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
    })
    .then((courses) => {
      const formattedCourses = courses.map(course => (
        Object.assign({}, course.dataValues, {
          createdAt: moment(course.createdAt).format('MMMM Do YYYY, HH:mm:ss'),
          updatedAt: moment(course.updatedAt).format('MMMM Do YYYY, HH:mm:ss'),
        })
      ));
      render(res, templates.courses({
        courses: formattedCourses,
        pageTitle: 'Courses',
      }));
    })
  ),
  renderAddCourse: (req, res) => (
    Course.describe()
      .then((description) => {
        const unwantedFields = ['id', 'createdAt', 'updatedAt'];
        unwantedFields.forEach((unwantedField) => {
          delete description[unwantedField];
        });
        render(res, templates.addCourse({
          fields: description,
          pageTitle: 'Add Course',
        }));
      })
  ),
  renderEditCourse: (req, res) => {
    let courseDescription = null;

    return Course.describe()
      .then((description) => {
        courseDescription = description;

        return Course.findById(req.params.courseId);
      })
      .then((course) => {
        if (course === null) {
          res.status(404);
          render(res, templates.notFound({
            pageTitle: '404 Not Found',
          }));
        } else {
          const unwantedFields = ['id', 'createdAt', 'updatedAt'];
          unwantedFields.forEach((unwantedField) => {
            delete courseDescription[unwantedField];
          });
          render(res, templates.editCourse({
            course,
            fields: courseDescription,
            pageTitle: 'Edit Course',
          }));
        }
      });
  },

  renderSections: (req, res) => (
    Course.findById(req.params.courseId, {
      include: {
        attributes: ['id', 'name', 'createdAt', 'updatedAt'],
        model: Section,
      },
    })
    .then((course) => {
      if (course === null) {
        res.status(404);
        render(res, templates.notFound({
          pageTitle: '404 Not Found',
        }));
      } else {
        const formattedSections = course.sections.map(section => (
          Object.assign({}, section.dataValues, {
            createdAt: moment(section.createdAt).format('MMMM Do YYYY, HH:mm:ss'),
            updatedAt: moment(section.updatedAt).format('MMMM Do YYYY, HH:mm:ss'),
          })
        ));
        render(res, templates.sections({
          course,
          sections: formattedSections,
          pageTitle: 'Sections',
        }));
      }
    })
  ),
  renderAddSection: (req, res) => (
    Course.findById(req.params.courseId)
    .then((course) => {
      if (course === null) {
        throw new Error('Course not found');
      }
      return course;
    })
    .then(() => Section.describe())
    .then((description) => {
      const unwantedFields = ['id', 'courseId', 'createdAt', 'updatedAt'];
      unwantedFields.forEach((unwantedField) => {
        delete description[unwantedField];
      });
      render(res, templates.addSection({
        courseId: req.params.courseId,
        fields: description,
        pageTitle: 'Add Section',
      }));
    })
    .catch(() => {
      res.status(404);
      render(res, templates.notFound({
        pageTitle: '404 Not Found',
      }));
    })
  ),
  renderEditSection: (req, res) => {
    let sectionDescription = null;

    return Section.describe()
      .then((description) => {
        sectionDescription = description;

        return Section.findById(req.params.sectionId);
      })
      .then((section) => {
        if (section === null) {
          res.status(404);
          render(res, templates.notFound({
            pageTitle: '404 Not Found',
          }));
        } else {
          const unwantedFields = ['id', 'createdAt', 'updatedAt'];
          unwantedFields.forEach((unwantedField) => {
            delete sectionDescription[unwantedField];
          });
          render(res, templates.editSection({
            section,
            fields: sectionDescription,
            pageTitle: 'Edit Section',
          }));
        }
      });
  },

  renderUsers: (req, res) => (
    User.findAll({
      attributes: ['id', 'fullName', 'email', 'createdAt', 'updatedAt'],
    })
    .then((users) => {
      const formattedUsers = users.map(user => (
        Object.assign({}, user.dataValues, {
          createdAt: moment(user.createdAt).format('MMMM Do YYYY, HH:mm:ss'),
          updatedAt: moment(user.updatedAt).format('MMMM Do YYYY, HH:mm:ss'),
        })
      ));
      render(res, templates.users({
        users: formattedUsers,
        pageTitle: 'Users',
      }));
    })
  ),
  renderAddUser: (req, res) => (
    User.describe()
      .then((description) => {
        const unwantedFields = ['id', 'createdAt', 'updatedAt'];
        unwantedFields.forEach((unwantedField) => {
          delete description[unwantedField];
        });
        render(res, templates.addUser({
          fields: description,
          pageTitle: 'Add User',
        }));
      })
  ),
  renderEditUser: (req, res) => {
    let userDescription = null;

    return User.describe()
      .then((description) => {
        userDescription = description;
        console.log('userDescription', description);

        return User.findById(req.params.userId);
      })
      .then((user) => {
        if (user === null) {
          res.status(404);
          render(res, templates.notFound({
            pageTitle: '404 Not Found',
          }));
        } else {
          const unwantedFields = ['id', 'createdAt', 'updatedAt'];
          unwantedFields.forEach((unwantedField) => {
            delete userDescription[unwantedField];
          });
          render(res, templates.editUser({
            user,
            fields: userDescription,
            pageTitle: 'Edit User',
          }));
        }
      });
  },
};

router.get('/', handler.renderRoot);
// Course
router.get('/courses', handler.renderCourses);
router.get('/courses/add', handler.renderAddCourse);
router.get('/courses/:courseId/edit', handler.renderEditCourse);
// Section
router.get('/courses/:courseId/sections', handler.renderSections);
router.get('/courses/:courseId/sections/add', handler.renderAddSection);
router.get('/sections/:sectionId/edit', handler.renderEditSection);
// User
router.get('/users', handler.renderUsers);
router.get('/users/add', handler.renderAddUser);
router.get('/users/:userId/edit', handler.renderEditUser);

module.exports = { router, handler };
