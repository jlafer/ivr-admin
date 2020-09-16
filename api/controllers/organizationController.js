const {
  respondWithList, getOneById, respondWithCreated, respondWithPatched, respondWithDeleted
} = require('../helpers/responses');

exports.list = function(req, res) {
  respondWithList(req, res, req.models.Organization);
};

exports.getById = function(req, res, next) {
  getOneById(req, res, next, req.models.Organization);
};

exports.fetchOne = function(req, res) {
  res.json(res.oneById);
};

exports.patchOne = function(req, res) {
  respondWithPatched(req, res, res.oneById, ['name', 'description']);
};

exports.deleteOne = function(req, res) {
  respondWithDeleted(req, res, res.oneById);
};

exports.create = function(req, res) {
  const org = req.models.Organization.build({
    name: req.body.name,
    description: req.body.description
  });
  respondWithCreated(req, res, org);
};
