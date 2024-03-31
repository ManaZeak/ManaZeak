package org.manazeak.manazeak.entity.dto.library.album;

import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode(callSuper = true)
public class AlbumContributionMinimalInfoDto extends AlbumMinimalInfoDto {

    private final Long composerId;
    private final Long arrangerId;
    private final Long engineerId;
    private final Long performerId;
    private final Long lyricistId;
    private final Long producerId;

    public AlbumContributionMinimalInfoDto(Long albumId, String title, String cover, Integer releaseYear,
                                           Long composerId, Long arrangerId, Long engineerId, Long performerId,
                                           Long lyricistId, Long producerId) {
        super(albumId, title, cover, releaseYear);
        this.composerId = composerId;
        this.arrangerId = arrangerId;
        this.engineerId = engineerId;
        this.performerId = performerId;
        this.lyricistId = lyricistId;
        this.producerId = producerId;
    }
}
