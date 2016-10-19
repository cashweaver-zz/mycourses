const Section = require('./../db').Section;
const express = require('express');
//const render = require('./theme').render;
//const templates = require('./theme').templates;

// ref: http://stackoverflow.com/a/25305272
const router = express.Router({ mergeParams: true });

  /*
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
*/

const handler = {
  getAll: (req, res) => {
    if (req.params.courseId) {
      Section.findAll({
        where: {
          courseId: req.params.courseId,
        },
      })
      .then((sections) => {
        res.json(sections);
      });
    } else {
      Section.findAll()
        .then((sections) => {
          res.json(sections);
        });
    }
  },
  getOne: (req, res) => {
    Section.findById(req.params.sectionId)
      .then((section) => {
        if (section === null) {
          res.status(404).json({});
        } else {
          res.json(section);
        }
      });
  },
  addOne: (req, res) => {
    Section.create(Object.assign({ courseId: req.params.courseId }, req.body))
      .then(() => {
        res.json({ success: true });
      })
      .catch(() => {
        res.status(500).json({ success: false });
      });
  },
  updateOne: (req, res) => {
    Section.update(req.body, {
      where: {
        id: req.params.sectionId,
      },
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch(() => {
      res.status(500).json({ success: false });
    });
  },
  deleteOne: (req, res) => {
    Section.destroy({
      where: {
        id: req.params.sectionId,
      },
    })
    .then((numDestroyedRows) => {
      if (numDestroyedRows === 0) {
        res.status(404).json({ success: false });
      } else {
        res.json({ success: true });
      }
    });
  },
};

router.get('/', handler.getAll);
router.post('/', handler.addOne);
router.get('/:sectionId', handler.getOne);
router.put('/:sectionId', handler.updateOne);
router.delete('/:sectionId', handler.deleteOne);

module.exports = { router, handler };
