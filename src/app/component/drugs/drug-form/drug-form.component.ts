import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Drug} from "../../../model/drug.model";
import {DrugService} from "../../../service/drug.service";
import {DrugListComponent} from "../drug-list/drug-list.component";

@Component({
  selector: 'app-drug-form',
  templateUrl: './drug-form.component.html',
})
export class DrugFormComponent implements OnInit {

  @Output() add = new EventEmitter<Drug>();

  form: FormGroup = new FormGroup({
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  })

  constructor(private fb: FormBuilder, private drugService: DrugService,
              public dialogRef: MatDialogRef<DrugListComponent>,
              @Inject(MAT_DIALOG_DATA) public drug: Drug,) {
  }

  ngOnInit(): void {
    if (this.drug) {
      // Init form if edit form
      this.form.get('code')?.setValue(this.drug.code);
      this.form.get('name')?.setValue(this.drug.name);
    }
  }


  submit() {
    if (!this.drug) {
      // Add drug if add form
      this.drug = new Drug()
      this.drug.code = this.form.get('code')?.value;
      this.drug.name = this.form.get('name')?.value;
      this.drugService.add(this.drug).subscribe(res => {
        this.add.emit(res);
        this.dialogRef.close();
      });
    } else {
      // Edit drug if edit form
      this.drug.code = this.form.get('code')?.value;
      this.drug.name = this.form.get('name')?.value;
      this.drugService.update(
        this.drug
      ).subscribe(res => {
        this.dialogRef.close();
      });
    }

  }

  get code() {
    return this.form.get('code');
  }

  get name() {
    return this.form.get('name');
  }

}
