var express = require('express');
var router = express.Router();
const connection = require('./db');


/* GET home page. */
router.get('/', function(req, res, next) {
  user = req.session.user
  connection.query('SELECT * FROM homes WHERE propietario = ?',[user],function(err,results){
    if (err) throw err;
    res.render('misViviendas', { title: 'HostEst',  user: req.session.user, results:results});
  })
});

router.post('/', function(req, res){
    res.redirect('/crearVivienda');
});


module.exports = router;
