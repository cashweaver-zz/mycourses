const express = require('express');

// TODO: refactor this into a helper file
// const templatePath = require.resolve('./../../public/themes/basic/index.pug');
// const templateFn = require('pug').compileFile(templatePath);
// const index = require.resolve('./../../public/themes/basic/index.pug');
// const indexTemplate = require('pug').compileFile(templatePath);
const theme = {
  index: require('pug').compileFile(require.resolve('./../../public/themes/basic/index.pug')),
};

const router = express.Router();

const handler = {
  renderRoot: (req, res) => {
    //res.render('index', { pageTitle: 'Online Learning Platform' });
    // ref: https://strongloop.com/strongblog/bypassing-express-view-rendering-for-speed-and-modularity/
    res.set('Content-Type', 'text/html');
    res.write(theme.index({ pageTitle: 'Online Learning Platform' }));
    res.end();
  },
};

router.get('/', handler.renderRoot);

module.exports = { router, handler };
