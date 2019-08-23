var express = require('express');
var router = express.Router();
var db = require('../db')
var bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/loginProcess', function(req, res){
  console.log(req.body.username);
  
  const checkUserQuery = `
  SELECT * FROM users WHERE username = $1
  `;
  db.one(checkUserQuery, [req.body.username]).then( resp =>{
    const correctPass = bcrypt.compareSync(req.body.password, resp.password);
    console.log(correctPass);
    console.log(resp);

    if (correctPass) {
      req.session.username = resp.username;
      req.session.loggedin = true;
      req.session.email = resp.email;
      console.log(req.session);
      
      res.redirect('/dashboard')
    } else {
      res.redirect('/login?msg=badPassword')
    }
  })
  .catch((err)=>{
    res.redirect('/login?msg=userNotFound')
  })
})

router.post('/registerProcess', (req, res) => {
  const {displayname, username, email, password, password2} = req.body;
  const checkUserExistsQuery = `
  SELECT * FROM users WHERE username=$1 OR email=$2
  `;

  db.any(checkUserExistsQuery, [username, email]).then( resp => {
    if (resp.length > 0) {
      res.redirect('/login?msg=userExists');
    } else if (password !== password2) {
      res.redirect('/register?msg=passwordDoesNotMatch')
    } else {
      insertUser();
    }
  function insertUser() {
    const insertUserQuery = `
      INSERT INTO users (displayname, username, email, password) 
      VALUES
      ($1, $2, $3, $4)
      RETURNING id
    `;
    const hashedPass = bcrypt.hashSync(password, 10);
    db.one(insertUserQuery, [displayname, username, email, hashedPass]).then( resp => {
      res.redirect('/login?msg=registrationSuccessful')
    })
  }



  })
})



module.exports = router;
