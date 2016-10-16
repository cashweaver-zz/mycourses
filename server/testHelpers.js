/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const request = require('supertest');

const app = request('http://localhost:3000');

class TestPath {
  constructor(path) {
    this.path = path;
  }

  shouldHaveStatusCode(statusCode) {
    it(`should respond at ${this.path} with status code ${statusCode}`, (done) => {
      app
        .get(this.path)
        .end((err, res) => {
          if (err) {
            console.error(err);
          }

          expect(res.status).to.equal(200);
          done();
        });
    });
  }

  shouldHaveContentType(contentType) {
    const contentTypePattern = new RegExp(contentType.replace('/', '\\/'));
    it(`should respond at ${this.path} with a Content-Type of ${contentType}`, (done) => {
      app
        .get(this.path)
        .expect('Content-Type', contentTypePattern, done);
    });
  }
}

module.exports = {
  TestPath,
};
