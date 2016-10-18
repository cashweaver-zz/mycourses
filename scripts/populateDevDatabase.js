const db = require('../server/db');

/** @todo: write tests to handle empty course table */
const courses = [
  { name: 'Remedial Chaos Theory', body: '"Remedial Chaos Theory" is the third (aired as fourth) episode of the third season of the U.S. television series Community. The episode was written by Chris McKenna and directed by Jeff Melman. It originally aired on October 13, 2011 on NBC. The episode features a housewarming party for Troy and Abed panning out in seven alternate timelines. Each timeline explored the effect of the absence/presence of a character on other characters in similar situations.' },
  { name: 'Horror Fiction in Seven Spooky Steps', body: 'In the episode, Britta is led to believe that one member of the group is a psychopath and is determined to find out who it is. Though her plan was to gauge the reaction of the other characters after telling them a horror story, all the other characters end up telling stories of their own. Each story illustrates how each character views each other and themselves.' },
];

/** @todo: write tests to handle empty section table */
const sections = [];
courses.forEach((course, courseId) => {
  for (let i = 1; i <= 5; i += 1) {
    sections.push({
      courseId: courseId + 1,
      name: `Section ${i}`,
      body: 'A very good section. Seriously.',
    });
  }
});

/** @todo: write tests to handle empty user table */
const users = [
  { fullName: 'Anne Apple', email: 'anneapple@example.com' },
  { fullName: 'Ben Brawn', email: 'benbrawn@example.com' },
];

const opts = {
  logging: false,
};

// Empty the database
db.sequelize.sync({ force: true })
  .then(() => db.Course.bulkCreate(courses, opts))
  .then(() => db.Section.bulkCreate(sections, opts))
  .then(() => db.User.bulkCreate(users, opts))
  .then(() => console.log('Done.'));

