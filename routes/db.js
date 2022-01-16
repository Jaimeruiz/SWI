 var mysql = require('mysql2'); 

 const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hostest'
});

connection.connect(function(err) {
   if (err) throw err;
   console.log('La conexion funciona');
   /*connection.query("CREATE DATABASE ejemplo1", function(err, result){
   if (err) throw err;
   console.log('Base de datos creada');
   });
  connection.query("CREATE TABLE ejemplo1.users (id INT, nombre VARCHAR(40), apellidos VARCHAR(60), telefono INT);", function(err, result){
   if (err) throw err;
   console.log('Tabla creada');
   });
  connection.query("CREATE TABLE ejemplo1.homes (id INT, nombre VARCHAR(40), apellidos VARCHAR(60), telefono INT);", function(err, result){
   if (err) throw err;
   console.log('Tabla creada');
   });*/
});


module.exports = connection;