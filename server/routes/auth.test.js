/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
// const auth = require('./auth');
// const db = require('./../db');
// const expect = require('chai').expect;
// const sinon = require('sinon');
const TestPath = require('./testHelpers').TestPath;

describe('auth', () => {
  const buildAuthGETPaths = basePath => (
    [
      new TestPath(`${basePath}/`),
      new TestPath(`${basePath}/connect`),
    ]
  );
  const buildAuthPOSTPaths = basePath => (
    [
      new TestPath(`${basePath}/callback`),
      new TestPath(`${basePath}/connect/callback`),
    ]
  );

  describe('github', () => {
    const basePath = '/auth/github';
    const authGETPaths = buildAuthGETPaths(basePath);
    const authPOSTPaths = buildAuthPOSTPaths(basePath);

    for (const path of authGETPaths) {
      // path.shouldHaveStatusCode('GET', 200);
      // path.shouldHaveContentType('GET', 'text/html');
    }
    for (const path of authPOSTPaths) {
      // path.shouldHaveStatusCode('POST', 200);
      // path.shouldHaveContentType('POST', 'text/html');
    }
  });
});
