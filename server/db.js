const Sequelize = require('sequelize');

const sqlitePath = (process.env.NODE_ENV === 'test') ? '/vagrant/db/test-database.sqlite' : '/vagrant/db/database.sqlite';

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: (process.env.NODE_ENV === 'test') ? false : console.log,
  storage: sqlitePath,
});

const Course = sequelize.define('course', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
  },
});

sequelize.sync();

module.exports = {
  sequelize,
  Course,
};
