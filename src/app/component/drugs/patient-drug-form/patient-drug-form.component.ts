import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PatientDetailComponent} from "../../patients/patient-detail/patient-detail.component";
import {Drug} from "../../../model/drug.model";
import {DrugService} from "../../../service/drug.service";

@Component({
  selector: 'app-patient-drug-form',
  templateUrl: './patient-drug-form.component.html',
})
export class PatientDrugFormComponent implements OnInit {

  drugsOption: Drug[] = [];

  form: FormGroup = new FormGroup({
    drugs: new FormControl('')
  });
  @Output() result = new EventEmitter<string[]>();

  constructor(public dialogRef: MatDialogRef<PatientDetailComponent>,
              private drugService: DrugService,
              @Inject(MAT_DIALOG_DATA) public drugs: Drug[]) {
  }

  ngOnInit(): void {
    // Get all drugs
    this.drugService.getAll().subscribe(drugs => {
      this.drugsOption = drugs
    })

    // Set form value if edit form
    if (this.drugs) {
      this.form.get('drugs')?.setValue(this.drugs.map((drug: Drug) => drug._id));
    }
  }

  submit() {
    this.result.emit(this.form.get('drugs')?.value);
    this.dialogRef.close();

  }
}
