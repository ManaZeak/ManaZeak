package org.manazeak.manazeak.constant.security;


/**
 * Contains the role of the application.
 */
public enum RoleEnum {

    USER(1L),
    EDITOR(2L),
    ADMIN(3L);

    private final Long id;

    RoleEnum(Long id) {
        this.id = id;
    }

    /**
     * Get the id of the role.
     *
     * @return the id of the role.
     */
    public Long getId() {
        return id;
    }
}
