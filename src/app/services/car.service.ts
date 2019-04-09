import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Car } from '../car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseUrl = 'http://localhost/angular-php/src/app/api';
  cars: Car[];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Car[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res) => {
        this.cars = res['data'];
        console.log(this.cars);
        return this.cars;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // Return an observable with a user friendly message
    return throwError('Error! Something went wrong');
  }
}
