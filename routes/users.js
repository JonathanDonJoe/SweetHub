var express = require('express');
var router = express.Router();
var db = require('../db')
var bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

console.log('hi')
router.post('/loginProcess', function(req, res){
  const checkUserQuery = `
  SELECT * FROM users WHERE users = $1
  `;
  db.one(checkUserQuery, [req.body.username]).then( resp =>{
    // const correctPass = bcrypt.compareSync(req.body.password, resp.password);
    res.json(resp)
  })
  .catch((err)=>{
    res.json(err);
  })
})





module.exports = router;
