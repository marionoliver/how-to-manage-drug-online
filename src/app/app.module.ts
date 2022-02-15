import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PatientDetailComponent } from './component/patients/patient-detail/patient-detail.component';
import { PatientListComponent } from './component/patients/patient-list/patient-list.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import { AppRoutingModule } from './app-routing.module';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { DoctorListComponent } from './component/doctors/doctor-list/doctor-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientFormComponent } from './component/patients/patient-form/patient-form.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import { TreatmentFormComponent } from './component/treatments/treatment-form/treatment-form.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { DoctorDetailComponent } from './component/doctors/doctor-detail/doctor-detail.component';
import {MatButtonModule} from "@angular/material/button";
import { DoctorFormComponent } from './component/doctors/doctor-form/doctor-form.component';
import { PatientDrugFormComponent } from './component/drugs/patient-drug-form/patient-drug-form.component';
import { DrugListComponent } from './component/drugs/drug-list/drug-list.component';
import { DrugFormComponent } from './component/drugs/drug-form/drug-form.component';
import { HomeComponent } from './component/home/home.component';
import {MatListModule} from "@angular/material/list";

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    PatientDetailComponent,
    PatientListComponent,
    AppComponent,
    DoctorListComponent,
    PatientFormComponent,
    TreatmentFormComponent,
    ConfirmDialogComponent,
    DoctorDetailComponent,
    DoctorFormComponent,
    PatientDrugFormComponent,
    DrugListComponent,
    DrugFormComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatListModule
  ],
  providers: [

    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
