import {Component, OnInit, ViewChild} from '@angular/core';
import {Doctor} from "../../../model/doctor.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DoctorService} from "../../../service/dotor.service";
import {MatDialog} from "@angular/material/dialog";
import {DoctorFormComponent} from "../../doctors/doctor-form/doctor-form.component";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {Drug} from "../../../model/drug.model";
import {DrugService} from "../../../service/drug.service";
import {DrugFormComponent} from "../drug-form/drug-form.component";

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
})
export class DrugListComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'actions'];
  drugs: Drug[] = [];
  drugsDataSource!: MatTableDataSource<Drug>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private drugService: DrugService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Get all drugs
    this.getDrugs();
  }

  getDrugs(): void {
    this.drugService.getAll()
      .subscribe(drugs => {
        this.drugs = drugs;
        this.drugsDataSource = new MatTableDataSource<Drug>(drugs);
        this.drugsDataSource.paginator = this.paginator;
      });
  }


  // Open drug form component in modal
  openEditDialog(drug: Drug | null = null): void {
    const dialogRef = this.dialog.open(DrugFormComponent, {
      width: '500px',
      data: drug,
    });

    dialogRef.componentInstance.add.subscribe(result => {
      const data = this.drugsDataSource.data;
      data.push(result);
      this.drugsDataSource.data = data;
    });

  }


  // Open confirm delete modal
  openDeleteDialog(drug: Drug): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
    });

    dialogRef.componentInstance.response.subscribe(response => {
      // if confirmed, delete drug
      if (response) {
        this.drugService.removeDrug(drug).subscribe(res => {
          const data = this.drugsDataSource.data;
          this.drugsDataSource.data = data.filter(data => data._id != drug._id);

        });
      }
    });
  }

}
