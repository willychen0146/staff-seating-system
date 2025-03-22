package com.company.seating.config;

import com.company.seating.model.User;
import com.company.seating.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner initDefaultUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String defaultUsername = "admin";
            String defaultPassword = "admin"; // Change this in production!

            if (userRepository.findByUsername(defaultUsername).isEmpty()) {
                User defaultUser = new User();
                defaultUser.setUsername(defaultUsername);
                defaultUser.setPassword(passwordEncoder.encode(defaultPassword));
                userRepository.save(defaultUser);
                System.out.println("Default user created: " + defaultUsername);
            }
        };
    }
}
