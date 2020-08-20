package org.manazeak.manazeak.configuration.web;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

@EnableWebMvc
@Configuration
// Scanning only the web controllers.
@ComponentScan(basePackages = {"org.manazeak.manazeak.controller.html"})
public class WebConfiguration implements ApplicationContextAware, WebMvcConfigurer {

    private static final String APP_ENCODING = "UTF-8";
    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    /**
     * Generating the template resolver.
     *
     * @return the class loader for the template resolver.
     */
    @Bean
    public ClassLoaderTemplateResolver templateResolver() {

        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();

        templateResolver.setPrefix("templates/");
        templateResolver.setCacheable(true);
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode("HTML");
        templateResolver.setCharacterEncoding(APP_ENCODING);

        return templateResolver;
    }

    /**
     * Loads the template engine.
     *
     * @return The template engine.
     */
    @Bean
    public SpringTemplateEngine templateEngine() {

        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver());

        return templateEngine;
    }

    /**
     * Configuration for internationalization.
     *
     * @return the message.
     */
    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("i18n/message");
        messageSource.setDefaultEncoding(APP_ENCODING);
        return messageSource;
    }

    /**
     * Get the validator with the correct message source.
     * @return The validator object.
     */
    @Override
    @Bean
    public LocalValidatorFactoryBean getValidator() {
        LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();
        bean.setValidationMessageSource(messageSource());
        return bean;
    }

    /**
     * Add the locale interceptor.
     * @param registry the object containing all the interceptors.
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(localeChangeInterceptor());
    }

    /**
     * This is used to set the locale of the user when he
     * @return The locale change interceptor.
     */
    @Bean
    public LocaleChangeInterceptor localeChangeInterceptor() {
        return new MzkLocaleChangeInterceptor();
    }

    /**
     * Creating the thymeleaf template resolver.
     *
     * @return the thymeleaf template resolver.
     */
    @Bean
    public ViewResolver viewResolver() {

        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();

        viewResolver.setTemplateEngine(templateEngine());
        viewResolver.setCharacterEncoding(APP_ENCODING);

        return viewResolver;
    }

    /**
     * How to get the local of a user.
     *
     * @return the local of the user.
     */
    @Bean
    public LocaleResolver localeResolver(MzkLocalResolver localResolver) {
        return localResolver;
    }
}
