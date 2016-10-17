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

const Section = sequelize.define('section', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
  },
});

Section.belongsTo(Course);
Course.hasMany(Section);

sequelize.sync();

module.exports = {
  Course,
  Section,
  sequelize,
};
