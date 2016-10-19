const bodyParser = require('body-parser');
const config = require('./../config');
const express = require('express');
const GithubStrategy = require('passport-github2').Strategy;
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const routes = require('./routes').routes;
const session = require('express-session');
const User = require('./db').User;

const server = express();

if (/^(dev)$/.test(process.env.NODE_ENV)) {
  server.use(morgan('dev'));
}

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
server.use(bodyParser.json());
// HTML forms only support POST and GET actions
// A hidden field (named '_method') in the form is used to sidestep this
// limitation by leveraging methodOverride to, well, override the HTTP
// method of the request.
server.use(methodOverride('_method'));
server.use(session({
  secret: 'myveryspecialsessionsecretnopeeking',
  resave: false,
  saveUninitialized: false }
));

// ========================================================
//  Passport


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(new GithubStrategy(
  {
    clientID: config.auth.strategies.github.clientID,
    clientSecret: config.auth.strategies.github.clientSecret,
    callbackURL: config.auth.strategies.github.callbackURL,
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOrCreate({
        where: {
          [`${profile.provider}Id`]: profile.id,
        },
        defaults: {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          [`${profile.provider}Id`]: profile.id,
        },
      })
      .then((user, created) => {
        console.log('user', user);
        console.log('created', created);
        done(null, user[0].dataValues);
      })
      .catch((err) => {
        console.error(err);
        console.error('OH NO!');
      });
    });
  }
));

server.use(passport.initialize());
server.use(passport.session());

//  END: Passport
// ========================================================

const ensureAuthenticated = (req, res, next) => (
  (req.isAuthenticated()) ? next() : res.redirect('/login')
);

server.use('/', routes.basic);
server.use('/admin', ensureAuthenticated, routes.admin);
server.use('/auth', routes.auth);
server.use('/api/1/courses', routes.course);
server.use('/api/1/sections', routes.section);
server.use('/api/1/users', routes.user);

module.exports = server.listen(config.server.port, () => {
  if (!/^(test)$/.test(process.env.NODE_ENV)) {
    console.log(`Server listening on ${config.server.port} in environment ${process.env.NODE_ENV}`);
  }
});
