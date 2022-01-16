var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const connection = require('./routes/db');




var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registrateRouter = require('./routes/registrate');
var conocenosRouter = require('./routes/conocenos');
var inquilinoRouter = require('./routes/inquilino');
var buscarViviendaRouter = require('./routes/buscarVivienda');
var historialInqRouter = require('./routes/historialInq');
var incidenciasInqRouter = require('./routes/incidenciasInq');
var perfilInqRouter = require('./routes/perfilInq')
var modificarPerfilInqRouter = require('./routes/modificarPerfilInq')
var propietarioRouter = require('./routes/propietario');
var misViviendasRouter = require('./routes/misViviendas');
var crearViviendaRouter = require('./routes/crearVivienda');
var modificarViviendaRouter = require('./routes/modificarVivienda');
var historialPropRouter = require('./routes/historialProp');
var incidenciasPropRouter = require('./routes/incidenciasProp');
var perfilPropRouter = require('./routes/perfilProp')
var modificarPerfilPropRouter = require('./routes/modificarPerfilProp')
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUnitialized: false,
  secret: 'SECRET'
}));

app.use(function(req, res, next){
   let err = req.session.error;
   let msg = req.session.success;
   delete req.session.error;
   delete req.session.success;
   res.locals.messages = ''; 
   if (err) res.locals.messages += '<p>' + err + '<p>';
   if (msg) res.locals.messages += '<p>' + msg + '<P>'; 
   next();
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/registrate', registrateRouter);
app.use('/conocenos', conocenosRouter); 
app.use('/inquilino', restricted, inquilinoRouter);
app.use('/buscarVivienda', restricted, buscarViviendaRouter);
app.use('/historialInq', restricted, historialInqRouter);
app.use('/incidenciasInq', restricted, incidenciasInqRouter);
app.use('/perfilInq', restricted, perfilInqRouter);
app.use('/modificarPerfilInq', restricted, modificarPerfilInqRouter);
app.use('/propietario', restricted, propietarioRouter);
app.use('/misViviendas', restricted, misViviendasRouter);
app.use('/crearVivienda', restricted, crearViviendaRouter);
app.use('/modificarVivienda', restricted, modificarViviendaRouter);
app.use('/historialProp', restricted, historialPropRouter);
app.use('/incidenciasProp', restricted, incidenciasPropRouter);
app.use('/perfilProp', restricted, perfilPropRouter);
app.use('/modificarPerfilProp', restricted, modificarPerfilPropRouter);
app.use('/users', usersRouter);
app.get('/logout', function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  })
});

app.get('/borrarVivienda/:id', function(req, res){
  id = req.params.id;
   connection.query('DELETE FROM homes WHERE id = ?', [id], function(err, results){
      if (err) throw err;
      res.redirect('/misViviendas')
   })
  });

app.get('/alquilarVivienda/:id', function(req, res){
  user = req.session.user;
  id = req.params.id;
   connection.query('UPDATE homes SET alquilado = ? WHERE id = ?', [user,id], function(err, results){
      if (err) throw err;
      res.redirect('/buscarVivienda')
   })
  });

app.get('/validarAlquiler/:id', function(req, res){
  user = req.session.user;
  id = req.params.id;
   connection.query('UPDATE homes SET buscador = ? WHERE id = ?', ['ok',id], function(err, results){
      if (err) throw err;
      res.redirect('/historialProp')
   })
  });

app.get('/cancelarAlquiler/:id', function(req, res){
  user = req.session.user;
  id = req.params.id;
   connection.query('UPDATE homes SET buscador = ?, alquilado = ? WHERE id = ?', ['no','NA',id], function(err, results){
      if (err) throw err;
      res.redirect('/historialProp')
   })
  });

app.get('/borrarPerfilInq/:id', function(req, res){
  id = req.params.id;
   connection.query('DELETE FROM users WHERE id = ?', [id], function(err, results){
      if (err) throw err;
      res.redirect('/')
   })
  });

app.get('/borrarPerfilProp/:id', function(req, res){
  id = req.params.id;
   connection.query('DELETE FROM users WHERE id = ?', [id], function(err, results){
      if (err) throw err;
      res.redirect('/')
   })
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function restricted(req, res, next){
  if (req.session.user){
    next();
  } else {
    req.session.error = 'Acceso denegado';
    res.redirect('/login');
  }
}



module.exports = app;
