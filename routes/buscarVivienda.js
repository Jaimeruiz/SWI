var express = require('express');
var router = express.Router();
const connection = require('./db');


/* GET home page. */
router.get('/', function(req, res, next) {
  user = req.session.user
  connection.query('SELECT * FROM homes WHERE buscador = ?',['no'],function(err,results){
    if (err) throw err;
    res.render('buscarVivienda', { title: 'HostEst',  user: req.session.user, results:results});
  })
});

router.post('/',function(req, res, next){
   res.redirect('/alquilarVivienda');
});


module.exports = router;
