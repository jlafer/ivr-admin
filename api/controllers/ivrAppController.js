const db = require('../models');
const {
  respondWithList, getOneById, respondWithCreated, respondWithPatched, respondWithDeleted
} = require('../helpers/responses');

exports.list = function(req, res) {
  respondWithList(req, res, db.IvrApp, {organization: req.params.orgId});
};

exports.getById = function(req, res, next) {
  getOneById(req, res, next, db.IvrApp);
};

exports.fetchOne = function(req, res) {
  res.json(res.oneById);
};

exports.patchOne = function(req, res) {
  respondWithPatched(req, res, res.oneById, ['name']);
};

exports.deleteOne = function(req, res) {
  respondWithDeleted(req, res, res.oneById);
};

exports.create = function(req, res) {
  console.log('create: params: ', req.params);
  const ivrApp = new db.IvrApp({
    name: req.body.name,
    organization: req.params.orgId
  })
  respondWithCreated(req, res, ivrApp);
};
