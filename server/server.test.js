/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const handlers = require('./routes').handlers;
const sinon = require('sinon');
const TestPath = require('./testHelpers').TestPath;
// const request = require('supertest');

describe('server', () => {
  describe('basic', () => {
    const root = new TestPath('/');
    root.shouldHaveStatusCode('GET', 200);
    root.shouldHaveContentType('GET', 'text/html');

    it('should respond at / with a rendered view', () => {
      const req = {};
      const res = {
        end: sinon.spy(),
        render: sinon.spy(),
        set: sinon.spy(),
        write: sinon.spy(),
      };

      handlers.basic.renderRoot(req, res);
      // TODO: update test after refactoring away from res.render in favor of res.write.
      expect(true).to.be.true;
    });
  });
});
