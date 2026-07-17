package com.example.demo.service;

import com.example.demo.dto.request.CarRequest;
import com.example.demo.dto.response.CarResponse;

import java.util.List;

/**
 * service interface for handling car-related business operations.
 */
public interface CarService {

    CarResponse createCar(CarRequest request, String ownerUsername);

    CarResponse updateCar(Long id, CarRequest request, String currentUsername);

    void deleteCar(Long id, String currentUsername);

    List<CarResponse> getAllActiveCars();

    List<CarResponse> getCarsByOwner(String username);

    CarResponse getCarById(Long id);
}
