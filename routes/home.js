/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();


// router.get('/', (req, res) => {
//   // if logged in redirect to /tasks
//   // if not, redirect to /login
//   res.render('users');
// });


// log user in - localhost:8080/login/7
router.get('/login/:user_id', (req, res) => {

  // set cookie
  req.session.user_id = req.params.user_id;


  // send the user somewhere (logged in user landing page)
  res.redirect('/');
});


// Logout of account
router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

module.exports = router;