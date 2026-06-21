package com.example.restapi.intro.configs;

import com.example.restapi.intro.auth.entity.Role;
import com.example.restapi.intro.auth.entity.UserEntity;
import com.example.restapi.intro.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer
        implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(
            ApplicationArguments args
    ) {

        if (
                userRepository
                        .findByUsername("bhargav")
                        .isEmpty()
        ) {

            UserEntity admin =
                    UserEntity.builder()
                            .username("bhargav")
                            .password(
                                    passwordEncoder.encode(
                                            "1234"
                                    )
                            )
                            .role(Role.ADMIN)
                            .build();

            userRepository.save(admin);

            System.out.println(
                    "Admin account created successfully"
            );
        }
    }
}