var express = require('express');
var router = express.Router();
const bcryptjs = require('bcryptjs');
const connection = require('./db');

 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'HostEst', user: req.session.user });
});

router.post('/', async function(req, res){
  username = req.body.username;
  password = req.body.password;
  let passwordHash = await bcryptjs.hash(password,8);
  connection.query('SELECT username,rol, password FROM users WHERE username = ?',[username], async function(err, results){
  if (results[0].username != 0 ){
    if (results[0].rol === 'inquilino') {
        if (await bcryptjs.compare(password, results[0].password)){
        req.session.user = results[0].username;
        req.session.success = 'Bienvenido a HostEst';
        res.redirect('/inquilino');
     } else{
      req.session.error = 'Usuario o contraseña incorrectas';
      res.redirect('back');
     }
  } 
 else {
        if (await bcryptjs.compare(password, results[0].password)){
        req.session.user = results[0].username;
        req.session.success = 'Bienvenido a HostEst';
        res.redirect('/propietario');
     } else{
      req.session.error = 'Usuario o contraseña incorrectas';
      res.redirect('back');
     }
  }
  }   else {
    req.session.error = 'Usuario o contraseña incorrectas';
    res.redirect('back');
  }
});
});



module.exports = router;
