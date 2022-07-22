package org.manazeak.manazeak.annotations;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * Allows to mock a component in the tests.
 */
@Component
// The component will be active when not in test mode.
@Profile("!test")
@Retention(RetentionPolicy.RUNTIME)
public @interface MockableComponent {
}
