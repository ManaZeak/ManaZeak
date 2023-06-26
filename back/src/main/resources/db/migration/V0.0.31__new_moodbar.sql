-- Allowing the mood column to be null (moodbar not generated).
ALTER TABLE track ALTER COLUMN mood DROP NOT NULL;

-- Deleting all the previously generated moodbars.
UPDATE track SET mood = null;

CREATE SEQUENCE SEQ_MOODBAR_ERROR START WITH 1000 CACHE 20;

CREATE TABLE moodbar_error (
                               mood_error_id BIGINT not null,
                               error TEXT not null,
                               track_id BIGINT,
                               CONSTRAINT PK_MOODBAR_ERROR PRIMARY KEY (mood_error_id)
);
COMMENT ON COLUMN moodbar_error.track_id IS 'ManyToOne FK track';

ALTER TABLE moodbar_error ADD CONSTRAINT FK_moobar_error_track FOREIGN KEY (track_id) REFERENCES track(track_id);

CREATE INDEX IDX_moobar_error_track ON moodbar_error (track_id);
