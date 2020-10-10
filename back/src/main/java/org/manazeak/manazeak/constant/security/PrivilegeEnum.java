package org.manazeak.manazeak.constant.security;

/**
 * Contains the privileges of the application.
 */
public enum PrivilegeEnum implements PrivilegeInterface {
    /**
     * Play tracks
     */
    PLAY(1L),
    /**
     * Wish creation
     */
    WISH(2L),
    /**
     * Wish review.
     */
    WISR(3L),
    /**
     * Upload.
     */
    UPLD(4L),
    /**
     * Upload approval.
     */
    UPAP(5L),
    /**
     * Library edit.
     */
    LBED(6L),
    /**
     * Admin view.
     */
    ADMV(7L),
    /**
     * Edit role privilege.
     */
    RLPV(8L),
    /**
     * Edit user role.
     */
    USRL(9L),
    /**
     * Edit all communites.
     */
    EDCO(10L),
    /**
     * Edit all playlist.
     */
    EDPL(11L);

    /**
     * The id of the privilege in the database.
     */
    private final Long id;

    PrivilegeEnum(Long id) {
        this.id = id;
    }

    /**
     * Get the id of the privilege.
     *
     * @return the id of the privilege.
     */
    public Long getId() {
        return id;
    }
}
