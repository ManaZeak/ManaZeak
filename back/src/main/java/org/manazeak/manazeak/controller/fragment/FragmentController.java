package org.manazeak.manazeak.controller.fragment;

import org.springframework.core.annotation.AliasFor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * This annotation is used to prefix all the URLS of fragment controllers with '/fragment/'.
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Controller
@RequestMapping("/fragment/")
public @interface FragmentController {

    @AliasFor(annotation = Controller.class)
    String value() default "";
}
