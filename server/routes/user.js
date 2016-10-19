const User = require('./../db').User;
const express = require('express');
const section = require('./section');
//const render = require('./theme').render;
//const templates = require('./theme').templates;

const router = express.Router();

const handler = {
  getAll: (req, res) => {
    User.findAll({
      attributes: ['fullName', 'email'],
    })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  },
  getOne: (req, res) => {
    User.findById(req.params.userId, {
      attributes: ['fullName', 'email'],
    })
    .then((user) => {
      if (user === null) {
        res.status(404).json({});
      } else {
        res.json(user);
      }
    });
  },
  addOne: (req, res) => {
    User.create(req.body)
      .then(() => {
        res.json({ success: true, message: 'User created' });
      })
      .catch((err) => {
        res.json({ success: false, message: err.message });
      });
  },
  updateOne: (req, res) => {
    User.update(req.body, {
      where: {
        id: req.params.userId,
      },
    })
    .then((tuple) => {
      const affectedCount = tuple[0];
      // const affectedRows = tuple[1];
      res.json({ success: !!affectedCount, message: 'User updated' });
    })
    .catch((err) => {
      res.json({ success: true, message: err.message });
    });
  },
  deleteOne: (req, res) => {
    User.destroy({
      where: {
        id: req.params.userId,
      },
    })
    .then((numDestroyedRows) => {
      res.json({ success: !!numDestroyedRows, message: 'User destroyed' });
    });
  },
};

router.get('/', handler.getAll);
router.post('/', handler.addOne);
router.get('/:userId', handler.getOne);
router.put('/:userId', handler.updateOne);
router.delete('/:userId', handler.deleteOne);
router.get('/:userId/sections', section.handler.getAll);
router.post('/:userId/sections', section.handler.addOne);

module.exports = { router, handler };
