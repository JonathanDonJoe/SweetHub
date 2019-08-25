var express = require('express');
var router = express.Router();

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

router.get('/dashboard', (req, res, next)=>{
    res.render('dashboard', {
      
  });
});


module.exports = router;
