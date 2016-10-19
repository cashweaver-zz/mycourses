const db = require('../server/db');

/** @todo: write tests to handle empty course table */
const courses = [
  { name: 'Biology 101', body: '"Biology 101" is the first episode of the third season of Community. The episode originally aired on September 22, 2011 on NBC. The episode picks up where the second season left off, with Pierce out of the group. The study group resumes class at Greendale and decides to enroll in Biology.' },
  { name: 'Geography of Global Conflict', body: '"Geography of Global Conflict" is the second episode of third season of the American television series Community. It was originally broadcast on September 29, 2011 on NBC.' },
  { name: 'Remedial Chaos Theory', body: '"Remedial Chaos Theory" is the third (aired as fourth) episode of the third season of the U.S. television series Community. The episode was written by Chris McKenna and directed by Jeff Melman. It originally aired on October 13, 2011 on NBC. The episode features a housewarming party for Troy and Abed panning out in seven alternate timelines. Each timeline explored the effect of the absence/presence of a character on other characters in similar situations.' },
  { name: 'Competitive Ecology', body: '"Competitive Ecology" is the fourth (aired as third) episode of third season of the American television series Community. It was originally broadcast on October 6, 2011 on NBC.' },
  { name: 'Horror Fiction in Seven Spooky Steps', body: 'In the episode, Britta is led to believe that one member of the group is a psychopath and is determined to find out who it is. Though her plan was to gauge the reaction of the other characters after telling them a horror story, all the other characters end up telling stories of their own. Each story illustrates how each character views each other and themselves.' },
  { name: 'Advanced Gay', body: 'In the episode, Pierce decides to market Hawthorne Wipes to the gay community, only to be stopped by his homophobic father. This draws the ire of Jeff, who inadvertently exposes his own "daddy issues". Meanwhile, Troy is recruited by Greendale\'s secret air conditioning repair school.' },
  { name: 'Studies in Modern Movement', body: 'In the episode, the study group helps Annie move in with Troy and Abed. Annie is worried about living with Troy and Abed\'s "manchildren" antics. Meanwhile, Britta and Shirley lock horns over religion and morality, while Jeff is forced to spend the day with Dean Pelton.' },
  { name: 'Documentary Filmmaking: Redux', body: 'Ain\'t nobody got time for this.' },
  { name: 'Foosball and Nocturnal Vigilantism', body: 'Ain\'t nobody got time for this.' },
  { name: 'Regional Holiday Music', body: 'Ain\'t nobody got time for this.' },
  { name: 'Contemporary Impressionists', body: 'Ain\'t nobody got time for this.' },
  { name: 'Urban Matrimony and the Sandwich Arts', body: 'Ain\'t nobody got time for this.' },
  { name: 'Digital Exploration of Interior Design', body: 'Ain\'t nobody got time for this.' },
  { name: 'Pillows and Blankets', body: 'Ain\'t nobody got time for this.' },
  { name: 'Origins of Vampire Mythology', body: 'Ain\'t nobody got time for this.' },
  { name: 'Virtual Systems Analysis', body: 'Ain\'t nobody got time for this.' },
  { name: 'Basic Lupine Urology', body: 'Ain\'t nobody got time for this.' },
  { name: 'Course Listing Unavailable', body: 'Ain\'t nobody got time for this.' },
  { name: 'Curriculum Unavailable', body: 'Ain\'t nobody got time for this.' },
  { name: 'Digital Estate Planning', body: 'Ain\'t nobody got time for this.' },
  { name: 'The First Chang Dynasty', body: 'Ain\'t nobody got time for this.' },
  { name: 'Introduction to Finality', body: 'Ain\'t nobody got time for this.' },
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

