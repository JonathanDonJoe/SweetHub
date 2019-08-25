var express = require('express');
var router = express.Router();
const db = require('../db');

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
    res.render('index', { title: 'MeetDesserts' });
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


module.exports = router;
