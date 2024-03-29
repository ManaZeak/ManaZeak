package org.manazeak.manazeak.configuration.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
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
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRequestHandler;
import org.springframework.security.web.csrf.XorCsrfTokenRequestAttributeHandler;

import java.util.function.Supplier;

/**
 * This class contains the configuration of spring security.
 */
@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfiguration {

    private static final int CSRF_SIZE = 36;
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
            log.warn("CAUTION: you are in debug mode, DON'T USE THIS IN PRODUCTION !");
            httpSecurity
                    .authorizeHttpRequests(config -> config.requestMatchers("/.~~spring-boot!~/restart").anonymous())
                    .csrf(config -> config.ignoringRequestMatchers("/.~~spring-boot!~/restart"));
        }

        XorCsrfTokenRequestAttributeHandler delegate = new XorCsrfTokenRequestAttributeHandler();
        // set the name of the attribute the CsrfToken will be populated on
        delegate.setCsrfRequestAttributeName("_csrf");
        // Creating a custom handler for the CSRF tokens. One for the BREACH and one classic for the JS responses.
        CsrfTokenRequestHandler requestHandler = new CsrfTokenRequestHandler() {
            @Override
            public void handle(HttpServletRequest request, HttpServletResponse response, Supplier<CsrfToken> csrfToken) {
                delegate.handle(request, response, csrfToken);
            }

            @Override
            public String resolveCsrfTokenValue(HttpServletRequest request, CsrfToken csrfToken) {
                String tokenValue = CsrfTokenRequestHandler.super.resolveCsrfTokenValue(request, csrfToken);
                if (tokenValue.length() == CSRF_SIZE) {
                    return tokenValue;
                }
                return delegate.resolveCsrfTokenValue(request, csrfToken);
            }
        };


        httpSecurity
                .authorizeHttpRequests(authorizeRequest -> {
                    authorizeRequest.requestMatchers("/register/", "/login/", "/logoutSuccess/").permitAll();
                    authorizeRequest.requestMatchers("/**").authenticated();
                })
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .formLogin(config -> config
                        .loginPage("/login/")
                        .defaultSuccessUrl("/", true)
                )
                .logout(config -> config.logoutSuccessUrl("/logoutSuccess/"))
                .csrf(config -> config
                        .csrfTokenRequestHandler(requestHandler)
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                )
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
