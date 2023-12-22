package org.manazeak.manazeak.mapper.library.track;

import org.manazeak.manazeak.entity.dto.library.track.TrackQueueInfoDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackWithPartialPerformerDto;
import org.manazeak.manazeak.mapper.gobal.GlobalMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Convert track elements.
 */
@Mapper(uses = GlobalMapper.class)
public interface TrackMapper {

    @Mapping(target = "performers", source = "performer",  qualifiedByName = "stringToList")
    TrackQueueInfoDto trackWithPartialPerformerToTrackQueueInfo(TrackWithPartialPerformerDto track);
}
