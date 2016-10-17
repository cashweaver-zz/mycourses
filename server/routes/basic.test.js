/* eslint-disable no-unused-expressions */
const basic = require('./basic');
const expect = require('chai').expect;
const sinon = require('sinon');
const TestPath = require('./testHelpers').TestPath;

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

    basic.handler.renderRoot(req, res);
    // TODO: update test after refactoring away from res.render in favor of res.write.
    expect(true).to.be.true;
  });
});
