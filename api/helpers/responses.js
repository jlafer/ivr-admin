const R = require('ramda');

const {
  modelList, modelFetchById, modelSave, modelDelete
} = require('./sequelize');

const respondWithError = (res, err) => {
  res.status(500).json({ message: err.message })
};

const respondWithList = async function(_req, res, model, filter) {
  try {
    const docs = await modelList(model, filter);
    res.json(docs);
  }
  catch (err) {
    respondWithError(res, err);
  }
};

// NOTE: this is a middleware function - only responds on an error
const getOneById = async function(req, res, next, model) {
  try {
    const id = req.params.id;
    const doc = await modelFetchById(model, id);
    if (doc == null) {
      return res.status(404).json({message: `Cant find record with id=${id}`});
    }
    res.oneById = doc;
    next();
  }
  catch (err) {
    return respondWithError(res, err);
  }
};

const respondWithOneById = async function(req, res, model) {
  try {
    const id = req.params.id;
    const doc = await modelFetchById(model, id);
    if (doc == null) {
      return res.status(404).json({message: `Cant find record with id=${id}`});
    }
    res.json(doc);
  }
  catch (err) {
    respondWithError(res, err);
  }
};


const respondWithCreated = async (_req, res, instance) => {
  try {
    const newInst = await modelSave(instance);
    res.status(201).json(newInst)
  }
  catch (err) {
    respondWithError(res, err);
  }
}

const respondWithPatched = async (req, res, doc, fieldNames) => {
  try {
    const updatedFields = R.pick(fieldNames, req.body);
    console.log('updatedFields:', updatedFields);
    Object.entries(updatedFields).forEach(([key, val]) => {
      doc[key] = val;
    });
    const newDoc = await modelSave(doc);
    res.json(newDoc)
  }
  catch (err) {
    respondWithError(res, err);
  }
}

const respondWithDeleted = async (_req, res, doc) => {
  try {
    await modelDelete(doc);
    res.json({message: `document with id=${doc._id} deleted`})
  }
  catch (err) {
    respondWithError(res, err);
  }
}

module.exports = {
  getOneById,
  respondWithList,
  respondWithOneById,
  respondWithCreated,
  respondWithPatched,
  respondWithDeleted
};
