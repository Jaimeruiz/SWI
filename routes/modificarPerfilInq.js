var express = require('express');
var router = express.Router();
const connection = require('./db');

/* GET home page. */
router.get('/:id', function(req, res, next) {
   id = req.params.id;
   connection.query('SELECT * FROM users WHERE id = ?', [id], function(err, results){
      if (err) throw err;
       res.render('modificarPerfilInq', { title: 'HostEst',  user: req.session.user, user:results[0]});
   })
  
});

router.post('/', function(req, res){
   id = req.body.id
  nombre = req.body.nombre;
  apellidos = req.body.apellidos;
  correo = req.body.correo;
  telefono = req.body.telefono;
  username = req.body.username;
  tarjeta = req.body.tarjeta;
  password = req.body.password;
  rol = req.body.rol;
  connection.query('UPDATE users SET ? WHERE id =?', [{nombre:nombre, apellidos:apellidos, correo:correo, telefono:telefono, username:username, tarjeta:tarjeta, password:password, rol:rol}, id],
   function(err,results){
      if (err) throw err;
      res.redirect('/perfilInq');
   })

  
});


module.exports = router;
