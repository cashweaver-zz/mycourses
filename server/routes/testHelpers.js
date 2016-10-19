// TODO: refactor this, and all other helpers, into module system
/* eslint-disable no-unused-expressions */
// const expect = require('chai').expect;
const request = require('supertest');

const app = request('http://localhost:3001');

/**
 * Represents a URL path ('/some/path') to perform tests on.
 * @class
 */
class TestPath {
  constructor(path) {
    this.path = path;
  }

  /**
   * Test status code in HTTP response from path.
   * @param {string} httpVerb - HTTP Verb to use in request to server.
   * @param {number} expectedStatusCode - Expected response status code.
   */
  shouldHaveStatusCode(httpVerb, expectedStatusCode, data) {
    it(`should respond at ${this.path} with status code ${expectedStatusCode}`, (done) => {
      if (data !== undefined) {
        app[httpVerb.toLowerCase()](this.path)
          .send(data)
          .expect(expectedStatusCode, done);
      } else {
        app[httpVerb.toLowerCase()](this.path)
          .expect(expectedStatusCode, done);
      }
    });
  }

  /**
   * Test content type in HTTP response from path.
   * @param {string} httpVerb - HTTP Verb to use in request to server.
   * @param {string} expectedContentType - Expected response content type.
   */
  shouldHaveContentType(httpVerb, expectedContentType, data) {
    const expectedContentTypePattern = new RegExp(expectedContentType.replace('/', '\\/'));
    it(`should respond at ${this.path} with a Content-Type of ${expectedContentType}`, (done) => {
      if (data !== undefined) {
        app[httpVerb.toLowerCase()](this.path)
          .send(data)
          .expect('Content-Type', expectedContentTypePattern, done);
      } else {
        app[httpVerb.toLowerCase()](this.path)
          .expect('Content-Type', expectedContentTypePattern, done);
      }
    });
  }

  /**
   * Test body of an HTTP response.
   * @param {string} httpVerb - HTTP Verb to use in request to server.
   * @param {string} expectedBody - Expected response body.
   */
  shouldHaveResponseBody(httpVerb, expectedBody, data) {
    it(`should respond at ${this.path} with a body of ${expectedBody}`, (done) => {
      if (data !== undefined) {
        app[httpVerb.toLowerCase()](this.path)
          .send(data)
          .expect(expectedBody, done);
      } else {
        app[httpVerb.toLowerCase()](this.path)
          .expect(expectedBody, done);
      }
    });
  }
}

module.exports = {
  TestPath,
};
