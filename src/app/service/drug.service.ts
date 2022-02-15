import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Drug} from "../model/drug.model";
import {Doctor} from "../model/doctor.model";
import {Patient} from "../model/patient.model";

@Injectable({ providedIn: 'root' })
export class DrugService {

  private baseUrl = 'http://localhost:8080/api/drug';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  constructor(private http: HttpClient) {
  }

  get(id: string): Observable<Drug> {
    return this.http.get<Drug>(`${this.baseUrl}/${id}`);
  }

  getAll(): Observable<Drug[]> {
    return this.http.get<Drug[]>(this.baseUrl);
  }


  add(drug: Drug) {
    return this.http.post<Drug>(`${this.baseUrl}/`, drug, this.httpOptions);
  }

  update(drug: Drug) {
    return this.http.put<Drug>(`${this.baseUrl}/${drug._id}`, drug, this.httpOptions);
  }

  removeDrug(drug: Drug) {
    return this.http.delete<Drug>(`${this.baseUrl}/${drug._id}`, this.httpOptions);
  }



}
