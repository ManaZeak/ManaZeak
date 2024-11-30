package org.manazeak.manazeak.entity.dto.playlist;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import org.manazeak.manazeak.entity.validator.user.Avatar;
import org.springframework.web.multipart.MultipartFile;

/**
 * Contains the information needed to create a new playlist for a user.
 *
 * @param name               The name of the playlist.
 * @param isPrivate          If the playlist is only displayed to the creator.
 * @param isPublicEditable   If the playlist can be modified by other users.
 * @param addItemAtStartRank If the new tracks are added at the top or at the bottom of the playlist.
 * @param description        The description of the playlist
 * @param image              The image of the playlist.
 */
public record PlaylistCreationDto(
        @NotBlank
        String name,
        boolean isPrivate,
        boolean isPublicEditable,
        boolean addItemAtStartRank,
        @Nullable
        String description,
        @Nullable
        @Avatar
        MultipartFile image) {
}
