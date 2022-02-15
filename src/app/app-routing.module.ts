import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PatientListComponent} from "./component/patients/patient-list/patient-list.component";
import {DoctorListComponent} from "./component/doctors/doctor-list/doctor-list.component";
import {PatientDetailComponent} from "./component/patients/patient-detail/patient-detail.component";
import {DrugListComponent} from "./component/drugs/drug-list/drug-list.component";
import {HomeComponent} from "./component/home/home.component";



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'patient', component: PatientListComponent },
  { path: 'patient/:id', component: PatientDetailComponent },
  { path: 'doctor', component: DoctorListComponent },
  { path: 'drug', component: DrugListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
