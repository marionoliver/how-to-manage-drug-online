const mongoose = require('mongoose'), Schema = mongoose.Schema;

const DoctorSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  speciality: String,
});

DoctorSchema.method("toJSON", function () {
  const {__v, _id, ...object} = this.toObject();
  object._id = _id;
  return object;
});

module.exports = mongoose.model('Doctor', DoctorSchema);
