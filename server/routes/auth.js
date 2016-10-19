const express = require('express');
// const render = require('./theme').render;
// const templates = require('./theme').publicTemplates;
const passport = require('passport');

const router = express.Router();

const handler = {
  // This method won't be called. Passport will redirect the user to
  // the auth provider.
  auth: () => {},
  redirectToHome: (req, res) => {
    res.redirect('/');
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  },
};

router.get('/logout', handler.logout);

router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  }),
  handler.auth
);

router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/opps',
  }),
  handler.redirectToHome);

module.exports = { router, handler };
