var express = require('express');
var router = express.Router();
const bcryptjs = require('bcryptjs');
const connection = require('./db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registrate', { title: 'HostEst', user: req.session.user });
});




router.post('/', async function(req, res){
     nombre = req.body.nombre;
     apellidos = req.body.apellidos;
     correo = req.body.correo;
     telefono = req.body.telefono;
     username = req.body.username;
     tarjeta = req.body.tarjeta;
     password = req.body.password;
     rol = req.body.rol;
     passwordHash = await bcryptjs.hash(password,8);
     
     connection.query('SELECT * FROM users WHERE username = ?',[username], function(err, results){
     if (results.length == 0) {
      connection.query('INSERT INTO users SET ?',{nombre:nombre, apellidos:apellidos, correo:correo, telefono:telefono, username:username, tarjeta:tarjeta, password:passwordHash, rol:rol}, 
      function(err, results){
         if (err) throw err;
        req.session.success = 'Se ha registrado correctamente';
        res.redirect('back');
});
   } else {
      req.session.error = 'El usuario ya existe';
      res.redirect('back');
   }
});    
});

  


  


module.exports = router;
