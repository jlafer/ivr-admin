var mongoose = require('mongoose');

const dbConnect = (host, name, user, pswd) => {
  const dbUrl = `mongodb+srv://${user}:${pswd}@${host}/${name}?retryWrites=true&w=majority`;
  console.log(`connecting to: ${dbUrl}`);
  return mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to the database!");
    return {mongoose, Schema: mongoose.Schema};
  })
  .catch(err => {
    console.log("cannot connect to the database!", err);
    process.exit();
  });
};

const makeSchema = (Schema, spec) => {
  const schema = new Schema(spec);
  return schema;
};

const makeModel = (mongoose, schema, name) => {
  const model = mongoose.model(name, schema);
  return model;
};

const addModel = (mongoose, spec, name) => {
  const schema = makeSchema(mongoose.Schema, spec);
  const model = makeModel(mongoose, schema, name);
  return model;
};

const modelFetchById = (model, id) => {
  return model.findById(id);
};

const modelList = (model, _filter) => {
  const filter = _filter || {}
  return model.find(filter);
};

const modelSave = (doc) => {
  console.log('modelSave: doc:', doc);
  return doc.save();
};

const modelDelete = (doc) => {
  return doc.remove();
};

module.exports = {
  dbConnect,
  addModel,
  modelSave,
  modelFetchById,
  modelList,
  modelDelete
};
