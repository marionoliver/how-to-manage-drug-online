const Doctor = require("../model/doctor.model.js");
const Patient = require("../model/patient.model.js");

/**
 * Get all doctors
 * @param req
 * @param res
 */
exports.getAllDoctor = (req, res) => {
  Doctor.find({})
    .exec((err, doctors) => {
      if (err) {
        return res.status(500).send({
          message: "Can't get all doctors"
        });
      }
      res.status(200).send(
        doctors
      );
    });
};

/**
 * Get doctor by id
 * @param req
 * @param res
 */
exports.getDoctor = (req, res) => {
  Doctor.findById(req.params.idDoctor)
    .exec((err, drug) => {
      if (err) {
        return res.status(500).send({
          message: "Can't get doctor with id ".req.params.idDoctor
        });
      }
      res.status(200).send(
        doctor
      );
    });
};

/**
 * Delete doctor
 * @param req
 * @param res
 */
exports.deleteDoctor = (req, res) => {
  Patient.updateMany(
    {
      'treatments.doctor': req.params.idDoctor
    },
    {
      $pull: {'treatments': {'doctor': req.params.idDoctor}}
    }, function (err) {
      if (err) return res.status(500).send(err);
      return Doctor.deleteOne({"_id": req.params.idDoctor},
        function (err) {
          if (err) return res.status(500).send(err);
          return res.status(200).send();
        })
    })

};


/**
 * Create doctor
 * @param req
 * @param res
 */
exports.createDoctor = (req, res) => {

  delete req.body._id;
  const newDoctor = new Doctor(req.body);
  newDoctor.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newDoctor);
  });
};


/**
 * Update doctor
 * @param req
 * @param res
 */
exports.updateDoctor = (req, res) => {
  Doctor.findByIdAndUpdate(req.params.idDoctor, req.body, {new: true}, (err, doctor) => {
    if (err) return res.status(500).send(err);
    return res.send(doctor);
  });
};

