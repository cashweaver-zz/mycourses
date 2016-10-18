const Course = require('./../db').Course;
const express = require('express');
const render = require('./theme').render;
const Section = require('./../db').Section;
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
        render(res, templates.sections({
          course,
          sections: course.sections,
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
};

router.get('/', handler.renderRoot);
// Courses
router.get('/courses', handler.renderCourses);
router.get('/courses/add', handler.renderAddCourse);
router.get('/courses/:courseId/edit', handler.renderEditCourse);
// Sections
router.get('/courses/:courseId/sections', handler.renderSections);
router.get('/courses/:courseId/sections/add', handler.renderAddSection);
router.get('/sections/:sectionId/edit', handler.renderEditSection);

module.exports = { router, handler };
