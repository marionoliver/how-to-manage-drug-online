const mongoose = require('mongoose'), Schema = mongoose.Schema;

const PatientSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  sex: String,
  drugs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Drug'}],
  treatments: [
    {
      start: Date,
      end: Date,
      text: String,
      doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'}
    }
  ],
});

PatientSchema.method("toJSON", function () {
  const {__v, _id, ...object} = this.toObject();
  object._id = _id;
  return object;
});

module.exports = mongoose.model('Patient', PatientSchema);
