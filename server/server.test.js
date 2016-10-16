/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const TestPath = require('./testHelpers').TestPath;
// const request = require('supertest');

describe('app', () => {
  const root = new TestPath('/');
  root.shouldHaveStatusCode(200);
  root.shouldHaveContentType('text/html');
});
