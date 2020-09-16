var mongoose = require('mongoose');

const {Schema} = mongoose;

const IvrApp = {
  name: {type: String, required: true},
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true }
};

module.exports = IvrApp;