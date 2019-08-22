var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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
