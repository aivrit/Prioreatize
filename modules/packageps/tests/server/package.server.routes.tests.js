'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Packagep = mongoose.model('Packagep'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  packagep;

/**
 * Packagep routes tests
 */
describe('Packagep CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Packagep
    user.save(function () {
      packagep = {
        name: 'Packagep name'
      };

      done();
    });
  });

  it('should be able to save a Packagep if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Packagep
        agent.post('/api/packageps')
          .send(packagep)
          .expect(200)
          .end(function (packagepSaveErr, packagepSaveRes) {
            // Handle Packagep save error
            if (packagepSaveErr) {
              return done(packagepSaveErr);
            }

            // Get a list of Packageps
            agent.get('/api/packageps')
              .end(function (packagepsGetErr, packagepsGetRes) {
                // Handle Packageps save error
                if (packagepsGetErr) {
                  return done(packagepsGetErr);
                }

                // Get Packageps list
                var packageps = packagepsGetRes.body;

                // Set assertions
                (packageps[0].user._id).should.equal(userId);
                (packageps[0].name).should.match('Packagep name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Packagep if not logged in', function (done) {
    agent.post('/api/packageps')
      .send(packagep)
      .expect(403)
      .end(function (packagepSaveErr, packagepSaveRes) {
        // Call the assertion callback
        done(packagepSaveErr);
      });
  });

  it('should not be able to save an Packagep if no name is provided', function (done) {
    // Invalidate name field
    packagep.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Packagep
        agent.post('/api/packageps')
          .send(packagep)
          .expect(400)
          .end(function (packagepSaveErr, packagepSaveRes) {
            // Set message assertion
            (packagepSaveRes.body.message).should.match('Please fill Packagep name');

            // Handle Packagep save error
            done(packagepSaveErr);
          });
      });
  });

  it('should be able to update an Packagep if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Packagep
        agent.post('/api/packageps')
          .send(packagep)
          .expect(200)
          .end(function (packagepSaveErr, packagepSaveRes) {
            // Handle Packagep save error
            if (packagepSaveErr) {
              return done(packagepSaveErr);
            }

            // Update Packagep name
            packagep.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Packagep
            agent.put('/api/packageps/' + packagepSaveRes.body._id)
              .send(packagep)
              .expect(200)
              .end(function (packagepUpdateErr, packagepUpdateRes) {
                // Handle Packagep update error
                if (packagepUpdateErr) {
                  return done(packagepUpdateErr);
                }

                // Set assertions
                (packagepUpdateRes.body._id).should.equal(packagepSaveRes.body._id);
                (packagepUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Packageps if not signed in', function (done) {
    // Create new Packagep model instance
    var packagepObj = new Packagep(packagep);

    // Save the packagep
    packagepObj.save(function () {
      // Request Packageps
      request(app).get('/api/packageps')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Packagep if not signed in', function (done) {
    // Create new Packagep model instance
    var packagepObj = new Packagep(packagep);

    // Save the Packagep
    packagepObj.save(function () {
      request(app).get('/api/packageps/' + packagepObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', packagep.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Packagep with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/packageps/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Packagep is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Packagep which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Packagep
    request(app).get('/api/packageps/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Packagep with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Packagep if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Packagep
        agent.post('/api/packageps')
          .send(packagep)
          .expect(200)
          .end(function (packagepSaveErr, packagepSaveRes) {
            // Handle Packagep save error
            if (packagepSaveErr) {
              return done(packagepSaveErr);
            }

            // Delete an existing Packagep
            agent.delete('/api/packageps/' + packagepSaveRes.body._id)
              .send(packagep)
              .expect(200)
              .end(function (packagepDeleteErr, packagepDeleteRes) {
                // Handle packagep error error
                if (packagepDeleteErr) {
                  return done(packagepDeleteErr);
                }

                // Set assertions
                (packagepDeleteRes.body._id).should.equal(packagepSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Packagep if not signed in', function (done) {
    // Set Packagep user
    packagep.user = user;

    // Create new Packagep model instance
    var packagepObj = new Packagep(packagep);

    // Save the Packagep
    packagepObj.save(function () {
      // Try deleting Packagep
      request(app).delete('/api/packageps/' + packagepObj._id)
        .expect(403)
        .end(function (packagepDeleteErr, packagepDeleteRes) {
          // Set message assertion
          (packagepDeleteRes.body.message).should.match('User is not authorized');

          // Handle Packagep error error
          done(packagepDeleteErr);
        });

    });
  });

  it('should be able to get a single Packagep that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Packagep
          agent.post('/api/packageps')
            .send(packagep)
            .expect(200)
            .end(function (packagepSaveErr, packagepSaveRes) {
              // Handle Packagep save error
              if (packagepSaveErr) {
                return done(packagepSaveErr);
              }

              // Set assertions on new Packagep
              (packagepSaveRes.body.name).should.equal(packagep.name);
              should.exist(packagepSaveRes.body.user);
              should.equal(packagepSaveRes.body.user._id, orphanId);

              // force the Packagep to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Packagep
                    agent.get('/api/packageps/' + packagepSaveRes.body._id)
                      .expect(200)
                      .end(function (packagepInfoErr, packagepInfoRes) {
                        // Handle Packagep error
                        if (packagepInfoErr) {
                          return done(packagepInfoErr);
                        }

                        // Set assertions
                        (packagepInfoRes.body._id).should.equal(packagepSaveRes.body._id);
                        (packagepInfoRes.body.name).should.equal(packagep.name);
                        should.equal(packagepInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Packagep.remove().exec(done);
    });
  });
});
