package org.manazeak.manazeak.constant.security;

/**
 * The different status of a wish.
 */
public enum WishStatusEnum {
    OK(1L),
    NOK(2L),
    TODO(3L);

    private final Long statusId;

    WishStatusEnum(Long statusId) {
        this.statusId = statusId;
    }

    public Long getStatusId() {
        return statusId;
    }
}
