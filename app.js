const { faker } = require('@faker-js/faker');
var Patient = require('./backend/model/patient.model.js');

var Drug = require('./backend/model/drug.model.js');
var Doctor = require('./backend/model/doctor.model.js');
var cors = require('cors');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

require('./backend/router/router.js')(app);


// Configuring the database
const config = require('./backend/config/config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  }).catch(err => {
  console.log('Could not connect to MongoDB.');
  process.exit();
});

// Create a Server
var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port)
});

/**
 * to init with account
 */
function initial() {

  Doctor.count((err, count) => {
    if (!err && count === 0) {
      new Doctor({
        firstName: 'Morin',
        lastName: 'Philippe',
        speciality: 'Oncologue'
      }).save();
      new Doctor({
        firstName: 'Morin',
        lastName: 'Jacqueline',
        speciality: 'Urologue'
      }).save();

      new Drug({
        code: 'DOLI',
        name: 'Doliprane'
      }).save(function(err,drug){
        new Patient({
          firstName: 'Marion',
          lastName: 'Oliver',
          age: 25,
          sex: 'Female',
          drugs: [
            drug._id
          ],
          treatments: []
        }).save();
      });




    }
  });
}

function mockDrug() {
  return new Drug({
    name: faker.commerce.product(),
    code: faker.datatype.string(6)
  });
}

function mockTreatment(i) {
  const gender = faker.name.gender(i % 2 == 0);
  return new Treatment({
    start:faker.date.past(),
    end: faker.date.future(),
    text: faker.lorem.sentence(),
    doctor: new Doctor({
      firstName:faker.name.firstName(gender),
      lastName: faker.name.lastName(gender),
      speciality: faker.commerce.department(),
    }).save()
  });
}

function mockPatient(j) {
  const gender = faker.name.gender(j % 2 == 0);
    return new Patient({
      firstName: faker.name.firstName(gender),
      lastName: faker.name.lastName(gender),
      age: faker.datatype.number({ max: 100 }),
      sex: gender,
      drugs: [mockDrug().save()],
      treatments: [mockTreatment(j).save()]
    });
}
