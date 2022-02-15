const Patient = require("../model/patient.model.js");

/**
 * Get all patients
 * @param req
 * @param res
 */
exports.getAllPatient = (req, res) => {
  Patient.find({})
    .populate('drugs')
    .exec((err, patients) => {
      if (err) {
        return res.status(500).send({
          message: "Interne error"
        });
      }
      res.status(200).send(
        patients
      );
    });
};

/**
 * Create patient
 * @param req
 * @param res
 */
exports.createPatient = (req, res) => {

  delete req.body._id;
  const newPatient = new Patient(req.body);
  newPatient.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newPatient);
  });
};

/**
 * Delete patient
 * @param req
 * @param res
 */
exports.deletePatient = (req, res) => {
  Patient.deleteOne({"_id": req.params.idPatient},
    function (err) {
      if (err) return res.status(500).send(err);
      return res.status(200).send();
    })
};

/**
 * Update patient
 * @param req
 * @param res
 */
exports.updatePatient = (req, res) => {
  Patient.findByIdAndUpdate(req.params.idPatient, req.body, {new: true})
    .populate('drugs')
    .exec((err, patient) => {
      if (err) {
        return res.status(500).send({
          message: "Interne error"
        });
      }
      res.status(200).send(
        patient
      );
    });
};

/**
 * Update the treatment of a patient
 * @param req
 * @param res
 */
exports.updateTreatment = (req, res) => {
  Patient.findOneAndUpdate(
    {"_id": req.params.idPatient, "treatments._id": req.params.idTreatment},
    {
      "$set": {
        "treatments.$": req.body
      }
    },
    function (err, doc) {
      if (err) {
        return res.status(500).send({
          message: "Interne error"
        });
      }
      res.status(200).send(
        doc
      );
    }
  );
};

/**
 * Delete the treatment of a patient
 * @param req
 * @param res
 */
exports.deleteTreatment = (req, res) => {
  Patient.findOneAndUpdate(
    {"_id": req.params.idPatient},
    {
      "$pull": {
        "treatments": {"_id": req.params.idTreatment}
      }
    },
    {new: true},
    function (err, doc) {
      if (err) {
        return res.status(500).send({
          message: "Interne error"
        });
      }
      res.status(200).send(
        doc
      );
    }
  );
};


/**
 * Get patient by doctor id
 * @param req
 * @param res
 */
exports.getPatientByDoctor = (req, res) => {
  Patient.find({"treatments.doctor": req.params.idDoctor})
    .exec((err, patients) => {
      if (err) {
        return res.status(500).send({
          message: "Interne error"
        });
      }
      res.status(200).send(
        patients
      );
    });
};



