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
CREATE SEQUENCE SEQ_COUNTRY START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_LOCALE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_BADGE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_INVITE_CODE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_MZK_USER START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_PRIVILEGE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_ROLE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_WISH START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_WISH_STATUS START WITH 1000 CACHE 20; 
 
 
-- ================================
-- TABLES
-- ================================
CREATE TABLE Artist (
	artist_id BIGINT not null,
	name VARCHAR(200) not null,
	CONSTRAINT PK_ARTIST PRIMARY KEY (artist_id)
);
COMMENT ON TABLE Artist IS 'The information about the ';

CREATE TABLE Band (
	band_id BIGINT not null,
	name VARCHAR(200) not null,
	last_modification_date TIMESTAMP not null,
	location VARCHAR(500) not null,
	CONSTRAINT PK_BAND PRIMARY KEY (band_id)
);
COMMENT ON TABLE Band IS 'Contains the bands of the application.';

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
COMMENT ON TABLE Track IS 'The track information.';

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

CREATE TABLE Country (
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
COMMENT ON TABLE Country IS 'The countries on the earth.';

CREATE TABLE Locale (
	locale_id BIGINT not null,
	code VARCHAR(32) not null,
	value VARCHAR(50) not null,
	CONSTRAINT PK_LOCALE PRIMARY KEY (locale_id)
);
COMMENT ON TABLE Locale IS 'The locale supported by the app.';

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
COMMENT ON COLUMN mzk_user.country_id IS 'ManyToOne FK Country';
COMMENT ON COLUMN mzk_user.locale_id IS 'ManyToOne FK Locale';
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

CREATE TABLE wish_status (
	wish_status_id BIGINT not null,
	code VARCHAR(32) not null,
	CONSTRAINT PK_WISH_STATUS PRIMARY KEY (wish_status_id)
);



-- ================================
-- FOREIGN KEYS
-- ================================
ALTER TABLE band_artist ADD CONSTRAINT FK_band_artist_1 FOREIGN KEY (band_id) REFERENCES Band(band_id);
ALTER TABLE band_artist ADD CONSTRAINT FK_band_artist_2 FOREIGN KEY (artist_id) REFERENCES Artist(artist_id);
ALTER TABLE track_band_artist ADD CONSTRAINT FK_track_band_artist_1 FOREIGN KEY (track_id) REFERENCES Track(track_id);
ALTER TABLE track_band_artist ADD CONSTRAINT FK_track_band_artist_2 FOREIGN KEY (band_id) REFERENCES Band(band_id);
ALTER TABLE track_band_performer ADD CONSTRAINT FK_track_band_performer_1 FOREIGN KEY (track_id) REFERENCES Track(track_id);
ALTER TABLE track_band_performer ADD CONSTRAINT FK_track_band_performer_2 FOREIGN KEY (band_id) REFERENCES Band(band_id);
ALTER TABLE badge_user ADD CONSTRAINT FK_badge_user_1 FOREIGN KEY (badge_id) REFERENCES badge(badge_id);
ALTER TABLE badge_user ADD CONSTRAINT FK_badge_user_2 FOREIGN KEY (user_id) REFERENCES mzk_user(user_id);
ALTER TABLE invite_code ADD CONSTRAINT FK_user_invite_parent FOREIGN KEY (parent) REFERENCES mzk_user(user_id);
ALTER TABLE mzk_user ADD CONSTRAINT FK_invite_used FOREIGN KEY (invite_code_id) REFERENCES invite_code(invite_code_id);
ALTER TABLE mzk_user ADD CONSTRAINT FK_user_country FOREIGN KEY (country_id) REFERENCES Country(country_id);
ALTER TABLE mzk_user ADD CONSTRAINT FK_user_locale FOREIGN KEY (locale_id) REFERENCES Locale(locale_id);
ALTER TABLE mzk_user ADD CONSTRAINT FK_role_user FOREIGN KEY (role_id) REFERENCES role(role_id);
ALTER TABLE privileges_role ADD CONSTRAINT FK_privileges_role_1 FOREIGN KEY (role_id) REFERENCES role(role_id);
ALTER TABLE privileges_role ADD CONSTRAINT FK_privileges_role_2 FOREIGN KEY (privilege_id) REFERENCES privilege(privilege_id);
ALTER TABLE wish ADD CONSTRAINT FK_user_wish FOREIGN KEY (user_id) REFERENCES mzk_user(user_id);
ALTER TABLE wish ADD CONSTRAINT FK_wish_status FOREIGN KEY (wish_status_id) REFERENCES wish_status(wish_status_id);


-- ================================
-- FOREIGN KEYS INDEXES
-- ================================
CREATE INDEX IDX_band_artist_1 ON band_artist (band_id);
CREATE INDEX IDX_band_artist_2 ON band_artist (artist_id);
CREATE INDEX IDX_track_band_artist_1 ON track_band_artist (track_id);
CREATE INDEX IDX_track_band_artist_2 ON track_band_artist (band_id);
CREATE INDEX IDX_track_band_performer_1 ON track_band_performer (track_id);
CREATE INDEX IDX_track_band_performer_2 ON track_band_performer (band_id);
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

-- END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
