import {Component, OnInit, ViewChild} from '@angular/core';
import {Doctor} from "../../../model/doctor.model";
import {DoctorService} from "../../../service/dotor.service";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DoctorFormComponent} from "../doctor-form/doctor-form.component";
import {MatTableDataSource} from "@angular/material/table";
import {Patient} from "../../../model/patient.model";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
})
export class DoctorListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'speciality', 'patients', 'actions'];
  doctors: Doctor[] = [];
  doctorsDataSource!: MatTableDataSource<Doctor>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private doctorService: DoctorService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Get all doctors
    this.getDoctors();
  }

  getDoctors(): void {
    this.doctorService.getDoctors()
      .subscribe(doctors => {
        this.doctors = doctors;
        this.doctorsDataSource = new MatTableDataSource<Doctor>(doctors);
        this.doctorsDataSource.paginator = this.paginator;
      });
  }


  // Open doctor form component in modal
  openEditDialog(doctor: Doctor | null = null): void {
    const dialogRef = this.dialog.open(DoctorFormComponent, {
      width: '500px',
      data: doctor,
    });

    dialogRef.componentInstance.add.subscribe(result => {
      const data = this.doctorsDataSource.data;
      data.push(result);
      this.doctorsDataSource.data = data;
    });

  }


  // Open delete confirm
  openDeleteDialog(doctor: Doctor): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
    });

    dialogRef.componentInstance.response.subscribe(response => {
      if (response) {
        this.doctorService.removeDoctor(doctor).subscribe(res => {
          const data = this.doctorsDataSource.data;
          this.doctorsDataSource.data = data.filter(data => data._id != doctor._id);

        });
      }
    });
  }

}
