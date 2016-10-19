/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
const basic = require('./basic');
const db = require('./../db');
const expect = require('chai').expect;
const sinon = require('sinon');
const TestPath = require('./testHelpers').TestPath;

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
  db.sequelize.sync({ force: true })
    .then(() => db.Course.bulkCreate(devCourses))
    .then(() => db.Section.bulkCreate(devSections))
    .then(() => done())
    .catch(err => done(err));
};

describe('basic', () => {
  before(done => resetTableToDevData(done));

  describe('/', () => {
    const rootPath = new TestPath('/');
    rootPath.shouldHaveStatusCode('GET', 200);
    rootPath.shouldHaveContentType('GET', 'text/html');

    /** @todo: update test to ensure custom render function is called */
    it('should respond with a rendered view', () => {
      const req = {};
      const res = {
        set: sinon.spy(),
        write: sinon.spy(),
        end: sinon.spy(),
      };
      basic.handler.renderRoot(req, res);
      expect(res.set.calledOnce).to.be.true;
      expect(res.write.calledOnce).to.be.true;
      expect(res.write.calledAfter(res.set)).to.be.true;
      expect(res.end.calledOnce).to.be.true;
      expect(res.end.calledAfter(res.write)).to.be.true;
    });
  });

  describe('/someNonExistentEntpoint', () => {
    const someNonExistentEntpoint = new TestPath('/someNonExistentEntpoint');
    someNonExistentEntpoint.shouldHaveStatusCode('GET', 404);
    someNonExistentEntpoint.shouldHaveContentType('GET', 'text/html');
  });

  describe('/login', () => {
    const rootPath = new TestPath('/login');
    rootPath.shouldHaveStatusCode('GET', 200);
    rootPath.shouldHaveContentType('GET', 'text/html');

    /** @todo: update test to ensure custom render function is called */
    it('should respond with a rendered view', () => {
      const req = {};
      const res = {
        set: sinon.spy(),
        write: sinon.spy(),
        end: sinon.spy(),
      };
      basic.handler.renderLogin(req, res);
      expect(res.set.calledOnce).to.be.true;
      expect(res.write.calledOnce).to.be.true;
      expect(res.write.calledAfter(res.set)).to.be.true;
      expect(res.end.calledOnce).to.be.true;
      expect(res.end.calledAfter(res.write)).to.be.true;
    });
  });

  describe('/courses', () => {
    const coursesPath = new TestPath('/courses');
    coursesPath.shouldHaveStatusCode('GET', 200);
    coursesPath.shouldHaveContentType('GET', 'text/html');

    /** @todo: update test to ensure custom render function is called */
    it('should respond with a rendered view', (done) => {
      const req = {};
      const res = {
        set: sinon.spy(),
        write: sinon.spy(),
        end: sinon.spy(),
      };

      basic.handler.renderCourses(req, res)
        .then(() => {
          expect(res.set.calledOnce).to.be.true;
          expect(res.write.calledOnce).to.be.true;
          expect(res.write.calledAfter(res.set)).to.be.true;
          expect(res.end.calledOnce).to.be.true;
          expect(res.end.calledAfter(res.write)).to.be.true;
          done();
        });
    });
  });

  describe('/courses/1', () => {
    const coursePath = new TestPath('/courses/1');
    const nonExistentCoursePath = new TestPath('/courses/999');
    coursePath.shouldHaveStatusCode('GET', 200);
    nonExistentCoursePath.shouldHaveStatusCode('GET', 404);
    coursePath.shouldHaveContentType('GET', 'text/html');
    nonExistentCoursePath.shouldHaveContentType('GET', 'text/html');

    /** @todo: update test to ensure custom render function is called */
    it('should respond with a rendered view', (done) => {
      const req = {
        params: {
          courseId: 1,
        },
      };
      const res = {
        set: sinon.spy(),
        write: sinon.spy(),
        end: sinon.spy(),
      };

      basic.handler.renderCourse(req, res)
        .then(() => {
          expect(res.set.calledOnce).to.be.true;
          expect(res.write.calledOnce).to.be.true;
          expect(res.write.calledAfter(res.set)).to.be.true;
          expect(res.end.calledOnce).to.be.true;
          expect(res.end.calledAfter(res.write)).to.be.true;
          done();
        });
    });
  });

  describe('/courses/1/sections/1', () => {
    const sectionPath = new TestPath('/courses/1/sections/1');
    const nonExistentSectionPath = new TestPath('/courses/1/sections/999');
    sectionPath.shouldHaveStatusCode('GET', 200);
    nonExistentSectionPath.shouldHaveStatusCode('GET', 404);
    sectionPath.shouldHaveContentType('GET', 'text/html');
    nonExistentSectionPath.shouldHaveContentType('GET', 'text/html');

    /** @todo: update test to ensure custom render function is called */
    it('should respond with a rendered view', (done) => {
      const req = {
        params: {
          courseId: 1,
        },
      };
      const res = {
        set: sinon.spy(),
        write: sinon.spy(),
        end: sinon.spy(),
      };

      basic.handler.renderCourse(req, res)
        .then(() => {
          expect(res.set.calledOnce).to.be.true;
          expect(res.write.calledOnce).to.be.true;
          expect(res.write.calledAfter(res.set)).to.be.true;
          expect(res.end.calledOnce).to.be.true;
          expect(res.end.calledAfter(res.write)).to.be.true;
          done();
        });
    });
  });
});
