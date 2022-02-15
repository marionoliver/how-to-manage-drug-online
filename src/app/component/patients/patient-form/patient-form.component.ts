import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Patient} from "../../../model/patient.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../../service/patient.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PatientListComponent} from "../patient-list/patient-list.component";

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
})
export class PatientFormComponent implements OnInit {

  @Output() add = new EventEmitter<Patient>();

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
  })

  constructor(private fb: FormBuilder, private patientService: PatientService,
              public dialogRef: MatDialogRef<PatientListComponent>,
              @Inject(MAT_DIALOG_DATA) public patient: Patient,) {
  }

  ngOnInit(): void {
    if (this.patient) {
      // Init form values with patient if edit form
      this.form.get('firstName')?.setValue(this.patient.firstName);
      this.form.get('lastName')?.setValue(this.patient.lastName);
      this.form.get('age')?.setValue(this.patient.age);
      this.form.get('sex')?.setValue(this.patient.sex);
    }
  }


  submit() {
    if (!this.patient) {
      // Add patient if add form
      this.patient = new Patient(
        null,
        this.form.get('firstName')?.value,
        this.form.get('lastName')?.value,
        this.form.get('age')?.value,
        this.form.get('sex')?.value,
        [],
        []
      )
      this.patientService.addPatient(this.patient).subscribe(res => {
        this.add.emit(res);
        this.dialogRef.close();
      });
    } else {
      // Edit patient if edit form
      this.patient.firstName = this.form.get('firstName')?.value;
      this.patient.lastName = this.form.get('lastName')?.value;
      this.patient.age = this.form.get('age')?.value;
      this.patient.sex = this.form.get('sex')?.value;
      this.patient.drugs = this.patient.drugs.map((drug: any) => drug._id);
      this.patientService.updatePatient(
        this.patient
      ).subscribe(res => {
        this.add.emit(res);
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

  get age() {
    return this.form.get('age');
  }

  get sex() {
    return this.form.get('sex');
  }

}
