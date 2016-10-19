const Course = require('./../db').Course;
const express = require('express');
const section = require('./section');
//const render = require('./theme').render;
//const templates = require('./theme').templates;

const router = express.Router();

const handler = {
  getAll: (req, res) => {
    Course.findAll({
      attributes: ['name', 'body'],
    })
    .then((courses) => {
      res.json(courses);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  },
  getOne: (req, res) => {
    Course.findById(req.params.courseId, {
      attributes: ['name', 'body'],
    })
    .then((course) => {
      if (course === null) {
        res.status(404).json({});
      } else {
        res.json(course);
      }
    });
  },
  addOne: (req, res) => {
    Course.create(req.body)
      .then(() => {
        res.json({ success: true, message: 'Course created' });
      })
      .catch((err) => {
        res.json({ success: false, message: err.message });
      });
  },
  updateOne: (req, res) => {
    Course.update(req.body, {
      where: {
        id: req.params.courseId,
      },
    })
    .then((tuple) => {
      const affectedCount = tuple[0];
      // const affectedRows = tuple[1];
      res.json({ success: !!affectedCount, message: 'Course updated' });
    })
    .catch((err) => {
      res.json({ success: true, message: err.message });
    });
  },
  deleteOne: (req, res) => {
    Course.destroy({
      where: {
        id: req.params.courseId,
      },
    })
    .then((numDestroyedRows) => {
      res.json({ success: !!numDestroyedRows, message: 'Course destroyed' });
    });
  },
};

router.get('/', handler.getAll);
router.post('/', handler.addOne);
router.get('/:courseId', handler.getOne);
router.put('/:courseId', handler.updateOne);
router.delete('/:courseId', handler.deleteOne);
router.get('/:courseId/sections', section.handler.getAll);
router.post('/:courseId/sections', section.handler.addOne);

module.exports = { router, handler };
