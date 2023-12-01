/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  // if logged in redirect to /tasks
  // if not, redirect to /login
  req.session.user_id = 4;

  // Fetch the user from the database
  db.getUserWithId(req.session.user_id)
    .then(user => {
      if (user) {
        const templateVars = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        };

        res.render('index', templateVars);
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error occurred while fetching user');
    });
});

router.get('/login', (req, res) => {
  res.render('');
});


// log user in - localhost:8080/login/7
router.get('/login/:user_id', (req, res) => {

  // set cookie
  req.session.user_id = req.params.user_id;
  const userId = req.session.user_id;

  const templateVars = {
    'user_id': userId
  };
  // send the user somewhere (logged in user landing page)
  res.redirect('/', templateVars);
});


// Logout of account
router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
