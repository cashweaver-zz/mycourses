/* eslint-disable no-unused-expressions */
// const course = require('./course');
const Course = require('./../db').Course;
const expect = require('chai').expect;
// const sinon = require('sinon');
const TestPath = require('./testHelpers').TestPath;
const request = require('supertest');

const app = request('http://localhost:3001');

const devCourses = [
  { name: 'My First Course', body: 'It is going to be great!' },
  { name: 'My Second Course', body: 'It is going to be great, again!' },
];

const resetTableToDevData = (done) => {
  // Drop, and re-create, the database
  Course.sync({ force: true })
    .then(() => {
      Course.bulkCreate(devCourses)
        .then(() => {
          done();
        });
    })
    .catch((err) => {
      done(err);
    });
};

const resetTable = (done) => {
  // Drop, and re-create, the database
  Course.sync({ force: true })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
};

const rootPath = new TestPath('/courses');
const existentCoursePath = new TestPath('/courses/1');
const nonExistentCoursePath = new TestPath('/courses/3');

describe('course', () => {
  describe('GET', () => {
    before(done => resetTableToDevData(done));

    describe('all', () => {
      rootPath.shouldHaveStatusCode('GET', 200);
      rootPath.shouldHaveContentType('GET', 'application/json');

      it('should get all courses', (done) => {
        app
          .get('/courses')
          .expect(JSON.stringify(devCourses), done);
      });
    });

    describe('one', () => {
      beforeEach(done => resetTableToDevData(done));

      existentCoursePath.shouldHaveStatusCode('GET', 200);
      existentCoursePath.shouldHaveContentType('GET', 'application/json');

      it('should get a single course', (done) => {
        app
          .get('/courses/1')
          .expect(JSON.stringify(devCourses[0]), done);
      });

      nonExistentCoursePath.shouldHaveStatusCode('GET', 404);
      nonExistentCoursePath.shouldHaveContentType('GET', 'application/json');

      it('should only retrieve courses which exist', (done) => {
        app
          .get('/courses/3')
          .expect(JSON.stringify({}), done);
      });
    });
  });

  describe('POST', () => {
    beforeEach(done => resetTable(done));

    rootPath.shouldHaveStatusCode('POST', 200);
    rootPath.shouldHaveContentType('POST', 'application/json');

    it('should create new course', (done) => {
      const course = { name: 'My First Course', body: 'It is going to be great!' };

      app.post('/courses')
        .send(course)
        .end((err) => {
          if (err) {
            console.error(err);
          }

          Course.findOne({
            where: {
              name: course.name,
            },
            attributes: ['name', 'body'],
          })
          .then((dbCourse) => {
            expect(dbCourse.dataValues).to.deep.equal(course);
            done();
          });
        });
    });

    it('should respond with success after creating new course', (done) => {
      const course = { name: 'My First Course', body: 'It is going to be great!' };

      app.post('/courses')
        .send(course)
        .end((err, res) => {
          expect(res.body.success).to.be.true;
          done();
        });
    });

    it('should not create new course if given bad data', (done) => {
      const course = { thisFieldDoesNotExist: 'My First Course' };

      app.post('/courses')
        .send(course)
        .end((err) => {
          if (err) {
            console.error(err);
          }

          Course.findOne({
            where: {
              name: course.name,
            },
            attributes: ['name', 'body'],
          })
          .then((dbCourse) => {
            expect(dbCourse).to.equal(null);
            done();
          });
        });
    });

    it('should respond with failure after failing to create new course', (done) => {
      const course = { thisFieldDoesNotExist: 'My First Course' };

      app.post('/courses')
        .send(course)
        .end((err, res) => {
          expect(res.body.success).to.be.false;
          done();
        });
    });
  });

  describe('PUT', () => {
    beforeEach(done => resetTable(done));

    existentCoursePath.shouldHaveStatusCode('PUT', 200);
    existentCoursePath.shouldHaveContentType('PUT', 'application/json');

    it('should update an existing course', (done) => {
      const course = { name: 'My First Course', body: 'It is going to be great!' };
      const editedCourse = { name: 'My First Course (edited)', body: 'It is going to be great!' };

      Course.create(course)
        .then(() => {
          app.put('/courses/1')
            .send(editedCourse)
            .end(() => {
              Course.findById(1, {
                attributes: ['name', 'body'],
              })
              .then((dbCourse) => {
                expect(dbCourse.dataValues).to.deep.equal(editedCourse);
                done();
              });
            });
        });
    });

    it('should respond with success after successfully updating a course', (done) => {
      const course = { name: 'My First Course', body: 'It is going to be great!' };
      const editedCourse = { name: 'My First Course (edited)', body: 'It is going to be great!' };

      Course.create(course)
        .then(() => {
          app.put('/courses/1')
            .send(editedCourse)
            .end((err, res) => {
              expect(res.body.success).to.be.true;
              done();
            });
        });
    });

    it('should respond with failure after failing to update a course', (done) => {
      const course = { name: 'My First Course', body: 'It is going to be great!' };
      const editedCourse = { name: 'My First Course (edited)', body: 'It is going to be great!' };

      Course.create(course)
        .then(() => {
          app.put('/courses/3')
            .send(editedCourse)
            .end((err, res) => {
              expect(res.body.success).to.be.false;
              done();
            });
        });
    });
  });

  describe('DELETE', () => {
    beforeEach(done => resetTableToDevData(done));

    existentCoursePath.shouldHaveStatusCode('DELETE', 200);
    existentCoursePath.shouldHaveContentType('DELETE', 'application/json');

    it('should delete an existing course', (done) => {
      app.delete('/courses/1')
        .end(() => {
          Course.findById(1)
            .then((course) => {
              expect(course).to.be.null;
              done();
            });
        });
    });

    it('should respond with success after deleting new course', (done) => {
      app.delete('/courses/1')
        .end((err, res) => {
          expect(res.body.success).to.be.true;
          done();
        });
    });

    it('should respond with failure after failing to delete new course', (done) => {
      app.delete('/courses/3')
        .end((err, res) => {
          expect(res.body.success).to.be.false;
          done();
        });
    });
  });
});
