-- *********************************************
-- CREATE TABLES FOR POSTGRES
--
-- This file has been automatically generated
-- *********************************************
SET search_path TO music;

-- ================================
-- SEQUENCES
-- ================================
CREATE SEQUENCE SEQ_ALBUM START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_ARTIST START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_BAND_MEMBER START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_BIO START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_GENRE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_LABEL START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_LINK START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_RECORDING_LOCATION START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_TIME_INTERVAL START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_TRACK START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_MOODBAR_ERROR START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_THUMBNAIL_ERROR START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_BAND_ROLE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_COMPILATION_TYPE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_COUNTRY START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_KEY START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_LOCALE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_SCAN_STEP START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_THUMB_ERROR_TYPE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_WEBSITE_TYPE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_WISH_STATUS START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_BADGE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_INVITE_CODE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_MZK_USER START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_PRIVILEGE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_ROLE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_WISH START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_RANDOM_GENRE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_RANDOM_LABEL START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_RANDOM_RELEASE_ARTIST START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_SCAN_STATUS START WITH 1000 CACHE 20; 
 
 
-- ================================
-- TABLES
-- ================================
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
	start_recording_date DATE,
	end_recording_date DATE,
	location VARCHAR(500) not null,
	cover VARCHAR(32),
	compilation_type_id BIGINT,
	label_id BIGINT,
	artist_id BIGINT,
	CONSTRAINT PK_ALBUM PRIMARY KEY (album_id)
);
COMMENT ON COLUMN album.compilation_type_id IS 'ManyToOne FK compilation_type';
COMMENT ON COLUMN album.label_id IS 'ManyToOne FK label';
COMMENT ON COLUMN album.artist_id IS 'ManyToOne FK artist';

CREATE TABLE album_bio (
	album_id BIGINT not null,
	bio_id BIGINT not null,
	CONSTRAINT PK_ALBUM_BIO PRIMARY KEY (album_id,bio_id)
);
COMMENT ON TABLE album_bio IS 'ManyToMany album / bio';
COMMENT ON COLUMN album_bio.album_id IS 'ManyToMany FK album';
COMMENT ON COLUMN album_bio.bio_id IS 'ManyToMany FK bio';

CREATE TABLE album_recording_location (
	album_id BIGINT not null,
	recording_location_id BIGINT not null,
	CONSTRAINT PK_ALBUM_RECORDING_LOCATION PRIMARY KEY (album_id,recording_location_id)
);
COMMENT ON TABLE album_recording_location IS 'ManyToMany album / recording_location';
COMMENT ON COLUMN album_recording_location.album_id IS 'ManyToMany FK album';
COMMENT ON COLUMN album_recording_location.recording_location_id IS 'ManyToMany FK recording_location';

CREATE TABLE artist (
	artist_id BIGINT not null,
	name VARCHAR(200) not null,
	location VARCHAR(500),
	birth_date DATE,
	death_date DATE,
	last_modification_date TIMESTAMP not null,
	is_label BOOLEAN not null,
	testimony_from VARCHAR(200),
	picture_filename VARCHAR(50),
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
	band_member_id BIGINT not null,
	band_id BIGINT,
	member_id BIGINT,
	CONSTRAINT PK_BAND_MEMBER PRIMARY KEY (band_member_id)
);
COMMENT ON TABLE band_member IS 'Contains the information about each band member.';
COMMENT ON COLUMN band_member.band_id IS 'ManyToOne FK artist';
COMMENT ON COLUMN band_member.member_id IS 'ManyToOne FK artist';

CREATE TABLE member_time_interval (
	band_member_id BIGINT not null,
	interval_id BIGINT not null,
	CONSTRAINT PK_MEMBER_TIME_INTERVAL PRIMARY KEY (band_member_id,interval_id)
);
COMMENT ON TABLE member_time_interval IS 'ManyToMany band_member / time_interval';
COMMENT ON COLUMN member_time_interval.band_member_id IS 'ManyToMany FK band_member';
COMMENT ON COLUMN member_time_interval.interval_id IS 'ManyToMany FK time_interval';

CREATE TABLE member_role (
	band_member_id BIGINT not null,
	band_role_id BIGINT not null,
	CONSTRAINT PK_MEMBER_ROLE PRIMARY KEY (band_member_id,band_role_id)
);
COMMENT ON TABLE member_role IS 'ManyToMany band_member / band_role';
COMMENT ON COLUMN member_role.band_member_id IS 'ManyToMany FK band_member';
COMMENT ON COLUMN member_role.band_role_id IS 'ManyToMany FK band_role';

CREATE TABLE bio (
	bio_id BIGINT not null,
	text TEXT not null,
	CONSTRAINT PK_BIO PRIMARY KEY (bio_id)
);

CREATE TABLE genre (
	genre_id BIGINT not null,
	name VARCHAR(100) not null,
	description TEXT,
	picture_filename VARCHAR(32),
	CONSTRAINT PK_GENRE PRIMARY KEY (genre_id)
);

CREATE TABLE label (
	label_id BIGINT not null,
	name VARCHAR(100) not null,
	picture_filename VARCHAR(50),
	artist_released BOOLEAN not null,
	CONSTRAINT PK_LABEL PRIMARY KEY (label_id)
);

CREATE TABLE link (
	link_id BIGINT not null,
	url VARCHAR(1000) not null,
	website_id BIGINT,
	CONSTRAINT PK_LINK PRIMARY KEY (link_id)
);
COMMENT ON COLUMN link.website_id IS 'ManyToOne FK website_type';

CREATE TABLE recording_location (
	recording_location_id BIGINT not null,
	label VARCHAR(100) not null,
	country_id BIGINT,
	CONSTRAINT PK_RECORDING_LOCATION PRIMARY KEY (recording_location_id)
);
COMMENT ON TABLE recording_location IS 'Contains location where album where recorded.';
COMMENT ON COLUMN recording_location.country_id IS 'ManyToOne FK country';

CREATE TABLE time_interval (
	interval_id BIGINT not null,
	starting_date DATE not null,
	ending_date DATE not null,
	CONSTRAINT PK_TIME_INTERVAL PRIMARY KEY (interval_id)
);
COMMENT ON TABLE time_interval IS 'A time interval between two dates.';

CREATE TABLE track (
	track_id BIGINT not null,
	title VARCHAR(500) not null,
	disc_number INTEGER not null,
	track_number INTEGER not null,
	isrc VARCHAR(32),
	lyrics TEXT,
	location VARCHAR(500) not null,
	bpm DOUBLE PRECISION,
	bpm_offset DOUBLE PRECISION,
	duration DOUBLE PRECISION not null,
	first_bar DOUBLE PRECISION,
	opus VARCHAR(50),
	is_mp3 BOOLEAN not null,
	subtitle VARCHAR(200),
	mood VARCHAR(50),
	album_id BIGINT,
	CONSTRAINT PK_TRACK PRIMARY KEY (track_id)
);
COMMENT ON TABLE track IS 'The track information.';
COMMENT ON COLUMN track.album_id IS 'ManyToOne FK album';

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

CREATE TABLE moodbar_error (
	mood_error_id BIGINT not null,
	error TEXT not null,
	track_id BIGINT,
	CONSTRAINT PK_MOODBAR_ERROR PRIMARY KEY (mood_error_id)
);
COMMENT ON COLUMN moodbar_error.track_id IS 'ManyToOne FK track';

CREATE TABLE thumbnail_error (
	thumb_err_id BIGINT not null,
	error TEXT not null,
	processed BOOLEAN not null,
	label_id BIGINT,
	album_id BIGINT,
	genre_id BIGINT,
	artist_id BIGINT,
	thumb_error_type_id BIGINT,
	CONSTRAINT PK_THUMBNAIL_ERROR PRIMARY KEY (thumb_err_id)
);
COMMENT ON COLUMN thumbnail_error.label_id IS 'ManyToOne FK label';
COMMENT ON COLUMN thumbnail_error.album_id IS 'ManyToOne FK album';
COMMENT ON COLUMN thumbnail_error.genre_id IS 'ManyToOne FK genre';
COMMENT ON COLUMN thumbnail_error.artist_id IS 'ManyToOne FK artist';
COMMENT ON COLUMN thumbnail_error.thumb_error_type_id IS 'ManyToOne FK thumb_error_type';

CREATE TABLE band_role (
	band_role_id BIGINT not null,
	label VARCHAR(200) not null,
	description VARCHAR(1000),
	CONSTRAINT PK_BAND_ROLE PRIMARY KEY (band_role_id)
);
COMMENT ON TABLE band_role IS 'A role of a member of a band.';

CREATE TABLE compilation_type (
	compilation_type_id BIGINT not null,
	code INTEGER not null,
	label VARCHAR(50) not null,
	CONSTRAINT PK_COMPILATION_TYPE PRIMARY KEY (compilation_type_id)
);

CREATE TABLE country (
	country_id BIGINT not null,
	name VARCHAR(50) not null,
	trigram VARCHAR(32) not null,
	capital_name VARCHAR(50) not null,
	capital_lat DOUBLE PRECISION not null,
	capital_long DOUBLE PRECISION not null,
	center_lat DOUBLE PRECISION not null,
	center_long DOUBLE PRECISION not null,
	CONSTRAINT PK_COUNTRY PRIMARY KEY (country_id)
);
COMMENT ON TABLE country IS 'The countries on the earth.';

CREATE TABLE key (
	key_id BIGINT not null,
	label VARCHAR(32) not null,
	CONSTRAINT PK_KEY PRIMARY KEY (key_id)
);

CREATE TABLE locale (
	locale_id BIGINT not null,
	code VARCHAR(32) not null,
	value VARCHAR(50) not null,
	CONSTRAINT PK_LOCALE PRIMARY KEY (locale_id)
);
COMMENT ON TABLE locale IS 'The locale supported by the app.';

CREATE TABLE scan_step (
	scan_step_id BIGINT not null,
	label VARCHAR(50) not null,
	code VARCHAR(50) not null,
	CONSTRAINT PK_SCAN_STEP PRIMARY KEY (scan_step_id)
);

CREATE TABLE thumb_error_type (
	thumb_error_type_id BIGINT not null,
	label VARCHAR(50) not null,
	code VARCHAR(50) not null,
	CONSTRAINT PK_THUMB_ERROR_TYPE PRIMARY KEY (thumb_error_type_id)
);

CREATE TABLE website_type (
	website_id BIGINT not null,
	label VARCHAR(100) not null,
	asset_path VARCHAR(500) not null,
	CONSTRAINT PK_WEBSITE_TYPE PRIMARY KEY (website_id)
);

CREATE TABLE wish_status (
	wish_status_id BIGINT not null,
	code VARCHAR(32) not null,
	CONSTRAINT PK_WISH_STATUS PRIMARY KEY (wish_status_id)
);

CREATE TABLE badge (
	badge_id BIGINT not null,
	label TEXT not null,
	CONSTRAINT PK_BADGE PRIMARY KEY (badge_id)
);

CREATE TABLE badge_user (
	badge_id BIGINT not null,
	user_id BIGINT not null,
	CONSTRAINT PK_BADGE_USER PRIMARY KEY (badge_id,user_id)
);
COMMENT ON TABLE badge_user IS 'ManyToMany badge / mzk_user';
COMMENT ON COLUMN badge_user.badge_id IS 'ManyToMany FK badge';
COMMENT ON COLUMN badge_user.user_id IS 'ManyToMany FK mzk_user';

CREATE TABLE invite_code (
	invite_code_id BIGINT not null,
	value VARCHAR(50) not null,
	is_active BOOLEAN not null,
	parent BIGINT,
	CONSTRAINT PK_INVITE_CODE PRIMARY KEY (invite_code_id)
);
COMMENT ON TABLE invite_code IS 'The invite code of a user.';
COMMENT ON COLUMN invite_code.parent IS 'ManyToOne FK mzk_user';

CREATE TABLE mzk_user (
	user_id BIGINT not null,
	username VARCHAR(200) not null,
	password VARCHAR(500) not null,
	mail VARCHAR(100),
	is_active BOOLEAN not null,
	name VARCHAR(100),
	surname VARCHAR(100),
	birth_date DATE,
	profile_pic VARCHAR(1000),
	bio TEXT,
	is_complete BOOLEAN not null,
	creation_date TIMESTAMP not null,
	invite_code_id BIGINT,
	country_id BIGINT,
	locale_id BIGINT,
	role_id BIGINT,
	CONSTRAINT PK_MZK_USER PRIMARY KEY (user_id)
);
COMMENT ON TABLE mzk_user IS 'A user object.';
COMMENT ON COLUMN mzk_user.invite_code_id IS 'ManyToOne FK invite_code';
COMMENT ON COLUMN mzk_user.country_id IS 'ManyToOne FK country';
COMMENT ON COLUMN mzk_user.locale_id IS 'ManyToOne FK locale';
COMMENT ON COLUMN mzk_user.role_id IS 'ManyToOne FK role';

CREATE TABLE privilege (
	privilege_id BIGINT not null,
	code_privilege VARCHAR(100) not null,
	CONSTRAINT PK_PRIVILEGE PRIMARY KEY (privilege_id)
);
COMMENT ON TABLE privilege IS 'The privilege a role has.';

CREATE TABLE role (
	role_id BIGINT not null,
	code_role VARCHAR(100) not null,
	CONSTRAINT PK_ROLE PRIMARY KEY (role_id)
);
COMMENT ON TABLE role IS 'The role of a user.';

CREATE TABLE privileges_role (
	role_id BIGINT not null,
	privilege_id BIGINT not null,
	CONSTRAINT PK_PRIVILEGES_ROLE PRIMARY KEY (role_id,privilege_id)
);
COMMENT ON TABLE privileges_role IS 'ManyToMany role / privilege';
COMMENT ON COLUMN privileges_role.role_id IS 'ManyToMany FK role';
COMMENT ON COLUMN privileges_role.privilege_id IS 'ManyToMany FK privilege';

CREATE TABLE wish (
	wish_id BIGINT not null,
	content TEXT not null,
	user_id BIGINT,
	wish_status_id BIGINT,
	CONSTRAINT PK_WISH PRIMARY KEY (wish_id)
);
COMMENT ON COLUMN wish.user_id IS 'ManyToOne FK mzk_user';
COMMENT ON COLUMN wish.wish_status_id IS 'ManyToOne FK wish_status';

CREATE TABLE random_genre (
	random_genre_id BIGINT not null,
	random_index BIGINT not null,
	genre_id BIGINT,
	CONSTRAINT PK_RANDOM_GENRE PRIMARY KEY (random_genre_id)
);
COMMENT ON COLUMN random_genre.genre_id IS 'ManyToOne FK genre';

CREATE TABLE random_label (
	random_label_id BIGINT not null,
	random_index BIGINT not null,
	label_id BIGINT,
	CONSTRAINT PK_RANDOM_LABEL PRIMARY KEY (random_label_id)
);
COMMENT ON COLUMN random_label.label_id IS 'ManyToOne FK label';

CREATE TABLE random_release_artist (
	random_release_artist_id BIGINT not null,
	random_index BIGINT not null,
	artist_id BIGINT,
	CONSTRAINT PK_RANDOM_RELEASE_ARTIST PRIMARY KEY (random_release_artist_id)
);
COMMENT ON COLUMN random_release_artist.artist_id IS 'ManyToOne FK artist';

CREATE TABLE scan_status (
	scan_status_id BIGINT not null,
	start_time TIMESTAMP not null,
	end_time TIMESTAMP,
	is_active BOOLEAN not null,
	total_track_scanned INTEGER,
	is_rescan BOOLEAN not null,
	scan_step_id BIGINT,
	CONSTRAINT PK_SCAN_STATUS PRIMARY KEY (scan_status_id)
);
COMMENT ON COLUMN scan_status.scan_step_id IS 'ManyToOne FK scan_step';



-- ================================
-- FOREIGN KEYS
-- ================================
ALTER TABLE album_bio ADD CONSTRAINT FK_album_bio_1 FOREIGN KEY (album_id) REFERENCES album(album_id);
ALTER TABLE album_bio ADD CONSTRAINT FK_album_bio_2 FOREIGN KEY (bio_id) REFERENCES bio(bio_id);
ALTER TABLE album ADD CONSTRAINT FK_album_compilation FOREIGN KEY (compilation_type_id) REFERENCES compilation_type(compilation_type_id);
ALTER TABLE album ADD CONSTRAINT FK_album_label FOREIGN KEY (label_id) REFERENCES label(label_id);
ALTER TABLE album_recording_location ADD CONSTRAINT FK_album_recording_location_1 FOREIGN KEY (album_id) REFERENCES album(album_id);
ALTER TABLE album_recording_location ADD CONSTRAINT FK_album_recording_location_2 FOREIGN KEY (recording_location_id) REFERENCES recording_location(recording_location_id);
ALTER TABLE album ADD CONSTRAINT FK_album_band FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE artist ADD CONSTRAINT FK_artist_birth_country FOREIGN KEY (country_id) REFERENCES country(country_id);
ALTER TABLE artist ADD CONSTRAINT FK_band_label FOREIGN KEY (label_id) REFERENCES label(label_id);
ALTER TABLE artist ADD CONSTRAINT FK_band_link FOREIGN KEY (link_id) REFERENCES link(link_id);
ALTER TABLE artist ADD CONSTRAINT FK_band_bio FOREIGN KEY (bio_id) REFERENCES bio(bio_id);
ALTER TABLE band_member ADD CONSTRAINT FK_artist_band_member FOREIGN KEY (band_id) REFERENCES artist(artist_id);
ALTER TABLE band_member ADD CONSTRAINT FK_band_member_artist FOREIGN KEY (member_id) REFERENCES artist(artist_id);
ALTER TABLE member_time_interval ADD CONSTRAINT FK_member_time_interval_1 FOREIGN KEY (band_member_id) REFERENCES band_member(band_member_id);
ALTER TABLE member_time_interval ADD CONSTRAINT FK_member_time_interval_2 FOREIGN KEY (interval_id) REFERENCES time_interval(interval_id);
ALTER TABLE member_role ADD CONSTRAINT FK_member_role_1 FOREIGN KEY (band_member_id) REFERENCES band_member(band_member_id);
ALTER TABLE member_role ADD CONSTRAINT FK_member_role_2 FOREIGN KEY (band_role_id) REFERENCES band_role(band_role_id);
ALTER TABLE link ADD CONSTRAINT FK_link_type FOREIGN KEY (website_id) REFERENCES website_type(website_id);
ALTER TABLE recording_location ADD CONSTRAINT FK_recording_location_country FOREIGN KEY (country_id) REFERENCES country(country_id);
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
ALTER TABLE track_genre ADD CONSTRAINT FK_track_genre_1 FOREIGN KEY (track_id) REFERENCES track(track_id);
ALTER TABLE track_genre ADD CONSTRAINT FK_track_genre_2 FOREIGN KEY (genre_id) REFERENCES genre(genre_id);
ALTER TABLE track_key ADD CONSTRAINT FK_track_key_1 FOREIGN KEY (track_id) REFERENCES track(track_id);
ALTER TABLE track_key ADD CONSTRAINT FK_track_key_2 FOREIGN KEY (key_id) REFERENCES key(key_id);
ALTER TABLE moodbar_error ADD CONSTRAINT FK_moobar_error_track FOREIGN KEY (track_id) REFERENCES track(track_id);
ALTER TABLE thumbnail_error ADD CONSTRAINT FK_label_thumb_error FOREIGN KEY (label_id) REFERENCES label(label_id);
ALTER TABLE thumbnail_error ADD CONSTRAINT FK_thumb_error_album FOREIGN KEY (album_id) REFERENCES album(album_id);
ALTER TABLE thumbnail_error ADD CONSTRAINT FK_thumb_error_genre FOREIGN KEY (genre_id) REFERENCES genre(genre_id);
ALTER TABLE thumbnail_error ADD CONSTRAINT FK_thumb_error_artist FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE thumbnail_error ADD CONSTRAINT FK_thumb_err_type FOREIGN KEY (thumb_error_type_id) REFERENCES thumb_error_type(thumb_error_type_id);
ALTER TABLE badge_user ADD CONSTRAINT FK_badge_user_1 FOREIGN KEY (badge_id) REFERENCES badge(badge_id);
ALTER TABLE badge_user ADD CONSTRAINT FK_badge_user_2 FOREIGN KEY (user_id) REFERENCES mzk_user(user_id);
ALTER TABLE invite_code ADD CONSTRAINT FK_user_invite_parent FOREIGN KEY (parent) REFERENCES mzk_user(user_id);
ALTER TABLE mzk_user ADD CONSTRAINT FK_invite_used FOREIGN KEY (invite_code_id) REFERENCES invite_code(invite_code_id);
ALTER TABLE mzk_user ADD CONSTRAINT FK_user_country FOREIGN KEY (country_id) REFERENCES country(country_id);
ALTER TABLE mzk_user ADD CONSTRAINT FK_user_locale FOREIGN KEY (locale_id) REFERENCES locale(locale_id);
ALTER TABLE mzk_user ADD CONSTRAINT FK_role_user FOREIGN KEY (role_id) REFERENCES role(role_id);
ALTER TABLE privileges_role ADD CONSTRAINT FK_privileges_role_1 FOREIGN KEY (role_id) REFERENCES role(role_id);
ALTER TABLE privileges_role ADD CONSTRAINT FK_privileges_role_2 FOREIGN KEY (privilege_id) REFERENCES privilege(privilege_id);
ALTER TABLE wish ADD CONSTRAINT FK_user_wish FOREIGN KEY (user_id) REFERENCES mzk_user(user_id);
ALTER TABLE wish ADD CONSTRAINT FK_wish_status FOREIGN KEY (wish_status_id) REFERENCES wish_status(wish_status_id);
ALTER TABLE random_genre ADD CONSTRAINT FK_rand_genre FOREIGN KEY (genre_id) REFERENCES genre(genre_id);
ALTER TABLE random_label ADD CONSTRAINT FK_rand_label FOREIGN KEY (label_id) REFERENCES label(label_id);
ALTER TABLE random_release_artist ADD CONSTRAINT FK_rand_rl_artist FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE scan_status ADD CONSTRAINT FK_scan_status_step FOREIGN KEY (scan_step_id) REFERENCES scan_step(scan_step_id);


-- ================================
-- FOREIGN KEYS INDEXES
-- ================================
CREATE INDEX IDX_album_bio_1 ON album_bio (album_id);
CREATE INDEX IDX_album_bio_2 ON album_bio (bio_id);
CREATE INDEX IDX_album_compilation ON album (compilation_type_id);
CREATE INDEX IDX_album_label ON album (label_id);
CREATE INDEX IDX_album_recording_location_1 ON album_recording_location (album_id);
CREATE INDEX IDX_album_recording_location_2 ON album_recording_location (recording_location_id);
CREATE INDEX IDX_album_band ON album (artist_id);
CREATE INDEX IDX_artist_birth_country ON artist (country_id);
CREATE INDEX IDX_band_label ON artist (label_id);
CREATE INDEX IDX_band_link ON artist (link_id);
CREATE INDEX IDX_band_bio ON artist (bio_id);
CREATE INDEX IDX_artist_band_member ON band_member (band_id);
CREATE INDEX IDX_band_member_artist ON band_member (member_id);
CREATE INDEX IDX_member_time_interval_1 ON member_time_interval (band_member_id);
CREATE INDEX IDX_member_time_interval_2 ON member_time_interval (interval_id);
CREATE INDEX IDX_member_role_1 ON member_role (band_member_id);
CREATE INDEX IDX_member_role_2 ON member_role (band_role_id);
CREATE INDEX IDX_link_type ON link (website_id);
CREATE INDEX IDX_recording_location_country ON recording_location (country_id);
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
CREATE INDEX IDX_track_genre_1 ON track_genre (track_id);
CREATE INDEX IDX_track_genre_2 ON track_genre (genre_id);
CREATE INDEX IDX_track_key_1 ON track_key (track_id);
CREATE INDEX IDX_track_key_2 ON track_key (key_id);
CREATE INDEX IDX_moobar_error_track ON moodbar_error (track_id);
CREATE INDEX IDX_label_thumb_error ON thumbnail_error (label_id);
CREATE INDEX IDX_thumb_error_album ON thumbnail_error (album_id);
CREATE INDEX IDX_thumb_error_genre ON thumbnail_error (genre_id);
CREATE INDEX IDX_thumb_error_artist ON thumbnail_error (artist_id);
CREATE INDEX IDX_thumb_err_type ON thumbnail_error (thumb_error_type_id);
CREATE INDEX IDX_badge_user_1 ON badge_user (badge_id);
CREATE INDEX IDX_badge_user_2 ON badge_user (user_id);
CREATE INDEX IDX_user_invite_parent ON invite_code (parent);
CREATE INDEX IDX_invite_used ON mzk_user (invite_code_id);
CREATE INDEX IDX_user_country ON mzk_user (country_id);
CREATE INDEX IDX_user_locale ON mzk_user (locale_id);
CREATE INDEX IDX_role_user ON mzk_user (role_id);
CREATE INDEX IDX_privileges_role_1 ON privileges_role (role_id);
CREATE INDEX IDX_privileges_role_2 ON privileges_role (privilege_id);
CREATE INDEX IDX_user_wish ON wish (user_id);
CREATE INDEX IDX_wish_status ON wish (wish_status_id);
CREATE INDEX IDX_rand_genre ON random_genre (genre_id);
CREATE INDEX IDX_rand_label ON random_label (label_id);
CREATE INDEX IDX_rand_rl_artist ON random_release_artist (artist_id);
CREATE INDEX IDX_scan_status_step ON scan_status (scan_step_id);

-- END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
