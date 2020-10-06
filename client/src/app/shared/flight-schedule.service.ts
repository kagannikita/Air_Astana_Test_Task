import { FlightSchedule } from './flight-schedule.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightScheduleService {
  formData: FlightSchedule = {
    Delay: null,
    StartCity: null,
    EndCity: null,
    StartDate: null,
    EndDate: null,
    FSId: null
  };

  readonly rootURL = 'http://localhost:54277/api';
  list: FlightSchedule[];

  constructor(private http: HttpClient) { }


  postFlightSchedule(): Observable<any>{
    return this.http.post(this.rootURL + '/FlightSchedule', this.formData);
  }
  putFlightSchedule(): Observable<any> {
    return this.http.put(this.rootURL + '/FlightSchedule/' + this.formData.FSId, this.formData);
  }
  deleteFlightSchedule(id): Observable<any> {
    return this.http.delete(this.rootURL + '/FlightSchedule/' + id);
  }

  refreshList(): void {
    this.http.get(this.rootURL + '/FlightSchedule')
      .pipe(map((response: FlightSchedule[]) => {return response.sort((a: FlightSchedule, b: FlightSchedule) => {
        return +new Date(a.StartDate) - +new Date(b.StartDate);
      }); })).subscribe(list => {
      this.list = list;
    });
  }
}
