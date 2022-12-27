package org.manazeak.manazeak.entity.dto.library.label;

/**
 * Contains the minimal information to display a label.
 *
 * @param labelId      The id of the label in the database.
 * @param labelName    The name of the label.
 * @param labelPicture The picture of the label.
 */
public record LabelMinimalInfoDto(Long labelId, String labelName, String labelPicture) {
}
