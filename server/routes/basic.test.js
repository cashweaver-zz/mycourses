/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
const basic = require('./basic');
const expect = require('chai').expect;
const sinon = require('sinon');
const TestPath = require('./testHelpers').TestPath;

describe('basic', () => {
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

  describe('/courses', () => {
    const coursesPath = new TestPath('/courses');
    coursesPath.shouldHaveStatusCode('GET', 200);
    coursesPath.shouldHaveContentType('GET', 'text/html');

    /** @todo: update test to ensure custom render function is called */
    it('should respond with a rendered view', () => {
      const req = {};
      const res = {
        set: sinon.spy(),
        write: sinon.spy(),
        end: sinon.spy(),
      };

      basic.handler.renderCourses(req, res);
      expect(res.set.calledOnce).to.be.true;
      expect(res.write.calledOnce).to.be.true;
      expect(res.write.calledAfter(res.set)).to.be.true;
      expect(res.end.calledOnce).to.be.true;
      expect(res.end.calledAfter(res.write)).to.be.true;
    });
  });
});
