package com.example.demo.config;

import com.example.demo.model.Car;
import com.example.demo.model.ERole;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.CarRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

/**
 * initializes required reference data (roles, sample users and cars) on startup.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository, UserRepository userRepository, CarRepository carRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // initialize roles
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseGet(() -> {
                    Role role = roleRepository.save(new Role(ERole.ROLE_USER));
                    logger.info("role role_user has been initialized.");
                    return role;
                });

        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseGet(() -> {
                    Role role = roleRepository.save(new Role(ERole.ROLE_ADMIN));
                    logger.info("role role_admin has been initialized.");
                    return role;
                });

        // initialize default users and cars if empty
        if (userRepository.count() == 0) {
            Set<Role> roles = new HashSet<>();
            roles.add(userRole);

            // create a demo user
            User demoUser = new User("driver1", "driver1@conducelo.com", passwordEncoder.encode("password"));
            demoUser.setRoles(roles);
            userRepository.save(demoUser);
            logger.info("default demo user 'driver1' created.");

            // create sample cars owned by driver1
            Car car1 = new Car("Seat", "Ibiza", 2021, "Red", 35.0, "Madrid", "Reliable and economic car, perfect for city driving.", demoUser);
            Car car2 = new Car("Tesla", "Model 3", 2023, "White", 85.0, "Barcelona", "Full electric premium sedan with Autopilot enabled.", demoUser);
            Car car3 = new Car("Peugeot", "3008", 2022, "Grey", 50.0, "Valencia", "Spacious family SUV, comfortable for long trips.", demoUser);

            carRepository.save(car1);
            carRepository.save(car2);
            carRepository.save(car3);
            logger.info("sample cars initialized.");
        }

        logger.info("data initialization completed successfully.");
    }
}
