require("dotenv").config();
var express = require('express');
var path = require('path');

const { dbConnect, dbSync, makeModels } = require('./helpers/sequelize');
const schemas = require('./models');
const {applyMiddleware} = require('./middleware');
const {addRoutes} = require('./routes');

const {
  CLIENT_HOST, CLIENT_PORT,
  DB_HOST, DB_NAME, DB_USER, DB_PSWD, SYNC_DB
} = process.env;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var corsOptions = {
  origin: `http://${CLIENT_HOST}:${CLIENT_PORT}`
};

dbConnect(DB_HOST, DB_NAME, DB_USER, DB_PSWD)
.then(sequelize => {
  makeModels(sequelize, schemas);
  return sequelize;
})
.then(sequelize => {
  if (SYNC_DB == 'true') {
    console.log(`sync'ing the database...`);
    dbSync(sequelize, {force: true});
  }
  return sequelize;
})
.then(sequelize => {
  applyMiddleware(app, sequelize, corsOptions)
})
.then(() => {
  addRoutes(app)
})
.then(() => {
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
});


module.exports = app;
