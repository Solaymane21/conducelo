package com.example.demo.config;

import com.example.demo.model.ERole;
import com.example.demo.model.Role;
import com.example.demo.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Initializes required reference data (roles) on application startup.
 * Only inserts roles if they don't already exist in the database.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {
        if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_USER));
            logger.info("Role ROLE_USER has been initialized.");
        }

        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
            logger.info("Role ROLE_ADMIN has been initialized.");
        }

        logger.info("Data initialization completed. Roles are ready.");
    }
}
