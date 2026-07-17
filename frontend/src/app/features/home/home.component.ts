import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CarService } from '../../core/services/car.service';
import { CarResponse } from '../../core/models/car.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cars: CarResponse[] = [];
  filteredCars: CarResponse[] = [];
  searchQuery = '';
  isLoading = false;
  errorMessage = '';

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.fetchCars();
  }

  fetchCars(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.carService.getAllActiveCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.filteredCars = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('error fetching cars:', err);
        this.errorMessage = 'failed to load cars. please check the server.';
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredCars = this.cars;
      return;
    }

    this.filteredCars = this.cars.filter(car => 
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.location.toLowerCase().includes(query) ||
      (car.description && car.description.toLowerCase().includes(query))
    );
  }
}
