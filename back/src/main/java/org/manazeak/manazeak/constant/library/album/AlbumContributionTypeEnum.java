package org.manazeak.manazeak.constant.library.album;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.entity.dto.library.album.AlbumContributionMinimalInfoDto;
import org.manazeak.manazeak.entity.dto.library.album.AlbumMinimalInfoDto;
import org.manazeak.manazeak.exception.MzkRuntimeException;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

/**
 * Contains the type of contribution of an album.
 */
@RequiredArgsConstructor
@Getter
public enum AlbumContributionTypeEnum {

    COMPOSER("object.artist.composer"),
    ARRANGER("object.artist.arranger"),
    ENGINEER("object.artist.engineer"),
    PERFORMER("object.artist.performer"),
    LYRICIST("object.artist.lyricist");

    private final String nameCode;

    /**
     * @return Create a map containing the contribution associated to an empty list.
     */
    public static Map<AlbumContributionTypeEnum, List<AlbumMinimalInfoDto>> getEmptyContribMap() {
        Map<AlbumContributionTypeEnum, List<AlbumMinimalInfoDto>> contrib = new EnumMap<>(AlbumContributionTypeEnum.class);
        // Creating the lists for all the contribution type.
        for (AlbumContributionTypeEnum contribType : values()) {
            contrib.put(contribType, new ArrayList<>());
        }

        return contrib;
    }

    /**
     * Get the type of contribution from the contribution object.
     *
     * @param contrib The type contribution of the element.
     * @return The type of contribution.
     */
    public static AlbumContributionTypeEnum getTypeOfContribution(AlbumContributionMinimalInfoDto contrib) {
        if (contrib.getArrangerId() != null) {
            return ARRANGER;
        }
        if (contrib.getComposerId() != null) {
            return COMPOSER;
        }
        if (contrib.getEngineerId() != null) {
            return ENGINEER;
        }
        if (contrib.getLyricistId() != null) {
            return LYRICIST;
        }
        if (contrib.getPerformerId() != null) {
            return PERFORMER;
        }

        throw new MzkRuntimeException("The contribution type couldn't be found.");
    }
}
