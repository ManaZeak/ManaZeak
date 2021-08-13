-- *********************************************
-- CREATE TABLES FOR POSTGRES
--
-- This file has been automatically generated
-- *********************************************
SET search_path TO music;

-- ================================
-- SEQUENCES
-- ================================
CREATE SEQUENCE SEQ_ARTIST START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_BAND START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_TRACK START WITH 1000 CACHE 20; 
 
 
-- ================================
-- TABLES
-- ================================
CREATE TABLE Artist (
	artist_id BIGINT not null,
	name VARCHAR(200) not null,
	CONSTRAINT PK_ARTIST PRIMARY KEY (artist_id)
);

CREATE TABLE Band (
	band_id BIGINT not null,
	name VARCHAR(200) not null,
	CONSTRAINT PK_BAND PRIMARY KEY (band_id)
);

CREATE TABLE band_artist (
	band_id BIGINT not null,
	artist_id BIGINT not null,
	CONSTRAINT PK_BAND_ARTIST PRIMARY KEY (band_id,artist_id)
);
COMMENT ON TABLE band_artist IS 'ManyToMany Band / Artist';
COMMENT ON COLUMN band_artist.band_id IS 'ManyToMany FK Band';
COMMENT ON COLUMN band_artist.artist_id IS 'ManyToMany FK Artist';

CREATE TABLE Track (
	track_id BIGINT not null,
	CONSTRAINT PK_TRACK PRIMARY KEY (track_id)
);

CREATE TABLE track_band_artist (
	track_id BIGINT not null,
	band_id BIGINT not null,
	CONSTRAINT PK_TRACK_BAND_ARTIST PRIMARY KEY (track_id,band_id)
);
COMMENT ON TABLE track_band_artist IS 'ManyToMany Track / Band';
COMMENT ON COLUMN track_band_artist.track_id IS 'ManyToMany FK Track';
COMMENT ON COLUMN track_band_artist.band_id IS 'ManyToMany FK Band';

CREATE TABLE track_band_performer (
	track_id BIGINT not null,
	band_id BIGINT not null,
	CONSTRAINT PK_TRACK_BAND_PERFORMER PRIMARY KEY (track_id,band_id)
);
COMMENT ON TABLE track_band_performer IS 'ManyToMany Track / Band';
COMMENT ON COLUMN track_band_performer.track_id IS 'ManyToMany FK Track';
COMMENT ON COLUMN track_band_performer.band_id IS 'ManyToMany FK Band';



-- ================================
-- FOREIGN KEYS
-- ================================
ALTER TABLE band_artist ADD CONSTRAINT FK_band_artist_1 FOREIGN KEY (band_id) REFERENCES Band(band_id);
ALTER TABLE band_artist ADD CONSTRAINT FK_band_artist_2 FOREIGN KEY (artist_id) REFERENCES Artist(artist_id);
ALTER TABLE track_band_artist ADD CONSTRAINT FK_track_band_artist_1 FOREIGN KEY (track_id) REFERENCES Track(track_id);
ALTER TABLE track_band_artist ADD CONSTRAINT FK_track_band_artist_2 FOREIGN KEY (band_id) REFERENCES Band(band_id);
ALTER TABLE track_band_performer ADD CONSTRAINT FK_track_band_performer_1 FOREIGN KEY (track_id) REFERENCES Track(track_id);
ALTER TABLE track_band_performer ADD CONSTRAINT FK_track_band_performer_2 FOREIGN KEY (band_id) REFERENCES Band(band_id);


-- ================================
-- FOREIGN KEYS INDEXES
-- ================================
CREATE INDEX IDX_band_artist_1 ON band_artist (band_id);
CREATE INDEX IDX_band_artist_2 ON band_artist (artist_id);
CREATE INDEX IDX_track_band_artist_1 ON track_band_artist (track_id);
CREATE INDEX IDX_track_band_artist_2 ON track_band_artist (band_id);
CREATE INDEX IDX_track_band_performer_1 ON track_band_performer (track_id);
CREATE INDEX IDX_track_band_performer_2 ON track_band_performer (band_id);

-- END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
