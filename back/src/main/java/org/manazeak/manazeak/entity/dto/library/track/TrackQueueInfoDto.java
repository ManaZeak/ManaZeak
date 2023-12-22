package org.manazeak.manazeak.entity.dto.library.track;

import lombok.Data;

import java.util.List;

/**
 * Contains the information needed to display a track in the queue.
 */
@Data
public class TrackQueueInfoDto {

    private Long trackId;

    private String title;

    private List<String> performers;

    private Double duration;

}
