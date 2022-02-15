import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Treatment} from "../model/treatment.model";

@Injectable({ providedIn: 'root' })
export class TreatmentService {

  private baseUrl = 'http://localhost:8080/api/treatment';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  add(treatment: Treatment) {
    return this.http.post<Treatment>(`${this.baseUrl}/`, treatment, this.httpOptions);
  }





}
