import {Component, OnInit, ViewChild} from '@angular/core';
import {Patient} from "../../../model/patient.model";
import {PatientService} from "../../../service/patient.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {PatientFormComponent} from "../patient-form/patient-form.component";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
})
export class PatientListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'sex', 'actions'];
  patients!: Patient[];
  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private patientService: PatientService,
              public dialog: MatDialog,
              private router: Router,
              private titleService: Title) {
  }

  ngOnInit(): void {
    // Get all patients
    this.getPatients();
    this.titleService.setTitle('Patient\'s list');
  }


  getPatients(): void {
    this.patientService.getAll()
      .subscribe(patients => {
        this.patients = patients;
        this.dataSource = new MatTableDataSource<Patient>(patients);
        this.dataSource.paginator = this.paginator;
      });
  }


  // Open Patient form component in modal
  openEditDialog(patient: Patient | null = null): void {
    const dialogRef = this.dialog.open(PatientFormComponent, {
      width: '500px',
      data: patient,
    });

    dialogRef.componentInstance.add.subscribe(result => {
      if (patient?._id != result._id) {
        const data = this.dataSource.data;
        data.push(result);
        this.dataSource.data = data;
      } else {

        let data = this.dataSource.data;
        data = data.map(patient => {
          if (patient._id == result._id) {
            patient.drugs = result.drugs;
          }
          return patient;
        });
        this.dataSource.data = data;
      }
    });

  }


  // Edit patient form component in modal
  openDeleteDialog(patient: Patient): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.response.subscribe(response => {
      if (response) {
        this.patientService.removePatient(patient).subscribe(res => {
          const data = this.dataSource.data;
          this.dataSource.data = data.filter(data => data._id != patient._id);

        });
      }
    });
  }

  // navigate to patient details
  goToDetails(patient: Patient) {
    console.log(patient);
    this.router.navigate(['/patient/' + patient._id], {
      state: patient
    });
  }

}
