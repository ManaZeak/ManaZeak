package org.manazeak.manazeak.configuration.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * This class contains the configuration of spring security.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private static final Logger LOG = LoggerFactory.getLogger(SecurityConfiguration.class);
    @Value("${app.dev}")
    private boolean devMode;

    /**
     * Setting the context of the security to the local thread.
     */
    public SecurityConfiguration() {
        super();
        SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_INHERITABLETHREADLOCAL);
    }

    /**
     * Configuration access permissions of the urls.
     *
     * @param httpSecurity Configuration object for the security.
     */
    @Override
    protected void configure(final HttpSecurity httpSecurity) throws Exception {
        // Allowing the spring dev tools.
        if (devMode) {
            LOG.warn("CAUTION: you are in debug mode, DON'T USE THIS IN PRODUCTION !");
            httpSecurity
                    .authorizeRequests()
                    .antMatchers("/.~~spring-boot!~/restart")
                    .anonymous()
                    .and()
                    .csrf().ignoringAntMatchers("/.~~spring-boot!~/restart");
        }
        httpSecurity
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // Creates a session if required.
                .and()
                .authorizeRequests()
                .antMatchers("/register", "/login").permitAll()
                .and()
                .authorizeRequests()
                .antMatchers("/**").authenticated()
                .and()
                .formLogin()
                .loginPage("/login")

        ;
    }

    /**
     * Allow to use our authentication system.
     *
     * @param auth builder for the authentication.
     */
    @Autowired
    public void configAuthentication(final AuthenticationManagerBuilder auth, @Qualifier("mzkUserDetailServiceImpl") final UserDetailsService userDetailsService) {
        auth.authenticationProvider(authenticationProvider(userDetailsService));
    }

    /**
     * Defines the UserDetailsService used during the authentication.
     *
     * @return Authentication provider.
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider(@Qualifier("mzkUserDetailServiceImpl") final UserDetailsService userDetailsService) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * @return Hashing algorithm for the password.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
