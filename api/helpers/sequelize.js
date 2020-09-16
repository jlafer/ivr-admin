const Sequelize = require('sequelize')

const dbConnect = (host, name, user, pswd) => {
  const sequelize = new Sequelize(name, user, pswd, {
    host,
    dialect: 'postgres',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  return sequelize.authenticate()
  .then(() => {
    console.log("connected to the database!");
    return sequelize;
  })
  .catch(err => {
    console.log("cannot connect to the database!", err);
    process.exit();
  });
}

const dbSync = (sequelize, options) => {
  sequelize.sync(options)
  .then(() => {
    console.log(`database & tables synced!`)
  })
  .catch(err => {
    console.log("cannot sync the database!", err);
    process.exit();
  });
}

const makeModels = (sequelize, schemas) => {
  schemas.forEach(element => {
    const {name, schema} = element;
    sequelize.define(name, schema);  
  });
}

const modelList = (model, _filter) => {
  const filter = _filter || {};
  return model.findAll({where: filter});
};

const modelSave = (instance) => {
  console.log('modelSave: saving instance:', instance.toJSON());
  return instance.save();
};

module.exports = {
  dbConnect,
  dbSync,
  makeModels,
  modelList,
  modelSave
};
