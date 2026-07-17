import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CarService } from '../../../core/services/car.service';
import { CarResponse, CarRequest } from '../../../core/models/car.model';

@Component({
  selector: 'app-my-cars',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DialogModule
  ],
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.css']
})
export class MyCarsComponent implements OnInit {
  cars: CarResponse[] = [];
  carForm: FormGroup;
  carDialog = false;
  selectedCarId: number | null = null;
  submitted = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private carService: CarService
  ) {
    this.carForm = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1886)]],
      color: ['', [Validators.required]],
      pricePerDay: [0, [Validators.required, Validators.min(1)]],
      location: ['', [Validators.required]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.fetchMyCars();
  }

  fetchMyCars(): void {
    this.isLoading = true;
    this.carService.getMyCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('error loading user cars:', err);
        this.errorMessage = 'failed to load your listings.';
        this.isLoading = false;
      }
    });
  }

  openNew(): void {
    this.selectedCarId = null;
    this.submitted = false;
    this.carForm.reset({
      year: new Date().getFullYear(),
      pricePerDay: 0
    });
    this.carDialog = true;
  }

  editCar(car: CarResponse): void {
    this.selectedCarId = car.id;
    this.submitted = false;
    this.carForm.patchValue({
      brand: car.brand,
      model: car.model,
      year: car.year,
      color: car.color,
      pricePerDay: car.pricePerDay,
      location: car.location,
      description: car.description
    });
    this.carDialog = true;
  }

  deleteCar(car: CarResponse): void {
    if (confirm(`are you sure you want to delete ${car.brand} ${car.model}?`)) {
      this.carService.deleteCar(car.id).subscribe({
        next: () => {
          this.cars = this.cars.filter(c => c.id !== car.id);
        },
        error: (err) => {
          console.error('error deleting car:', err);
          alert('failed to delete listing.');
        }
      });
    }
  }

  hideDialog(): void {
    this.carDialog = false;
    this.submitted = false;
  }

  saveCar(): void {
    this.submitted = true;

    if (this.carForm.invalid) {
      this.carForm.markAllAsTouched();
      return;
    }

    const carData: CarRequest = this.carForm.value;

    if (this.selectedCarId) {
      // update listing
      this.carService.updateCar(this.selectedCarId, carData).subscribe({
        next: (updatedCar) => {
          const index = this.cars.findIndex(c => c.id === updatedCar.id);
          if (index !== -1) {
            this.cars[index] = updatedCar;
          }
          this.carDialog = false;
        },
        error: (err) => {
          console.error('error updating car:', err);
          alert('failed to update listing.');
        }
      });
    } else {
      // create new listing
      this.carService.createCar(carData).subscribe({
        next: (newCar) => {
          this.cars.push(newCar);
          this.carDialog = false;
        },
        error: (err) => {
          console.error('error creating car:', err);
          alert('failed to create listing.');
        }
      });
    }
  }
}
