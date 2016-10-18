/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
const admin = require('./admin');
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

describe('admin', () => {
  before(done => resetTableToDevData(done));

  describe('dashboard', () => {
    const rootPath = new TestPath('/admin');
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
      admin.handler.renderRoot(req, res);
      expect(res.set.calledOnce).to.be.true;
      expect(res.write.calledOnce).to.be.true;
      expect(res.write.calledAfter(res.set)).to.be.true;
      expect(res.end.calledOnce).to.be.true;
      expect(res.end.calledAfter(res.write)).to.be.true;
    });
  });

  describe('manage courses', () => {
    const manageCoursesPath = new TestPath('/admin/courses');
    manageCoursesPath.shouldHaveStatusCode('GET', 200);
    manageCoursesPath.shouldHaveContentType('GET', 'text/html');

    /** @todo: update test to ensure custom render function is called */
    it('should respond with a rendered view', (done) => {
      const req = {};
      const res = {
        set: sinon.spy(),
        write: sinon.spy(),
        end: sinon.spy(),
      };

      admin.handler.renderCourses(req, res)
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

  describe('add course', () => {
    const addCoursePath = new TestPath('/admin/courses/add');
    addCoursePath.shouldHaveStatusCode('GET', 200);
    addCoursePath.shouldHaveContentType('GET', 'text/html');

    /** @todo: update test to ensure custom render function is called */
    it('should respond with a rendered view', (done) => {
      const req = {};
      const res = {
        set: sinon.spy(),
        write: sinon.spy(),
        end: sinon.spy(),
      };

      admin.handler.renderAddCourse(req, res)
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

  describe('edit course', () => {
    const editExistentCoursePath = new TestPath('/admin/courses/1/edit');
    const editNonExistentCoursePath = new TestPath('/admin/courses/1/edit');
    editExistentCoursePath.shouldHaveStatusCode('GET', 200);
    editExistentCoursePath.shouldHaveContentType('GET', 'text/html');
    editNonExistentCoursePath.shouldHaveStatusCode('GET', 404);
    editNonExistentCoursePath.shouldHaveContentType('GET', 'text/html');

    /** @todo: update test to ensure custom render function is called */
    it('should respond with a rendered view', (done) => {
      const req = {};
      const res = {
        set: sinon.spy(),
        write: sinon.spy(),
        end: sinon.spy(),
      };

      admin.handler.renderEditCourse(req, res)
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


  describe('manage sections', () => {
  });
});
