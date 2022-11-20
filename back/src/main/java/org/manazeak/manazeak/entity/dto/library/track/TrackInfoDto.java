package org.manazeak.manazeak.entity.dto.library.track;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TrackInfoDto {

    private String title;

    private Double duration;

    private String artistName;

}
