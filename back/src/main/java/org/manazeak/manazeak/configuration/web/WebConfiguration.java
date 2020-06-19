package org.manazeak.manazeak.configuration.web;

import org.manazeak.manazeak.util.ArrayUtil;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring5.ISpringTemplateEngine;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ITemplateResolver;

@EnableWebMvc
@Configuration
// Scanning only the web pages.
@ComponentScan(basePackages = { "org.manazeak.manazeak.controller.html" })
public class WebConfiguration implements ApplicationContextAware, WebMvcConfigurer {

    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    /**
     * Create the view resolver.
     * @return the html view resolver.
     */
    @Bean
    public ViewResolver htmlViewResolver() {
        ThymeleafViewResolver resolver = new ThymeleafViewResolver();
        resolver.setTemplateEngine(templateEngine(htmlTemplateResolver()));
        resolver.setContentType("text/html");
        resolver.setCharacterEncoding("UTF-8");
        resolver.setViewNames(ArrayUtil.createArray("*.html"));
        return resolver;
    }

    /**
     * The message resolver of spring.
     * @return the source message.
     */
    @Bean
    public ResourceBundleMessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("messages");
        return messageSource;
    }

    /**
     * Create The template engine.
     * @param templateResolver The template resolver.
     * @return the template engine.
     */
    private ISpringTemplateEngine templateEngine(ITemplateResolver templateResolver) {
        SpringTemplateEngine engine = new SpringTemplateEngine();
        engine.setTemplateResolver(templateResolver);
        engine.setTemplateEngineMessageSource(messageSource());
        return engine;
    }

    /**
     * Create the template resolver.
     * @return The template resolver.
     */
    private ITemplateResolver htmlTemplateResolver() {
        SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
        resolver.setApplicationContext(applicationContext);
        resolver.setPrefix("/WEB-INF/templates/");
        resolver.setCacheable(false);
        resolver.setTemplateMode(TemplateMode.HTML);
        return resolver;
    }

}
