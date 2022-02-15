import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TreatmentService} from "../../../service/treatment.service";
import {Treatment} from "../../../model/treatment.model";
import {Doctor} from "../../../model/doctor.model";
import {DoctorService} from "../../../service/dotor.service";
import {PatientDetailComponent} from "../../patients/patient-detail/patient-detail.component";

@Component({
  selector: 'app-treatment-form',
  templateUrl: './treatment-form.component.html',
})
export class TreatmentFormComponent implements OnInit {


  doctors: Doctor[] = [];

  form: FormGroup = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    doctor: new FormControl('', Validators.required),
  })

  constructor(private fb: FormBuilder, private treatmentService: TreatmentService,
              public dialogRef: MatDialogRef<PatientDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public treatment: Treatment,
              private doctorService: DoctorService) {
  }

  @Output() result = new EventEmitter<Treatment>();

  ngOnInit(): void {
    // Get all doctors for select input
    this.doctorService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });

    // Set form value if edit form
    if (this.treatment) {
      this.form.get('start')?.setValue(this.treatment.start);
      this.form.get('end')?.setValue(this.treatment.end);
      this.form.get('text')?.setValue(this.treatment.text);
      this.form.get('doctor')?.setValue(this.treatment.doctor);
    } else {

    }
  }


  submit() {
    // create or edit treatment
    if (!this.treatment) {
      this.treatment = new Treatment(
        this.form.get('start')?.value,
        this.form.get('end')?.value,
        this.form.get('text')?.value,
        this.form.get('doctor')?.value
      );
    } else {
      this.treatment.start = this.form.get('start')?.value;
      this.treatment.end = this.form.get('end')?.value;
      this.treatment.text = this.form.get('text')?.value;
      this.treatment.doctor = this.form.get('doctor')?.value;
    }

    // Send new or treatment edited to parent
    this.result.emit(this.treatment);
    this.dialogRef.close();

  }

  get start() {
    return this.form.get('start');
  }

  get end() {
    return this.form.get('end');
  }

  get text() {
    return this.form.get('text');
  }

  get doctor() {
    return this.form.get('doctor');
  }
}
