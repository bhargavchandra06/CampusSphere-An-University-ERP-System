package com.example.restapi.intro.configs;


import com.example.restapi.intro.auth.AuditorAwareImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "getAuditorImpl")
public class AuditingConfig {
    @Bean
    AuditorAware<String> getAuditorImpl()
    {
        return new AuditorAwareImpl();
    }

}
