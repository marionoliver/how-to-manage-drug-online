import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../model/patient.model";
import {PatientService} from "../../../service/patient.service";
import {MatDialog} from "@angular/material/dialog";
import {Treatment} from "../../../model/treatment.model";
import {TreatmentFormComponent} from "../../treatments/treatment-form/treatment-form.component";
import {Drug} from "../../../model/drug.model";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {MatTableDataSource} from "@angular/material/table";
import {PatientDrugFormComponent} from "../../drugs/patient-drug-form/patient-drug-form.component";


@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
})
export class PatientDetailComponent implements OnInit {
  displayedColumnsTreatment: string[] = ['start', 'end', 'text', 'actions'];
  displayedColumnsDrug: string[] = ['code', 'name'];

  patient!: Patient;
  drugsDataSource = new MatTableDataSource<Drug>();
  drugs: Drug[] = [];

  treatments = new MatTableDataSource<Treatment>();


  constructor(private patientService: PatientService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Set patient info
    if (history.state) {
      if (history.state.drugs) {
        // Set drugs if patient has drugs
        this.drugsDataSource.data = history.state.drugs;

        this.drugs = history.state.drugs;
        history.state.drugs = history.state.drugs.map((drug: Drug) => drug._id);
      } else {
        // Init empty drugs
        this.drugsDataSource.data = [];
        this.drugs = [];
      }
      this.patient = history.state;
      this.treatments.data = this.patient.treatments;
    }
  }

  // Open drug form component
  openDrugDialog(drugs: Drug[]): void {
    const dialogRef = this.dialog.open(PatientDrugFormComponent, {
      width: '500px',
      data: drugs,
    });

    dialogRef.componentInstance.result.subscribe(result => {
      this.patient.drugs = result;
      this.patientService.updatePatient(this.patient).subscribe(res => {
        this.drugsDataSource.data = res.drugs;
        this.drugs = res.drugs;
        res.drugs = res.drugs.map((drug: Drug) => drug._id);
        this.patient = res;
      });
    });
  }

  // Open treatment form component
  openTreatmentDialog(treatment: Treatment | null = null): void {
    const dialogRef = this.dialog.open(TreatmentFormComponent, {
      width: '500px',
      data: treatment,
    });

    dialogRef.componentInstance.result.subscribe(result => {
      if (treatment) {
        this.patientService.updatePatientTreatment(this.patient, result).subscribe();
      } else {
        this.patient.treatments.push(result);
        this.patientService.updatePatient(this.patient).subscribe(res => {
          this.patient.treatments.pop();
          const data = this.treatments.data;
          data.push(res.treatments[res.treatments.length - 1]);
          this.treatments.data = data;
        });
      }
    });
  }

  // Open confirm delete dialog
  openDeleteTreatmentDialog(treatment: Treatment): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
    });

    dialogRef.componentInstance.response.subscribe(response => {
      if (response) {
        this.patientService.removePatientTreatment(this.patient, treatment).subscribe(res => {

            this.treatments.data = res.treatments;
          }
        );
      }
    });
  }
}
