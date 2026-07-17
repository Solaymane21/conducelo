package com.example.demo.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/**
 * data transfer object representing a request to create or update a car.
 */
public class CarRequest {

    @NotBlank(message = "brand is required")
    private String brand;

    @NotBlank(message = "model is required")
    private String model;

    @NotNull(message = "year is required")
    @Min(value = 1886, message = "year must be valid")
    private Integer year;

    @NotBlank(message = "color is required")
    private String color;

    @NotNull(message = "price per day is required")
    @Positive(message = "price per day must be positive")
    private Double pricePerDay;

    @NotBlank(message = "location is required")
    private String location;

    private String description;

    public CarRequest() {
    }

    // getters and setters

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(Double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
