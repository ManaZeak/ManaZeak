package org.manazeak.manazeak.entity.dto.library.moodbar;

import lombok.Data;

@Data
public class MoodbarGenerationReport {

    private Long trackId;

    private String moodMd5;

    private boolean error = false;
}
