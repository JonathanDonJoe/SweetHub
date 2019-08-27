var express = require('express');
var router = express.Router();
const db = require('../db');
var bcrypt = require('bcrypt');

// Require being logged in to access dashboard
router.all('/dashboard', (req, res, next) => {
  if(! req.session.loggedin){
    res.redirect('/login')
  } else {
    next();
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  // let msgforview;
  // if(req.query.msg==="Bad"){
  //   msgforview = "What are you doing here?"
  // }
    res.render('index', { title: 'SweetHub' });
});

router.get('/register', (req, res, next)=>{
    res.render('register', {

  });
});

router.get('/login', (req, res, next)=>{
    res.render('login', {

  });
});

router.get('/dashboard', (req, res)=>{
  const eventsQuery = `
  SELECT DISTINCT ON (events.id) events.id, events.name
  FROM events, users, event_rels
  WHERE events.id = event_rels.eventid
    AND users.id = event_rels.userid
    AND users.id = $1
  `
  db.any(eventsQuery, [req.session.userId]).then( resp => {
    console.log(resp);
    res.render('dashboard', {
      myEvents: resp   
    });
  });
});


// Require being logged in to access update-profile
router.all('/update-profile', (req, res, next) => {
  if(! req.session.loggedin){
    res.redirect('/login')
  } else {
    next();
  }
});

router.get('/update-profile', (req, res) => {
  // const profileQuery = ``
  res.render('update-profile', {

  })
})

// Require being logged in to updating-profile
router.all('/updating-profile', (req, res, next) => {
  if(! req.session.loggedin){
    res.redirect('/login')
  } else {
    next();
  }
});

// Require correct password
router.all('/updating-profile', (req, res, next) => {
  const checkUserQuery = `
  SELECT * FROM users WHERE username = $1
  `;
  console.log(req.session);
  db.one(checkUserQuery, [req.session.username]).then( resp => {
    const correctPass = bcrypt.compareSync(req.body.password, resp.password);
    // console.log(correctPass);
    // console.log(resp);
    if (correctPass) {
      next()
    } else {
      res.redirect('/update-profile?msg=badPassword')
    }
  });
});

// POST request for updating profile
router.post('/updating-profile', (req, res) => {
  const updateEmailQuery = `
  UPDATE users 
  SET email = $1
  WHERE id=$2
  RETURNING id
  `
  const updateAvatarQuery = `
  UPDATE users 
  SET avatar_url = $1
  WHERE id=$2
  RETURNING id
  `
  const updateFavoriteDessertQuery = `
  UPDATE users 
  SET favorite_dessert = $1
  WHERE id=$2
  RETURNING id
  `
  if (req.body.email) {
    db.one(updateEmailQuery, [req.body.email, req.session.userId]).then( resp => {
      // res.redirect('/dashboard?msg=updatedEmail')
    });
  }
  if (req.body.avatar_url) {
    db.one(updateAvatarQuery, [req.body.avatar_url, req.session.userId]).then( resp => {
      // res.redirect('/dashboard?msg=updatedAvatar')
    });
  }
  if (req.body.favorite_dessert)
  db.one(updateFavoriteDessertQuery, [req.body.favorite_dessert, req.session.userId]).then( resp => {
    // res.redirect('/dashboard?msg=updatedFavoriteDessert')
  });
  res.redirect('/dashboard?msg=updatedProfile')
});


module.exports = router;
