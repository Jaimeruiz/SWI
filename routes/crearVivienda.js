var express = require('express');
var router = express.Router();
const connection = require('./db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('crearVivienda', { title: 'HostEst', user: req.session.user });
});

router.post('/', function(req, res){
  direccion = req.body.direccion;
  localidad = req.body.localidad;
  precio = req.body.precio;
  nInquilinos = req.body.nInquilinos;
  propietario = req.body.propietario;

  connection.query('INSERT INTO homes SET ?', {direccion:direccion, localidad:localidad, precio:precio, nInquilinos:nInquilinos, propietario:propietario},
    function(err, results){
      if (err) {
         req.session.error = 'Error al añadir la nueva casa';
      } else {
          req.session.success = 'Se ha añadido la nueva vivienda';
          res.redirect('/misViviendas');
      }
    })
    
});


module.exports = router;
