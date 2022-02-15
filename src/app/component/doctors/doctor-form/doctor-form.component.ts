import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Patient} from "../../../model/patient.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../../service/patient.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PatientListComponent} from "../../patients/patient-list/patient-list.component";
import {Doctor} from "../../../model/doctor.model";
import {DoctorService} from "../../../service/dotor.service";

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
})
export class DoctorFormComponent implements OnInit {

  @Output() add = new EventEmitter<Doctor>();

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
  })

  constructor(private fb: FormBuilder, private doctorService: DoctorService,
              public dialogRef: MatDialogRef<PatientListComponent>,
              @Inject(MAT_DIALOG_DATA) public doctor: Doctor,) {
  }

  ngOnInit(): void {
    //Init form with doctor value if edit form
    if (this.doctor) {
      this.form.get('firstName')?.setValue(this.doctor.firstName);
      this.form.get('lastName')?.setValue(this.doctor.lastName);
      this.form.get('speciality')?.setValue(this.doctor.speciality);
    }
  }


  submit() {
    if (!this.doctor) {
      // Add doctor if edit form
      this.doctor = new Doctor(
        null,
        this.form.get('firstName')?.value,
        this.form.get('lastName')?.value,
        this.form.get('speciality')?.value,
      )
      this.doctorService.addDoctor(this.doctor).subscribe(res => {
        this.add.emit(res);
        this.dialogRef.close();
      });
    } else {
      // Edit doctor if edit form
      this.doctor.firstName = this.form.get('firstName')?.value;
      this.doctor.lastName = this.form.get('lastName')?.value;
      this.doctor.speciality = this.form.get('speciality')?.value;
      this.doctorService.updateDoctor(
        this.doctor
      ).subscribe(res => {
        this.dialogRef.close();
      });
    }

  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get speciality() {
    return this.form.get('speciality');
  }
}
