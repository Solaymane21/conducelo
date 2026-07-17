package com.example.demo.service.impl;

import com.example.demo.dto.request.CarRequest;
import com.example.demo.dto.response.CarResponse;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Car;
import com.example.demo.model.User;
import com.example.demo.repository.CarRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.CarService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * service implementation for handling car-related business operations.
 */
@Service
@Transactional
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;
    private final UserRepository userRepository;

    public CarServiceImpl(CarRepository carRepository, UserRepository userRepository) {
        this.carRepository = carRepository;
        this.userRepository = userRepository;
    }

    @Override
    public CarResponse createCar(CarRequest request, String ownerUsername) {
        User owner = userRepository.findByUsername(ownerUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", ownerUsername));

        Car car = new Car(
                request.getBrand(),
                request.getModel(),
                request.getYear(),
                request.getColor(),
                request.getPricePerDay(),
                request.getLocation(),
                request.getDescription(),
                owner
        );

        Car savedCar = carRepository.save(car);
        return convertToResponse(savedCar);
    }

    @Override
    public CarResponse updateCar(Long id, CarRequest request, String currentUsername) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car", "id", id));

        // check ownership
        if (!car.getOwner().getUsername().equals(currentUsername)) {
            throw new RuntimeException("Error: You do not own this car!");
        }

        car.setBrand(request.getBrand());
        car.setModel(request.getModel());
        car.setYear(request.getYear());
        car.setColor(request.getColor());
        car.setPricePerDay(request.getPricePerDay());
        car.setLocation(request.getLocation());
        car.setDescription(request.getDescription());

        Car updatedCar = carRepository.save(car);
        return convertToResponse(updatedCar);
    }

    @Override
    public void deleteCar(Long id, String currentUsername) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car", "id", id));

        // check ownership
        if (!car.getOwner().getUsername().equals(currentUsername)) {
            throw new RuntimeException("Error: You do not own this car!");
        }

        carRepository.delete(car);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CarResponse> getAllActiveCars() {
        return carRepository.findByIsActiveTrue().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CarResponse> getCarsByOwner(String username) {
        return carRepository.findByOwnerUsername(username).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CarResponse getCarById(Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car", "id", id));
        return convertToResponse(car);
    }

    private CarResponse convertToResponse(Car car) {
        return new CarResponse(
                car.getId(),
                car.getBrand(),
                car.getModel(),
                car.getYear(),
                car.getColor(),
                car.getPricePerDay(),
                car.getLocation(),
                car.getDescription(),
                car.getIsActive(),
                car.getOwner().getUsername(),
                car.getOwner().getEmail()
        );
    }
}
