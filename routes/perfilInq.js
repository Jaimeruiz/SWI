var express = require('express');
var router = express.Router();
const connection = require('./db');


/* GET home page. */
router.get('/', function(req, res, next) {
  user = req.session.user
  connection.query('SELECT * FROM users WHERE username = ?',[user],function(err,results){
    if (err) throw err;
    res.render('perfilInq', { title: 'HostEst',  user: req.session.user, results:results});
  })
});



module.exports = router;
