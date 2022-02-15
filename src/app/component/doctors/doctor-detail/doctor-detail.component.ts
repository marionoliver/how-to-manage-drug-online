import {Component, Input, OnInit} from '@angular/core';
import {PatientService} from "../../../service/patient.service";
import {Doctor} from "../../../model/doctor.model";
import {Patient} from "../../../model/patient.model";

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
})
export class DoctorDetailComponent implements OnInit {
  @Input() doctor: Doctor | null = null;
  patients: Array<Patient> = [];

  constructor(private patientService: PatientService) {
  }

  ngOnInit(): void {
    if (this.doctor) {
      // Get and set all patient of the doctor
      this.patientService.getByDoctor(this.doctor).subscribe(patients => {
        this.patients = patients.filter(patient => {
          patient.treatments = patient.treatments.filter(treatment => {
            return treatment.doctor == this.doctor?._id
          });
          return patient
        });
      });
    }
  }

}
