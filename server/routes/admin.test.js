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
const devUsers = [
  { fullName: 'Anne Apple', email: 'anneapple@example.com' },
  { fullName: 'Ben Brawn', email: 'benbrawn@example.com' },
];
const resetTableToDevData = (done) => {
  // Drop, and re-create, the database
  db.sequelize.sync({ force: true })
    .then(() => db.Course.bulkCreate(devCourses))
    .then(() => db.Section.bulkCreate(devSections))
    .then(() => db.User.bulkCreate(devUsers))
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

  describe('courses', () => {
    describe('manage', () => {
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

    describe('add', () => {
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

    describe('edit', () => {
      const editExistentCoursePath = new TestPath('/admin/courses/1/edit');
      const editNonExistentCoursePath = new TestPath('/admin/courses/999/edit');
      editExistentCoursePath.shouldHaveStatusCode('GET', 200);
      editExistentCoursePath.shouldHaveContentType('GET', 'text/html');
      editNonExistentCoursePath.shouldHaveStatusCode('GET', 404);
      editNonExistentCoursePath.shouldHaveContentType('GET', 'text/html');

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
  });

  describe('sections', () => {
    describe('manage', () => {
      const existentSectionManagementPath = new TestPath('/admin/courses/1/sections');
      const nonExistentSectionManagementPath = new TestPath('/admin/courses/999/sections');
      existentSectionManagementPath.shouldHaveStatusCode('GET', 200);
      existentSectionManagementPath.shouldHaveContentType('GET', 'text/html');
      nonExistentSectionManagementPath.shouldHaveStatusCode('GET', 404);
      nonExistentSectionManagementPath.shouldHaveContentType('GET', 'text/html');

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

        admin.handler.renderSections(req, res)
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

    describe('add', () => {
      const existentSectionManagementPath = new TestPath('/admin/courses/1/sections/add');
      const nonExistentSectionManagementPath = new TestPath('/admin/courses/999/sections/add');
      existentSectionManagementPath.shouldHaveStatusCode('GET', 200);
      existentSectionManagementPath.shouldHaveContentType('GET', 'text/html');
      nonExistentSectionManagementPath.shouldHaveStatusCode('GET', 404);
      nonExistentSectionManagementPath.shouldHaveContentType('GET', 'text/html');

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

        admin.handler.renderAddSection(req, res)
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

    describe('edit', () => {
      const existentSectionEditPath = new TestPath('/admin/sections/1/edit');
      const nonExistentSectionEditPath = new TestPath('/admin/sections/999/edit');
      existentSectionEditPath.shouldHaveStatusCode('GET', 200);
      existentSectionEditPath.shouldHaveContentType('GET', 'text/html');
      nonExistentSectionEditPath.shouldHaveStatusCode('GET', 404);
      nonExistentSectionEditPath.shouldHaveContentType('GET', 'text/html');

      /** @todo: update test to ensure custom render function is called */
      it('should respond with a rendered view', (done) => {
        const req = {
          params: {
            sectionId: 1,
          },
        };
        const res = {
          set: sinon.spy(),
          write: sinon.spy(),
          end: sinon.spy(),
        };

        admin.handler.renderEditSection(req, res)
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

  describe('users', () => {
    describe('manage', () => {
      const manageUsersPath = new TestPath('/admin/users');
      manageUsersPath.shouldHaveStatusCode('GET', 200);
      manageUsersPath.shouldHaveContentType('GET', 'text/html');

      /** @todo: update test to ensure custom render function is called */
      it('should respond with a rendered view', (done) => {
        const req = {};
        const res = {
          set: sinon.spy(),
          write: sinon.spy(),
          end: sinon.spy(),
        };

        admin.handler.renderUsers(req, res)
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

    describe('add', () => {
      const addUserPath = new TestPath('/admin/users/add');
      addUserPath.shouldHaveStatusCode('GET', 200);
      addUserPath.shouldHaveContentType('GET', 'text/html');

      /** @todo: update test to ensure custom render function is called */
      it('should respond with a rendered view', (done) => {
        const req = {};
        const res = {
          set: sinon.spy(),
          write: sinon.spy(),
          end: sinon.spy(),
        };

        admin.handler.renderAddUser(req, res)
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

    describe('edit', () => {
      const editExistentUserPath = new TestPath('/admin/users/1/edit');
      const editNonExistentUserPath = new TestPath('/admin/users/999/edit');
      editExistentUserPath.shouldHaveStatusCode('GET', 200);
      editExistentUserPath.shouldHaveContentType('GET', 'text/html');
      editNonExistentUserPath.shouldHaveStatusCode('GET', 404);
      editNonExistentUserPath.shouldHaveContentType('GET', 'text/html');

      /** @todo: update test to ensure custom render function is called */
      it('should respond with a rendered view', (done) => {
        const req = {
          params: {
            userId: 1,
          },
        };
        const res = {
          set: sinon.spy(),
          write: sinon.spy(),
          end: sinon.spy(),
        };

        admin.handler.renderEditUser(req, res)
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


});
