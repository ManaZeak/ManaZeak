-- Creating the new sequence
CREATE SEQUENCE SEQ_ALBUM START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_BIO START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_ARTIST START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_BPM START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_COVER START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_GENRE START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_LABEL START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_LINK START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_TRACK START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_COMPILATION_TYPE START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_KEY START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_WEBSITE_TYPE START WITH 1000 CACHE 20;

-- Create the tables for the library.
CREATE TABLE album (
                       album_id BIGINT not null,
                       title VARCHAR(100) not null,
                       total_track INTEGER not null,
                       release_year INTEGER not null,
                       release_date DATE not null,
                       catalog_number VARCHAR(100),
                       ean_upn VARCHAR(50),
                       duration DOUBLE PRECISION not null,
                       disk_total INTEGER not null,
                       compilation_type_id BIGINT,
                       label_id BIGINT,
                       cover_id INTEGER,
                       artist_id BIGINT,
                       CONSTRAINT PK_ALBUM PRIMARY KEY (album_id)
);
COMMENT ON COLUMN album.compilation_type_id IS 'ManyToOne FK compilation_type';
COMMENT ON COLUMN album.label_id IS 'ManyToOne FK label';
COMMENT ON COLUMN album.cover_id IS 'ManyToOne FK cover';
COMMENT ON COLUMN album.artist_id IS 'ManyToOne FK artist';

CREATE TABLE album_bio (
                           album_id BIGINT not null,
                           bio_id BIGINT not null,
                           CONSTRAINT PK_ALBUM_BIO PRIMARY KEY (album_id,bio_id)
);
COMMENT ON TABLE album_bio IS 'ManyToMany album / bio';
COMMENT ON COLUMN album_bio.album_id IS 'ManyToMany FK album';
COMMENT ON COLUMN album_bio.bio_id IS 'ManyToMany FK bio';

CREATE TABLE artist (
                        artist_id BIGINT not null,
                        name VARCHAR(200) not null,
                        real_name VARCHAR(200) not null,
                        location VARCHAR(500) not null,
                        birth_date DATE,
                        death_date DATE,
                        last_modification_date TIMESTAMP,
                        is_label BOOLEAN not null,
                        testimony_from VARCHAR(200),
                        testimony_text TEXT,
                        country_id BIGINT,
                        label_id BIGINT,
                        link_id BIGINT,
                        bio_id BIGINT,
                        CONSTRAINT PK_ARTIST PRIMARY KEY (artist_id)
);
COMMENT ON TABLE artist IS 'Contains the bands of the application.';
COMMENT ON COLUMN artist.country_id IS 'ManyToOne FK country';
COMMENT ON COLUMN artist.label_id IS 'ManyToOne FK label';
COMMENT ON COLUMN artist.link_id IS 'ManyToOne FK link';
COMMENT ON COLUMN artist.bio_id IS 'ManyToOne FK bio';

CREATE TABLE band_member (
                             band_id BIGINT not null,
                             member_id BIGINT not null,
                             CONSTRAINT PK_BAND_MEMBER PRIMARY KEY (band_id,member_id)
);
COMMENT ON TABLE band_member IS 'ManyToMany artist / artist';
COMMENT ON COLUMN band_member.band_id IS 'ManyToMany FK artist';
COMMENT ON COLUMN band_member.member_id IS 'ManyToMany FK artist';

CREATE TABLE band_artist (
                             band_id BIGINT not null,
                             artist_id BIGINT not null,
                             CONSTRAINT PK_BAND_ARTIST PRIMARY KEY (band_id,artist_id)
);
COMMENT ON TABLE band_artist IS 'ManyToMany band / artist';
COMMENT ON COLUMN band_artist.band_id IS 'ManyToMany FK band';
COMMENT ON COLUMN band_artist.artist_id IS 'ManyToMany FK artist';

CREATE TABLE bio (
                     bio_id BIGINT not null,
                     text TEXT not null,
                     CONSTRAINT PK_BIO PRIMARY KEY (bio_id)
);

CREATE TABLE bpm (
                     bpm_id BIGINT not null,
                     bpm DOUBLE PRECISION not null,
                     bpm_offset DOUBLE PRECISION,
                     first_bar DOUBLE PRECISION,
                     CONSTRAINT PK_BPM PRIMARY KEY (bpm_id)
);

CREATE TABLE cover (
                       cover_id INTEGER not null,
                       filename VARCHAR(50) not null,
                       CONSTRAINT PK_COVER PRIMARY KEY (cover_id)
);

CREATE TABLE genre (
                       genre_id BIGINT not null,
                       name VARCHAR(100) not null,
                       description TEXT,
                       CONSTRAINT PK_GENRE PRIMARY KEY (genre_id)
);

CREATE TABLE label (
                       label_id BIGINT not null,
                       name VARCHAR(100) not null,
                       CONSTRAINT PK_LABEL PRIMARY KEY (label_id)
);

CREATE TABLE link (
                      link_id BIGINT not null,
                      url VARCHAR(1000) not null,
                      website_id BIGINT,
                      CONSTRAINT PK_LINK PRIMARY KEY (link_id)
);
COMMENT ON COLUMN link.website_id IS 'ManyToOne FK website_type';

CREATE TABLE track (
                       track_id BIGINT not null,
                       title VARCHAR(100) not null,
                       disc_number INTEGER not null,
                       track_number INTEGER not null,
                       isrc VARCHAR(32),
                       lyrics TEXT,
                       start_recording_date DATE,
                       end_recording_date DATE,
                       duration DOUBLE PRECISION not null,
                       opus VARCHAR(50),
                       subtitle VARCHAR(100),
                       album_id BIGINT,
                       bpm_id BIGINT,
                       CONSTRAINT PK_TRACK PRIMARY KEY (track_id)
);
COMMENT ON TABLE track IS 'The track information.';
COMMENT ON COLUMN track.album_id IS 'ManyToOne FK album';
COMMENT ON COLUMN track.bpm_id IS 'ManyToOne FK bpm';

CREATE TABLE track_producer (
                                track_id BIGINT not null,
                                artist_id BIGINT not null,
                                CONSTRAINT PK_TRACK_PRODUCER PRIMARY KEY (track_id,artist_id)
);
COMMENT ON TABLE track_producer IS 'ManyToMany track / artist';
COMMENT ON COLUMN track_producer.track_id IS 'ManyToMany FK track';
COMMENT ON COLUMN track_producer.artist_id IS 'ManyToMany FK artist';

CREATE TABLE track_band_artist (
                                   track_id BIGINT not null,
                                   artist_id BIGINT not null,
                                   CONSTRAINT PK_TRACK_BAND_ARTIST PRIMARY KEY (track_id,artist_id)
);
COMMENT ON TABLE track_band_artist IS 'ManyToMany track / artist';
COMMENT ON COLUMN track_band_artist.track_id IS 'ManyToMany FK track';
COMMENT ON COLUMN track_band_artist.artist_id IS 'ManyToMany FK artist';

CREATE TABLE track_composer (
                                track_id BIGINT not null,
                                artist_id BIGINT not null,
                                CONSTRAINT PK_TRACK_COMPOSER PRIMARY KEY (track_id,artist_id)
);
COMMENT ON TABLE track_composer IS 'ManyToMany track / artist';
COMMENT ON COLUMN track_composer.track_id IS 'ManyToMany FK track';
COMMENT ON COLUMN track_composer.artist_id IS 'ManyToMany FK artist';

CREATE TABLE track_lyricist (
                                track_id BIGINT not null,
                                artist_id BIGINT not null,
                                CONSTRAINT PK_TRACK_LYRICIST PRIMARY KEY (track_id,artist_id)
);
COMMENT ON TABLE track_lyricist IS 'ManyToMany track / artist';
COMMENT ON COLUMN track_lyricist.track_id IS 'ManyToMany FK track';
COMMENT ON COLUMN track_lyricist.artist_id IS 'ManyToMany FK artist';

CREATE TABLE track_performer (
                                 track_id BIGINT not null,
                                 artist_id BIGINT not null,
                                 CONSTRAINT PK_TRACK_PERFORMER PRIMARY KEY (track_id,artist_id)
);
COMMENT ON TABLE track_performer IS 'ManyToMany track / artist';
COMMENT ON COLUMN track_performer.track_id IS 'ManyToMany FK track';
COMMENT ON COLUMN track_performer.artist_id IS 'ManyToMany FK artist';

CREATE TABLE track_engineer (
                                track_id BIGINT not null,
                                artist_id BIGINT not null,
                                CONSTRAINT PK_TRACK_ENGINEER PRIMARY KEY (track_id,artist_id)
);
COMMENT ON TABLE track_engineer IS 'ManyToMany track / artist';
COMMENT ON COLUMN track_engineer.track_id IS 'ManyToMany FK track';
COMMENT ON COLUMN track_engineer.artist_id IS 'ManyToMany FK artist';

CREATE TABLE track_arranger (
                                track_id BIGINT not null,
                                artist_id BIGINT not null,
                                CONSTRAINT PK_TRACK_ARRANGER PRIMARY KEY (track_id,artist_id)
);
COMMENT ON TABLE track_arranger IS 'ManyToMany track / artist';
COMMENT ON COLUMN track_arranger.track_id IS 'ManyToMany FK track';
COMMENT ON COLUMN track_arranger.artist_id IS 'ManyToMany FK artist';

CREATE TABLE track_genre (
                             track_id BIGINT not null,
                             genre_id BIGINT not null,
                             CONSTRAINT PK_TRACK_GENRE PRIMARY KEY (track_id,genre_id)
);
COMMENT ON TABLE track_genre IS 'ManyToMany track / genre';
COMMENT ON COLUMN track_genre.track_id IS 'ManyToMany FK track';
COMMENT ON COLUMN track_genre.genre_id IS 'ManyToMany FK genre';

CREATE TABLE track_key (
                           track_id BIGINT not null,
                           key_id BIGINT not null,
                           CONSTRAINT PK_TRACK_KEY PRIMARY KEY (track_id,key_id)
);
COMMENT ON TABLE track_key IS 'ManyToMany track / key';
COMMENT ON COLUMN track_key.track_id IS 'ManyToMany FK track';
COMMENT ON COLUMN track_key.key_id IS 'ManyToMany FK key';

CREATE TABLE track_recording_location (
                                          track_id BIGINT not null,
                                          country_id BIGINT not null,
                                          CONSTRAINT PK_TRACK_RECORDING_LOCATION PRIMARY KEY (track_id,country_id)
);
COMMENT ON TABLE track_recording_location IS 'ManyToMany track / Country';
COMMENT ON COLUMN track_recording_location.track_id IS 'ManyToMany FK track';
COMMENT ON COLUMN track_recording_location.country_id IS 'ManyToMany FK Country';

CREATE TABLE compilation_type (
                                  compilation_type_id BIGINT not null,
                                  label VARCHAR(50) not null,
                                  CONSTRAINT PK_COMPILATION_TYPE PRIMARY KEY (compilation_type_id)
);

CREATE TABLE key (
                     key_id BIGINT not null,
                     label VARCHAR(32) not null,
                     CONSTRAINT PK_KEY PRIMARY KEY (key_id)
);

CREATE TABLE website_type (
                              website_id BIGINT not null,
                              label VARCHAR(100) not null,
                              asset_path VARCHAR(500) not null,
                              CONSTRAINT PK_WEBSITE_TYPE PRIMARY KEY (website_id)
);


-- ================================
-- FOREIGN KEYS
-- ================================
ALTER TABLE album_bio ADD CONSTRAINT FK_album_bio_1 FOREIGN KEY (album_id) REFERENCES album(album_id);
ALTER TABLE album_bio ADD CONSTRAINT FK_album_bio_2 FOREIGN KEY (bio_id) REFERENCES bio(bio_id);
ALTER TABLE album ADD CONSTRAINT FK_album_compilation FOREIGN KEY (compilation_type_id) REFERENCES compilation_type(compilation_type_id);
ALTER TABLE album ADD CONSTRAINT FK_album_label FOREIGN KEY (label_id) REFERENCES label(label_id);
ALTER TABLE album ADD CONSTRAINT FK_album_cover FOREIGN KEY (cover_id) REFERENCES cover(cover_id);
ALTER TABLE album ADD CONSTRAINT FK_album_band FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE artist ADD CONSTRAINT FK_artist_birth_country FOREIGN KEY (country_id) REFERENCES country(country_id);
ALTER TABLE band_member ADD CONSTRAINT FK_band_member_1 FOREIGN KEY (band_id) REFERENCES artist(artist_id);
ALTER TABLE band_member ADD CONSTRAINT FK_band_member_2 FOREIGN KEY (member_id) REFERENCES artist(artist_id);
ALTER TABLE artist ADD CONSTRAINT FK_band_label FOREIGN KEY (label_id) REFERENCES label(label_id);
ALTER TABLE artist ADD CONSTRAINT FK_band_link FOREIGN KEY (link_id) REFERENCES link(link_id);
ALTER TABLE artist ADD CONSTRAINT FK_band_bio FOREIGN KEY (bio_id) REFERENCES bio(bio_id);
ALTER TABLE link ADD CONSTRAINT FK_link_type FOREIGN KEY (website_id) REFERENCES website_type(website_id);
ALTER TABLE track ADD CONSTRAINT FK_track_album FOREIGN KEY (album_id) REFERENCES album(album_id);
ALTER TABLE track_producer ADD CONSTRAINT FK_track_producer_1 FOREIGN KEY (track_id) REFERENCES track(track_id);
ALTER TABLE track_producer ADD CONSTRAINT FK_track_producer_2 FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE track_band_artist ADD CONSTRAINT FK_track_band_artist_1 FOREIGN KEY (track_id) REFERENCES track(track_id);
ALTER TABLE track_band_artist ADD CONSTRAINT FK_track_band_artist_2 FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE track_composer ADD CONSTRAINT FK_track_composer_1 FOREIGN KEY (track_id) REFERENCES track(track_id);
ALTER TABLE track_composer ADD CONSTRAINT FK_track_composer_2 FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE track_lyricist ADD CONSTRAINT FK_track_lyricist_1 FOREIGN KEY (track_id) REFERENCES track(track_id);
ALTER TABLE track_lyricist ADD CONSTRAINT FK_track_lyricist_2 FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE track_performer ADD CONSTRAINT FK_track_performer_1 FOREIGN KEY (track_id) REFERENCES track(track_id);
ALTER TABLE track_performer ADD CONSTRAINT FK_track_performer_2 FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE track_engineer ADD CONSTRAINT FK_track_engineer_1 FOREIGN KEY (track_id) REFERENCES track(track_id);
ALTER TABLE track_engineer ADD CONSTRAINT FK_track_engineer_2 FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE track_arranger ADD CONSTRAINT FK_track_arranger_1 FOREIGN KEY (track_id) REFERENCES track(track_id);
ALTER TABLE track_arranger ADD CONSTRAINT FK_track_arranger_2 FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE track ADD CONSTRAINT FK_track_bpm FOREIGN KEY (bpm_id) REFERENCES bpm(bpm_id);
ALTER TABLE track_genre ADD CONSTRAINT FK_track_genre_1 FOREIGN KEY (track_id) REFERENCES track(track_id);
ALTER TABLE track_genre ADD CONSTRAINT FK_track_genre_2 FOREIGN KEY (genre_id) REFERENCES genre(genre_id);
ALTER TABLE track_key ADD CONSTRAINT FK_track_key_1 FOREIGN KEY (track_id) REFERENCES track(track_id);
ALTER TABLE track_key ADD CONSTRAINT FK_track_key_2 FOREIGN KEY (key_id) REFERENCES key(key_id);
ALTER TABLE track_recording_location ADD CONSTRAINT FK_track_recording_location_1 FOREIGN KEY (track_id) REFERENCES track(track_id);
ALTER TABLE track_recording_location ADD CONSTRAINT FK_track_recording_location_2 FOREIGN KEY (country_id) REFERENCES country(country_id);

-- ================================
-- FOREIGN KEYS INDEXES
-- ================================
CREATE INDEX IDX_album_bio_1 ON album_bio (album_id);
CREATE INDEX IDX_album_bio_2 ON album_bio (bio_id);
CREATE INDEX IDX_album_compilation ON album (compilation_type_id);
CREATE INDEX IDX_album_label ON album (label_id);
CREATE INDEX IDX_album_cover ON album (cover_id);
CREATE INDEX IDX_album_band ON album (artist_id);
CREATE INDEX IDX_artist_birth_country ON artist (country_id);
CREATE INDEX IDX_band_member_1 ON band_member (band_id);
CREATE INDEX IDX_band_member_2 ON band_member (member_id);
CREATE INDEX IDX_band_label ON artist (label_id);
CREATE INDEX IDX_band_link ON artist (link_id);
CREATE INDEX IDX_band_bio ON artist (bio_id);
CREATE INDEX IDX_link_type ON link (website_id);
CREATE INDEX IDX_track_album ON track (album_id);
CREATE INDEX IDX_track_producer_1 ON track_producer (track_id);
CREATE INDEX IDX_track_producer_2 ON track_producer (artist_id);
CREATE INDEX IDX_track_band_artist_1 ON track_band_artist (track_id);
CREATE INDEX IDX_track_band_artist_2 ON track_band_artist (artist_id);
CREATE INDEX IDX_track_composer_1 ON track_composer (track_id);
CREATE INDEX IDX_track_composer_2 ON track_composer (artist_id);
CREATE INDEX IDX_track_lyricist_1 ON track_lyricist (track_id);
CREATE INDEX IDX_track_lyricist_2 ON track_lyricist (artist_id);
CREATE INDEX IDX_track_performer_1 ON track_performer (track_id);
CREATE INDEX IDX_track_performer_2 ON track_performer (artist_id);
CREATE INDEX IDX_track_engineer_1 ON track_engineer (track_id);
CREATE INDEX IDX_track_engineer_2 ON track_engineer (artist_id);
CREATE INDEX IDX_track_arranger_1 ON track_arranger (track_id);
CREATE INDEX IDX_track_arranger_2 ON track_arranger (artist_id);
CREATE INDEX IDX_track_bpm ON track (bpm_id);
CREATE INDEX IDX_track_genre_1 ON track_genre (track_id);
CREATE INDEX IDX_track_genre_2 ON track_genre (genre_id);
CREATE INDEX IDX_track_key_1 ON track_key (track_id);
CREATE INDEX IDX_track_key_2 ON track_key (key_id);
CREATE INDEX IDX_track_recording_location_1 ON track_recording_location (track_id);
CREATE INDEX IDX_track_recording_location_2 ON track_recording_location (country_id);

commit;