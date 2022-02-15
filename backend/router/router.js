const patientController = require("../controller/patient-controller.js");
const doctorController = require("../controller/doctor-controller.js");
const drugController = require("../controller/drug-controller.js");
module.exports = function (app) {
  const doctorController = require("../controller/doctor-controller.js");
  const patientController = require("../controller/patient-controller.js");
  const drugController = require("../controller/drug-controller.js");


  /**
   * Patients
   */
  app.get('/api/patient', patientController.getAllPatient);
  app.get('/api/patient/doctor/:idDoctor', patientController.getPatientByDoctor);
  app.post('/api/patient', patientController.createPatient);
  app.put('/api/patient/:idPatient', patientController.updatePatient);
  app.delete('/api/patient/:idPatient', patientController.deletePatient);

  /**
   * Patient's treatment
   */
  app.put('/api/patient/:idPatient/treatment/:idTreatment', patientController.updateTreatment);
  app.delete('/api/patient/:idPatient/treatment/:idTreatment', patientController.deleteTreatment);

  /**
   * Doctors
   */
  app.get('/api/doctor', doctorController.getAllDoctor);
  app.get('/api/doctor/:idDoctor', doctorController.getDoctor);
  app.post('/api/doctor', doctorController.createDoctor);
  app.put('/api/doctor/:idDoctor', doctorController.updateDoctor);
  app.delete('/api/doctor/:idDoctor', doctorController.deleteDoctor);

  /**
   * Drugs
   */
  app.get('/api/drug/:idDrug', drugController.getDrug);
  app.get('/api/drug', drugController.getAll);
  app.post('/api/drug', drugController.create);
  app.put('/api/drug/:idDrug', drugController.update);
  app.delete('/api/drug/:idDrug', drugController.delete);
};
