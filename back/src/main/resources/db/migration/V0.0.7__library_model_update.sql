-- Removing the old columns.
ALTER TABLE track
    DROP COLUMN start_recording_date;
ALTER TABLE track
    DROP COLUMN end_recording_date;

-- Removing the old table for the track recording location.
DROP TABLE track_recording_location;

-- Adding the new columns in the album table.
ALTER TABLE album
    ADD COLUMN start_recording_date DATE;
ALTER TABLE album
    ADD COLUMN end_recording_date DATE;

-- The las modification date on the column is always not null.
ALTER TABLE artist
    ALTER COLUMN last_modification_date SET NOT NULL;

-- Creating a new sequence for the new table.
CREATE SEQUENCE SEQ_RECORDING_LOCATION START WITH 1000 CACHE 20;

CREATE TABLE recording_location
(
    recording_location_id BIGINT       not null,
    label                 VARCHAR(100) not null,
    country_id            BIGINT,
    CONSTRAINT PK_RECORDING_LOCATION PRIMARY KEY (recording_location_id)
);
COMMENT ON TABLE recording_location IS 'Contains location where album where recorded.';
COMMENT ON COLUMN recording_location.country_id IS 'ManyToOne FK country';

CREATE TABLE album_recording_location
(
    album_id              BIGINT not null,
    recording_location_id BIGINT not null,
    CONSTRAINT PK_ALBUM_RECORDING_LOCATION PRIMARY KEY (album_id, recording_location_id)
);
COMMENT ON TABLE album_recording_location IS 'ManyToMany album / recording_location';
COMMENT ON COLUMN album_recording_location.album_id IS 'ManyToMany FK album';
COMMENT ON COLUMN album_recording_location.recording_location_id IS 'ManyToMany FK recording_location';

-- Adding foreign keys.
ALTER TABLE album_recording_location ADD CONSTRAINT FK_album_recording_location_1 FOREIGN KEY (album_id) REFERENCES album(album_id);
ALTER TABLE album_recording_location ADD CONSTRAINT FK_album_recording_location_2 FOREIGN KEY (recording_location_id) REFERENCES recording_location(recording_location_id);
ALTER TABLE recording_location ADD CONSTRAINT FK_recording_location_country FOREIGN KEY (country_id) REFERENCES country(country_id);

-- Adding indexes.
CREATE INDEX IDX_album_recording_location_1 ON album_recording_location (album_id);
CREATE INDEX IDX_album_recording_location_2 ON album_recording_location (recording_location_id);
CREATE INDEX IDX_recording_location_country ON recording_location (country_id);
