var express = require('express');
var router = express.Router();
const connection = require('./db');


/* GET home page. */
router.get('/', function(req, res, next) {
  user = req.session.user;
      connection.query('SELECT id, localidad, direccion, propietario, alquilado, buscador, precio FROM homes WHERE buscador = ? AND alquilado = ?', 
        ['ok',user], function(err,results){
          if (err) throw err;
          res.render('historialInq', { title: 'HostEst',  user: req.session.user, results:results });
        })
});

router.post('/',function(req, res, next){
   res.redirect('/chat');
});

module.exports = router;
