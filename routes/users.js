/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('users');
});


// log user in - localhost:####/login/7
router.get('/login/:user_id', (req, res) => {

  /* set cookie
  ex: req.cookies.user_id = req.params.user-id;

  OR

  cookie-parser
  res.cookie('user_id', req.params.user_id);
  */

  // send the user somewhere (sign in landing page)
  res.redirect('/items');
});



module.exports = router;