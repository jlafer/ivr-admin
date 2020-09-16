var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var path = require('path');

const setModelsOnRequest = (models) => {
  return function (req, _res, next) {
    req.models = models;
    next();
  }
}

const applyMiddleware = (app, sequelize, corsOptions) => {
  app.use(cors(corsOptions));
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(setModelsOnRequest(sequelize.models));
};

module.exports = {
  applyMiddleware
}