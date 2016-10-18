const Course = require('./../db').Course;
const express = require('express');
const render = require('./theme').render;
// const Section = require('./../db').Section;
const templates = require('./theme').adminTemplates;

const router = express.Router();

const handler = {
  renderRoot: (req, res) => {
    render(res, templates.index({
      pageTitle: 'Online Learning Platform',
    }));
  },
  renderCourses: (req, res) => (
    Course.findAll({
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
    })
    .then((courses) => {
      // Course.describe()
        // .then((description) => {
          // const tableColumns = Object.keys(description).filter(key => (
            // !unwantedColumns.includes(key)
          // ));
          // render(res, templates.courses({
            // courses,
            // tableColumns,
            // pageTitle: 'Courses',
          // }));
        // });
      render(res, templates.courses({
        courses,
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

        if (typeof req.params === 'undefined' || typeof req.params.courseId === 'undefined') {
          res.status(404);
          return render(res, templates.notFound({
            pageTitle: '404 Not Found',
          }));
        }
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
};

router.get('/', handler.renderRoot);
router.get('/courses', handler.renderCourses);
router.get('/courses/add', handler.renderAddCourse);
router.get('/courses/:courseId/edit', handler.renderEditCourse);

module.exports = { router, handler };
