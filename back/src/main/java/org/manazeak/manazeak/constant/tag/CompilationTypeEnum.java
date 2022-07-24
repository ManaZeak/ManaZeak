package org.manazeak.manazeak.constant.tag;

import org.manazeak.manazeak.exception.MzkRuntimeException;

/**
 * Contains the possible value of the compilation type.
 */
public enum CompilationTypeEnum {
    REGULAR(1L, 0),
    VARIOUS_ARTIST(2L, 1),
    COMPILATION(3L, 2);

    private final Long id;
    private final int code;

    CompilationTypeEnum(Long id, int code) {
        this.id = id;
        this.code = code;
    }

    /**
     * Get a compilation by the code present in the tags.
     *
     * @param code The code of the compilation type in the tags.
     * @return The compilation type if it exists.
     */
    public static CompilationTypeEnum getCompilationByCode(Integer code) {
        if (code == null) {
            return null;
        }
        for (CompilationTypeEnum type : values()) {
            if (type.code == code) {
                return type;
            }
        }
        // The given code has no corresponding compilation type.
        throw new MzkRuntimeException("The compilation code " + code + " has no corresponding type.");
    }

    public Long getId() {
        return id;
    }
}
