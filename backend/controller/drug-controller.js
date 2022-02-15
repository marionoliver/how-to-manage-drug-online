const Drug = require("../model/drug.model.js");
const Doctor = require("../model/doctor.model.js");
const Patient = require("../model/patient.model.js");

/**
 * Get drug by id
 * @param req
 * @param res
 */
exports.getDrug = (req, res) => {
  Drug.findById(req.params.idDrug)
    .exec((err, drug) => {
      if (err) {
        return res.status(500).send({
          message: "Can't get drug with id".req.params.idDrug
        });
      }
      res.status(200).send(
        drug
      );
    });
};

/**
 * Get all drugs
 * @param req
 * @param res
 */
exports.getAll = (req, res) => {
  Drug.find({})
    .exec((err, drugs) => {
      if (err) {
        return res.status(500).send({
          message: "Can't get all drugs"
        });
      }
      res.status(200).send(
        drugs
      );
    });
};


/**
 * Delete drug
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
  Patient.updateMany(
    {
      'drugs': req.params.idDrug
    },
    {
      $pull: {'drugs': req.params.idDrug}
    }, function (err) {
      if (err) return res.status(500).send(err);
      return Drug.deleteOne({"_id": req.params.idDrug},
        function (err) {
          if (err) return res.status(500).send(err);
          return res.status(200).send();
        })
    })

};


/**
 * Create drug
 * @param req
 * @param res
 */
exports.create = (req, res) => {

  delete req.body._id;
  const newDrug = new Drug(req.body);
  newDrug.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newDrug);
  });
};


/**
 * Update drug
 * @param req
 * @param res
 */
exports.update = (req, res) => {
  Drug.findByIdAndUpdate(req.params.idDrug, req.body, {new: true}, (err, drug) => {
    if (err) return res.status(500).send(err);
    return res.send(drug);
  });
};
