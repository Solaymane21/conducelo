import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarService } from '../../../core/services/car.service';
import { CarResponse } from '../../../core/models/car.model';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: CarResponse | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.fetchCar(id);
    }
  }

  fetchCar(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.carService.getCarById(id).subscribe({
      next: (data) => {
        this.car = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('error fetching car details:', err);
        this.errorMessage = 'failed to load car details.';
        this.isLoading = false;
      }
    });
  }
}
