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
      //Course.describe()
        //.then((description) => {
          //const tableColumns = Object.keys(description).filter(key => (
            //!unwantedColumns.includes(key)
          //));
          //render(res, templates.courses({
            //courses,
            //tableColumns,
            //pageTitle: 'Courses',
          //}));
        //});
      render(res, templates.courses({
        courses,
        pageTitle: 'Courses',
      }));
    })
  ),
};

router.get('/', handler.renderRoot);
router.get('/courses', handler.renderCourses);

module.exports = { router, handler };
