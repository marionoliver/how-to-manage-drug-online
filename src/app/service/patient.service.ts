import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {Patient} from "../model/patient.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TreatmentService} from "./treatment.service";
import {DrugService} from "./drug.service";
import {Treatment} from "../model/treatment.model";
import {Drug} from "../model/drug.model";
import {Doctor} from "../model/doctor.model";


@Injectable({providedIn: 'root'})
export class PatientService {

  baseUrl = 'http://localhost:8080/api/patient';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  drugUtils: Drug[] = [];


  constructor(private http: HttpClient, private fb: FormBuilder,
              private treatmentService: TreatmentService,
              private drugService: DrugService) {
  }


  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
  }

  get(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  getByDoctor(doctor: Doctor): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/doctor/${doctor._id}`);
  }


  addPatient(patient: Patient) {
    return this.http.post<Patient>(`${this.baseUrl}/`, patient, this.httpOptions);
  }

  updatePatient(patient: Patient) {
    return this.http.put<any>(`${this.baseUrl}/${patient._id}`, patient, this.httpOptions);
  }


  removePatient(patient: Patient) {
    return this.http.delete<Patient>(`${this.baseUrl}/${patient._id}`, this.httpOptions);
  }

  updatePatientTreatment(patient: Patient, treatment: Treatment) {
    return this.http.put<Patient>(`${this.baseUrl}/${patient._id}/treatment/${treatment._id}`, treatment, this.httpOptions);
  }

  removePatientTreatment(patient: Patient, treatment: Treatment) {
    return this.http.delete<Patient>(`${this.baseUrl}/${patient._id}/treatment/${treatment._id}`, this.httpOptions);
  }

  // getAndSetDetailsPatient(patient: Patient): Array<Drug> {
  //       this.getByPatient(patient._id).subscribe(res => {
  //
  //         that.drugUtils.push(res);
  //       });
  //       console.log(that.drugUtils);
  //     });
  //   }
  //   console.log(this.drugUtils);
  //   console.log(that.drugUtils);
  //   return [];
  // }


}
