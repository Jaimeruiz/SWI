var express = require('express');
var router = express.Router();
const connection = require('./db');

/* GET home page. */
router.get('/:id', function(req, res, next) {
   id = req.params.id;
   connection.query('SELECT * FROM homes WHERE id = ?', [id], function(err, results){
      if (err) throw err;
       res.render('modificarVivienda', { title: 'HostEst',  user: req.session.user, user:results[0]});
   })
  
});

router.post('/', function(req, res){
   id = req.body.id
  direccion = req.body.direccion;
  localidad = req.body.localidad;
  precio = req.body.precio;
  nInquilinos = req.body.nInquilinos;
  propietario = req.body.propietario;
  connection.query('UPDATE homes SET ? WHERE id =?', [{direccion:direccion, localidad:localidad, precio:precio, nInquilinos:nInquilinos, propietario:propietario}, id],
   function(err,results){
      if (err) throw err;
      res.redirect('/misViviendas');
   })

  
});


module.exports = router;
