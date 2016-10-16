// TODO: refactor this, and all other helpers, into module system
/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const request = require('supertest');

const app = request('http://localhost:3000');

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
   * @param {number} statusCode - Expected response status code.
   */
  shouldHaveStatusCode(httpVerb, statusCode) {
    it(`should respond at ${this.path} with status code ${statusCode}`, (done) => {
      app[httpVerb.toLowerCase()](this.path)
        .end((err, res) => {
          if (err) {
            console.error(err);
          }

          expect(res.status).to.equal(200);
          done();
        });
    });
  }

  /**
   * Test content type in HTTP response from path.
   * @param {string} httpVerb - HTTP Verb to use in request to server.
   * @param {string} contentType - Expected response content type.
   */
  shouldHaveContentType(httpVerb, contentType) {
    const contentTypePattern = new RegExp(contentType.replace('/', '\\/'));
    it(`should respond at ${this.path} with a Content-Type of ${contentType}`, (done) => {
      app[httpVerb.toLowerCase()](this.path)
        .expect('Content-Type', contentTypePattern, done);
    });
  }
}

module.exports = {
  TestPath,
};
