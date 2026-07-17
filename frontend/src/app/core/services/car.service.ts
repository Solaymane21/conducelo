import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarRequest, CarResponse } from '../models/car.model';

/**
 * service for interacting with the car listings api endpoints.
 */
@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = '/api/cars';

  constructor(private http: HttpClient) {}

  getAllActiveCars(): Observable<CarResponse[]> {
    return this.http.get<CarResponse[]>(this.apiUrl);
  }

  getCarById(id: number): Observable<CarResponse> {
    return this.http.get<CarResponse>(`${this.apiUrl}/${id}`);
  }

  getMyCars(): Observable<CarResponse[]> {
    return this.http.get<CarResponse[]>(`${this.apiUrl}/my-cars`);
  }

  createCar(car: CarRequest): Observable<CarResponse> {
    return this.http.post<CarResponse>(this.apiUrl, car);
  }

  updateCar(id: number, car: CarRequest): Observable<CarResponse> {
    return this.http.put<CarResponse>(`${this.apiUrl}/${id}`, car);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
