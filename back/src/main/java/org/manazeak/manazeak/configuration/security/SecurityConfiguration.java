package org.manazeak.manazeak.configuration.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

/**
 * This class contains the configuration of spring security.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private static final Logger LOG = LoggerFactory.getLogger(SecurityConfiguration.class);
    @Value("${app.dev}")
    private boolean devMode;

    /**
     * Setting the context of the security to the local thread.
     */
    public SecurityConfiguration() {
        SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_INHERITABLETHREADLOCAL);
    }

    /**
     * Configuration access permissions of the urls.
     *
     * @param httpSecurity Configuration object for the security.
     */
    @Bean
    public SecurityFilterChain filterChain(final HttpSecurity httpSecurity) throws Exception {
        // Allowing the spring dev tools.
        if (devMode) {
            LOG.warn("CAUTION: you are in debug mode, DON'T USE THIS IN PRODUCTION !");
            httpSecurity
                    .authorizeHttpRequests()
                    .requestMatchers("/.~~spring-boot!~/restart")
                    .anonymous()
                    .and()
                    .csrf().ignoringRequestMatchers("/.~~spring-boot!~/restart");
        }
        httpSecurity
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // Creates a session if required.
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/register/", "/login/", "/logoutSuccess/").permitAll()
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/**").authenticated()
                .and()
                .formLogin()
                .loginPage("/login/")
                .defaultSuccessUrl("/", true)
                .and()
                .logout().logoutSuccessUrl("/logoutSuccess/")
                .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        ;

        return httpSecurity.build();
    }

    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    /**
     * @return Hashing algorithm for the password.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
