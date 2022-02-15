const mongoose = require('mongoose'), Schema = mongoose.Schema;

const DrugSchema = mongoose.Schema({
  name: String,
  code: String,
});

DrugSchema.method("toJSON", function () {
  const {__v, _id, ...object} = this.toObject();
  object._id = _id;
  return object;
});
module.exports = mongoose.model('Drug', DrugSchema);
