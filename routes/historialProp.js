var express = require('express');
var router = express.Router();
const connection = require('./db');


/* GET home page. */
router.get('/', function(req, res, next) {
  user = req.session.user;
  connection.query('SELECT * FROM homes WHERE propietario = ? AND alquilado !=  ?', [user, "NA"], function(err, results){
    res.render('historialProp', { title: 'HostEst',  user: req.session.user, results:results });
  })
});

router.post('/',function(req, res, next){
   res.redirect('/validarAlquiler');
   res.redirect('/cancelarAlquiler');   
});

module.exports = router;
