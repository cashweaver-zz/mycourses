/* eslint-disable no-unused-expressions */
// const user = require('./user');
const User = require('./../db').User;
const expect = require('chai').expect;
// const sinon = require('sinon');
const request = require('supertest');
const TestPath = require('./testHelpers').TestPath;

const app = request('http://localhost:3001/api/1');

const devUsers = [
  { fullName: 'Anne Apple', email: 'anneapple@example.com' },
  { fullName: 'Ben Branson', email: 'benbranson@example.com' },
];

const resetTableToDevData = (done) => {
  // Drop, and re-create, the database
  User.sync({ force: true })
    .then(() => User.bulkCreate(devUsers))
    .then(() => done())
    .catch(err => done(err));
};

const resetTable = (done) => {
  // Drop, and re-create, the database
  User.sync({ force: true })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
};

const rootPath = new TestPath('/api/1/users');
const existentUserPath = new TestPath('/api/1/users/1');
const nonExistentUserPath = new TestPath('/api/1/users/999');

describe('user', () => {
  describe('GET', () => {
    before(done => resetTableToDevData(done));

    describe('all', () => {
      rootPath.shouldHaveStatusCode('GET', 200);
      rootPath.shouldHaveContentType('GET', 'application/json');

      it('should get all users', (done) => {
        app
          .get('/users')
          .expect(JSON.stringify(devUsers), done);
      });
    });

    describe('one', () => {
      existentUserPath.shouldHaveStatusCode('GET', 200);
      existentUserPath.shouldHaveContentType('GET', 'application/json');

      it('should get the specified user', (done) => {
        app
          .get('/users/1')
          .expect(JSON.stringify(devUsers[0]), done);
      });

      nonExistentUserPath.shouldHaveStatusCode('GET', 404);
      nonExistentUserPath.shouldHaveContentType('GET', 'application/json');

      it('should only retrieve users which exist', (done) => {
        app
          .get('/users/999')
          .expect(JSON.stringify({}), done);
      });
    });
  });

  describe('POST', () => {
    beforeEach(done => resetTable(done));

    rootPath.shouldHaveStatusCode('POST', 200);
    rootPath.shouldHaveContentType('POST', 'application/json');

    const goodUser = {
      fullName: 'Cat Carter',
      email: 'catcarter@example.com',
    };
    const badUser = {
      // Missing fullName
      email: 'anon@example.com',
    };

    it('should create new user', (done) => {
      app.post('/users')
        .send(goodUser)
        .end((err) => {
          if (err) {
            console.error(err);
          }

          User.findOne({
            where: {
              fullName: goodUser.fullName,
            },
            attributes: ['fullName', 'email'],
          })
          .then((dbUser) => {
            expect(dbUser.dataValues).to.deep.equal(goodUser);
            done();
          });
        });
    });

    it('should respond with success after creating new user', (done) => {
      app.post('/users')
        .send(goodUser)
        .end((err, res) => {
          expect(res.body.success).to.be.true;
          done();
        });
    });

    it('should not create new user if given bad data', (done) => {
      app.post('/users')
        .send(badUser)
        .end((err) => {
          if (err) {
            console.error(err);
          }

          User.findOne({
            where: {
              email: badUser.email,
            },
            attributes: ['fullName', 'email'],
          })
          .then((dbUser) => {
            expect(dbUser).to.equal(null);
            done();
          });
        });
    });

    it('should respond with failure after failing to create new user', (done) => {
      app.post('/users')
        .send(badUser)
        .end((err, res) => {
          expect(res.body.success).to.be.false;
          done();
        });
    });
  });

  describe('PUT', () => {
    beforeEach(done => resetTable(done));

    existentUserPath.shouldHaveStatusCode('PUT', 200);
    existentUserPath.shouldHaveContentType('PUT', 'application/json');

    const goodUser = { fullName: 'Dan Damon', email: 'dandamon@example.com' };
    const goodEditedUser = { fullName: 'Eric Egart', email: 'ericegart@example.com' };
    const badEditedUser = { fullName: 'Fin Fly', email: 'finfly@example.com' };

    it('should update an existing user', (done) => {
      User.create(goodUser)
        .then(() => {
          app.put('/users/1')
            .send(goodEditedUser)
            .end(() => {
              User.findById(1, {
                attributes: ['fullName', 'email'],
              })
              .then((dbUser) => {
                expect(dbUser.dataValues).to.deep.equal(goodEditedUser);
                done();
              });
            });
        });
    });

    it('should respond with success after successfully updating a user', (done) => {
      User.create(goodUser)
        .then(() => {
          app.put('/users/1')
            .send(goodEditedUser)
            .end((err, res) => {
              expect(res.body.success).to.be.true;
              done();
            });
        });
    });

    it('should respond with failure after failing to update a user', (done) => {
      User.create(goodUser)
        .then(() => {
          app.put('/users/999')
            .send(badEditedUser)
            .end((err, res) => {
              expect(res.body.success).to.be.false;
              done();
            });
        });
    });
  });

  describe('DELETE', () => {
    beforeEach(done => resetTableToDevData(done));

    existentUserPath.shouldHaveStatusCode('DELETE', 200);
    existentUserPath.shouldHaveContentType('DELETE', 'application/json');

    it('should delete an existing user', (done) => {
      app.delete('/users/1')
        .end(() => {
          User.findById(1)
            .then((user) => {
              expect(user).to.be.null;
              done();
            });
        });
    });

    it('should respond with success after deleting new user', (done) => {
      app.delete('/users/1')
        .end((err, res) => {
          expect(res.body.success).to.be.true;
          done();
        });
    });

    it('should respond with failure after failing to delete new user', (done) => {
      app.delete('/users/999')
        .end((err, res) => {
          expect(res.body.success).to.be.false;
          done();
        });
    });
  });
});
