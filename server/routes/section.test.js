/* eslint-disable no-unused-expressions */
// const course = require('./course');
const Course = require('./../db').Course;
const expect = require('chai').expect;
// const sinon = require('sinon');
const request = require('supertest');
const Section = require('./../db').Section;
const sequelize = require('./../db').sequelize;
const TestPath = require('./testHelpers').TestPath;

const app = request('http://localhost:3001/api/1');

const devCourses = [
  { name: 'My First Course', body: 'It is going to be great!' },
  { name: 'My Second Course', body: 'It is going to be great!' },
  { name: 'My Third Course', body: 'It is going to be great!' },
];
const devSections = [
  { name: 'My First Section', body: 'It is going to be great!', courseId: 1 },
  { name: 'My Second Section', body: 'It is going to be great, again!', courseId: 1 },
  { name: 'My Third Section', body: 'It is going to be great, again!', courseId: 2 },
];

const resetTableToDevData = (done) => {
  // Drop, and re-create, the database
  sequelize.sync({ force: true })
    .then(() => Course.bulkCreate(devCourses))
    .then(() => Section.bulkCreate(devSections))
    .then(() => done())
    .catch(err => done(err));
};

const rootPath = new TestPath('/api/1/courses/1/sections');
const existentSectionPath = new TestPath('/api/1/sections/1');
const nonExistentSectionPath = new TestPath('/api/1/sections/999');

describe('section', () => {
  describe('GET', () => {
    before(done => resetTableToDevData(done));

    describe('all', () => {
      rootPath.shouldHaveStatusCode('GET', 200);
      rootPath.shouldHaveContentType('GET', 'application/json');

      it('should get all sections', (done) => {
        Section.findAll()
          .then((sections) => {
            app
              .get('/sections')
              .expect(JSON.stringify(sections.map(section => section.dataValues)), done);
          });
      });

      it('should get all sections of a course', (done) => {
        const courseId = 1;
        Section.findAll({
          where: {
            courseId,
          },
        })
        .then((sections) => {
          app
            .get(`/courses/${courseId}/sections`)
            .expect(JSON.stringify(sections.map(section => section.dataValues)), done);
        });
      });

      it('should get all sections of a different course', (done) => {
        const courseId = 2;
        Section.findAll({
          where: {
            courseId,
          },
        })
        .then((sections) => {
          app
            .get(`/courses/${courseId}/sections`)
            .expect(JSON.stringify(sections.map(section => section.dataValues)), done);
        });
      });

      it('should get all sections of a nonexistent course', (done) => {
        const courseId = 3;
        Section.findAll({
          where: {
            courseId,
          },
        })
        .then(() => {
          app
            .get(`/courses/${courseId}/sections`)
            .expect(JSON.stringify([]), done);
        });
      });
    });

    describe('one', () => {
      existentSectionPath.shouldHaveStatusCode('GET', 200);
      nonExistentSectionPath.shouldHaveStatusCode('GET', 404);

      existentSectionPath.shouldHaveContentType('GET', 'application/json');

      it('should get the specified section', (done) => {
        const sectionId = 2;
        Section.findById(sectionId)
          .then((section) => {
            app
              .get(`/sections/${sectionId}`)
              .expect(JSON.stringify(section.dataValues), done);
          });
      });

      it('should get a different specified section', (done) => {
        const sectionId = 2;
        Section.findById(sectionId)
          .then((section) => {
            app
              .get(`/sections/${sectionId}`)
              .expect(JSON.stringify(section.dataValues), done);
          });
      });

      it('should gracefully respond to requests for nonexistent sections', (done) => {
        const sectionId = 4;
        app
          .get(`/sections/${sectionId}`)
          .expect(JSON.stringify({}), done);
      });
    });
  });

  describe('POST', () => {
    before(done => resetTableToDevData(done));

    const section = {
      name: 'A new Section',
      body: 'asdf',
    };
    const badSection = {
      // Missing name
      body: 'A bad section',
    };
    const goodResponse = { success: true };
    const badResponse = { success: false };

    rootPath.shouldHaveStatusCode('POST', 200, section);
    rootPath.shouldHaveResponseBody('POST', goodResponse, section);
    rootPath.shouldHaveStatusCode('POST', 500, badSection);
    rootPath.shouldHaveResponseBody('POST', badResponse, badSection);
    rootPath.shouldHaveContentType('POST', 'application/json', section);

    it('should add a section', (done) => {
      app.post('/sections')
        .send(section)
        .end(() => {
          Section.findOne({
            where: {
              name: section.name,
            },
            attributes: ['name', 'body'],
          })
          .then((dbSection) => {
            expect(dbSection.dataValues).to.deep.equal(section);
            done();
          });
        });
    });

    it('should respond with success after creating new section', (done) => {
      app.post('/sections')
        .send(section)
        .end((err, res) => {
          expect(res.body.success).to.be.true;
          done();
        });
    });

    it('should not add a section if given bad data', (done) => {
      app.post('/sections')
        .send(section)
        .end(() => {
          Section.findOne({
            where: {
              body: badSection.body,
            },
            attributes: ['name', 'body'],
          })
          .then((dbSection) => {
            expect(dbSection).to.equal(null);
            done();
          });
        });
    });

    it('should respond with failure after failing to create new section', (done) => {
      app.post('/sections')
        .send(badSection)
        .end((err, res) => {
          expect(res.body.success).to.be.false;
          done();
        });
    });


    it('should add a section to the specified course', (done) => {
      app.post('/courses/1/sections')
        .send(section)
        .end(() => {
          Section.findOne({
            where: {
              courseId: 1,
              name: section.name,
            },
            attributes: ['name', 'body'],
          })
          .then((dbSection) => {
            expect(dbSection.dataValues).to.deep.equal(section);
            done();
          });
        });
    });

    it('should respond with success after creating new section in the specified course', (done) => {
      app.post('/courses/1/sections')
        .send(section)
        .end((err, res) => {
          expect(res.body.success).to.be.true;
          done();
        });
    });

    it('should not add a section to the specified course if given bad data', (done) => {
      app.post('/courses/1/sections')
        .send(section)
        .end(() => {
          Section.findOne({
            where: {
              body: badSection.body,
            },
            attributes: ['name', 'body'],
          })
          .then((dbSection) => {
            expect(dbSection).to.equal(null);
            done();
          });
        });
    });

    it('should respond with failure after failing to create new section in the specified course', (done) => {
      app.post('/courses/1/sections')
        .send(badSection)
        .end((err, res) => {
          expect(res.body.success).to.be.false;
          done();
        });
    });
  });

  describe('PUT', () => {
    beforeEach(done => resetTableToDevData(done));

    const goodEditedSection = { name: 'My First Section (edited)', body: 'It is going to be great!' };
    const goodResponse = { success: true };
    const badEditedSection = { name: null, body: 'It is going to be great!' };
    const badResponse = { success: false };

    existentSectionPath.shouldHaveStatusCode('PUT', 200, goodEditedSection);
    existentSectionPath.shouldHaveResponseBody('PUT', goodResponse, goodEditedSection);
    existentSectionPath.shouldHaveStatusCode('PUT', 500, badEditedSection);
    existentSectionPath.shouldHaveResponseBody('PUT', badResponse, badEditedSection);
    existentSectionPath.shouldHaveContentType('PUT', 'application/json', goodEditedSection);

    it('should update an existing section', (done) => {
      app.put('/sections/1')
        .send(goodEditedSection)
        .end(() => {
          Section.findById(1)
            .then((dbSection) => {
              expect(dbSection.dataValues.name).to.equal(goodEditedSection.name);
              done();
            });
        });
    });
  });

  describe('DELETE', () => {
    beforeEach(done => resetTableToDevData(done));

    const goodResponse = { success: true };
    const badResponse = { success: false };

    existentSectionPath.shouldHaveStatusCode('DELETE', 200);
    existentSectionPath.shouldHaveResponseBody('DELETE', goodResponse);

    nonExistentSectionPath.shouldHaveStatusCode('DELETE', 404);
    nonExistentSectionPath.shouldHaveResponseBody('DELETE', badResponse);

    existentSectionPath.shouldHaveContentType('DELETE', 'application/json');

    it('should delete an existing section', (done) => {
      app.delete('/sections/1')
        .end(() => {
          Section.findById(1)
            .then((dbSection) => {
              expect(dbSection).to.be.null;
              done();
            });
        });
    });

    it('should remove the deleted section from its course', (done) => {
      Section.findById(1)
        .then(section => section.get('courseId'))
        .then((courseId) => {
          app.delete('/sections/1')
            .end(() => {
              Course.findById(courseId, {
                include: [
                  { model: Section },
                ],
              })
              .then((course) => {
                expect(course.get('sections').length).to.equal(1);
                done();
              });
            });
        });
    });
  });
});
