import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {Doctor} from "../model/doctor.model";
import {Patient} from "../model/patient.model";


@Injectable({ providedIn: 'root' })
export class DoctorService {

  private doctorUrl = 'http://localhost:8080/api/doctor';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.doctorUrl);
  }

  removeDoctor(doctor: Doctor) {
    return this.http.delete<Doctor>(`${this.doctorUrl}/${doctor._id}`, this.httpOptions);
  }


  addDoctor(doctor: Doctor) {
    return this.http.post<Doctor>(`${this.doctorUrl}/`, doctor, this.httpOptions);
  }

  updateDoctor(doctor: Doctor) {
    return this.http.put<Doctor>(`${this.doctorUrl}/${doctor._id}`, doctor, this.httpOptions);
  }




}
