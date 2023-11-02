package org.manazeak.manazeak.entity.dto.library.integration.bio;

/**
 * Contains the information need to insert a bio into the database.
 */
public record BioDto(Long localeId, String bio, String artistName) {
}
