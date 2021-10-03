package org.manazeak.manazeak.configuration.web;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.DelegatingWebMvcConfiguration;

@Configuration
public class LocaleConfiguration extends DelegatingWebMvcConfiguration {

    private final MzkLocalResolver localResolver;

    public LocaleConfiguration(MzkLocalResolver localResolver) {
        this.localResolver = localResolver;
    }

    /**
     * How to get the local of a user.
     *
     * @return the local of the user.
     */
    @Bean
    @Override
    @NonNull
    public LocaleResolver localeResolver() {
        return localResolver;
    }

}
