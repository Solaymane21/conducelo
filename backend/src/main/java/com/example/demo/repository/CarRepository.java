package com.example.demo.repository;

import com.example.demo.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * spring data jpa repository for car entity operations.
 */
@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    List<Car> findByIsActiveTrue();

    List<Car> findByOwnerId(Long ownerId);

    List<Car> findByOwnerUsername(String username);
}
