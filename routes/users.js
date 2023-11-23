/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

// cookies
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['omgmyfirstsecretkey', 'thisisbananas', 'ihavesomanysecrets', 'thisisgoingtobesecureashell', 'supercalifragilisticexpialidocious']
}));

// do i need this? (from documentation)
const app = express();

router.get('/', (req, res) => {
  res.render('users');
});


// log user in - localhost:8080/login/7
router.get('/login/:user_id', (req, res) => {

  /* set cookie
  ex: req.cookies.user_id = req.params.user_id;

  OR

  cookie-parser
  res.cookie('user_id', req.params.user_id);
  */

  // send the user somewhere (logged in user landing page)
  res.redirect('/tasks');
});


// Logout of account
app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

// do i need this? (from documentation)
app.use('/', router);

module.exports = router;