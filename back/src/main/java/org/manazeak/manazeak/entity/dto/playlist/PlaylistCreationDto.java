package org.manazeak.manazeak.entity.dto.playlist;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.manazeak.manazeak.entity.validator.user.Avatar;
import org.springframework.web.multipart.MultipartFile;

/**
 * Contains the information needed to create a new playlist for a user.
 *
 */
@Data
public class PlaylistCreationDto {

    private @NotBlank String name;
    private boolean isPrivate;
    private boolean isPublicEditable;
    private boolean addItemAtStartRank;
    @Nullable
    private String description;
    @Nullable
    @Avatar
    private MultipartFile image;
}
