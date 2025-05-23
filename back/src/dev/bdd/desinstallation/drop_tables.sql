-- *********************************************
-- DROP TABLES FOR ORACLE
--
-- This file has been automatically generated
-- *********************************************
SET search_path TO music;

-- ================================
-- DROP SEQUENCE
-- ================================
DROP SEQUENCE SEQ_ALBUM;
DROP SEQUENCE SEQ_ARTIST;
DROP SEQUENCE SEQ_BAND_MEMBER;
DROP SEQUENCE SEQ_BIO;
DROP SEQUENCE SEQ_GENRE;
DROP SEQUENCE SEQ_LABEL;
DROP SEQUENCE SEQ_LINK;
DROP SEQUENCE SEQ_RECORDING_LOCATION;
DROP SEQUENCE SEQ_TIME_INTERVAL;
DROP SEQUENCE SEQ_TRACK;
DROP SEQUENCE SEQ_MOODBAR_ERROR;
DROP SEQUENCE SEQ_THUMBNAIL_ERROR;
DROP SEQUENCE SEQ_BAND_ROLE;
DROP SEQUENCE SEQ_COMPILATION_TYPE;
DROP SEQUENCE SEQ_COUNTRY;
DROP SEQUENCE SEQ_KEY;
DROP SEQUENCE SEQ_LOCALE;
DROP SEQUENCE SEQ_SCAN_STEP;
DROP SEQUENCE SEQ_THUMB_ERROR_TYPE;
DROP SEQUENCE SEQ_WEBSITE_TYPE;
DROP SEQUENCE SEQ_WISH_STATUS;
DROP SEQUENCE SEQ_BADGE;
DROP SEQUENCE SEQ_INVITE_CODE;
DROP SEQUENCE SEQ_MZK_USER;
DROP SEQUENCE SEQ_PRIVILEGE;
DROP SEQUENCE SEQ_ROLE;
DROP SEQUENCE SEQ_WISH;
DROP SEQUENCE SEQ_PLAYLIST;
DROP SEQUENCE SEQ_PLAYLIST_TRACK;
DROP SEQUENCE SEQ_RANDOM_GENRE;
DROP SEQUENCE SEQ_RANDOM_LABEL;
DROP SEQUENCE SEQ_RANDOM_RELEASE_ARTIST;
DROP SEQUENCE SEQ_SCAN_STATUS;
 
-- ================================
-- DROP FOREIGN KEY
-- ================================
ALTER TABLE album_bio DROP CONSTRAINT FK_album_bio_1;
ALTER TABLE album_bio DROP CONSTRAINT FK_album_bio_2;
ALTER TABLE album DROP CONSTRAINT FK_album_compilation;
ALTER TABLE album DROP CONSTRAINT FK_album_label;
ALTER TABLE album_recording_location DROP CONSTRAINT FK_album_recording_location_1;
ALTER TABLE album_recording_location DROP CONSTRAINT FK_album_recording_location_2;
ALTER TABLE album DROP CONSTRAINT FK_album_band;
ALTER TABLE artist DROP CONSTRAINT FK_artist_birth_country;
ALTER TABLE artist DROP CONSTRAINT FK_band_label;
ALTER TABLE artist DROP CONSTRAINT FK_band_link;
ALTER TABLE artist DROP CONSTRAINT FK_band_bio;
ALTER TABLE band_member DROP CONSTRAINT FK_artist_band_member;
ALTER TABLE band_member DROP CONSTRAINT FK_band_member_artist;
ALTER TABLE member_time_interval DROP CONSTRAINT FK_member_time_interval_1;
ALTER TABLE member_time_interval DROP CONSTRAINT FK_member_time_interval_2;
ALTER TABLE member_role DROP CONSTRAINT FK_member_role_1;
ALTER TABLE member_role DROP CONSTRAINT FK_member_role_2;
ALTER TABLE link DROP CONSTRAINT FK_link_type;
ALTER TABLE recording_location DROP CONSTRAINT FK_recording_location_country;
ALTER TABLE track DROP CONSTRAINT FK_track_album;
ALTER TABLE track_producer DROP CONSTRAINT FK_track_producer_1;
ALTER TABLE track_producer DROP CONSTRAINT FK_track_producer_2;
ALTER TABLE track_band_artist DROP CONSTRAINT FK_track_band_artist_1;
ALTER TABLE track_band_artist DROP CONSTRAINT FK_track_band_artist_2;
ALTER TABLE track_composer DROP CONSTRAINT FK_track_composer_1;
ALTER TABLE track_composer DROP CONSTRAINT FK_track_composer_2;
ALTER TABLE track_lyricist DROP CONSTRAINT FK_track_lyricist_1;
ALTER TABLE track_lyricist DROP CONSTRAINT FK_track_lyricist_2;
ALTER TABLE track_performer DROP CONSTRAINT FK_track_performer_1;
ALTER TABLE track_performer DROP CONSTRAINT FK_track_performer_2;
ALTER TABLE track_engineer DROP CONSTRAINT FK_track_engineer_1;
ALTER TABLE track_engineer DROP CONSTRAINT FK_track_engineer_2;
ALTER TABLE track_arranger DROP CONSTRAINT FK_track_arranger_1;
ALTER TABLE track_arranger DROP CONSTRAINT FK_track_arranger_2;
ALTER TABLE track_genre DROP CONSTRAINT FK_track_genre_1;
ALTER TABLE track_genre DROP CONSTRAINT FK_track_genre_2;
ALTER TABLE track_key DROP CONSTRAINT FK_track_key_1;
ALTER TABLE track_key DROP CONSTRAINT FK_track_key_2;
ALTER TABLE moodbar_error DROP CONSTRAINT FK_moobar_error_track;
ALTER TABLE thumbnail_error DROP CONSTRAINT FK_label_thumb_error;
ALTER TABLE thumbnail_error DROP CONSTRAINT FK_thumb_error_album;
ALTER TABLE thumbnail_error DROP CONSTRAINT FK_thumb_error_genre;
ALTER TABLE thumbnail_error DROP CONSTRAINT FK_thumb_error_artist;
ALTER TABLE thumbnail_error DROP CONSTRAINT FK_thumb_err_type;
ALTER TABLE badge_user DROP CONSTRAINT FK_badge_user_1;
ALTER TABLE badge_user DROP CONSTRAINT FK_badge_user_2;
ALTER TABLE invite_code DROP CONSTRAINT FK_user_invite_parent;
ALTER TABLE mzk_user DROP CONSTRAINT FK_invite_used;
ALTER TABLE mzk_user DROP CONSTRAINT FK_user_country;
ALTER TABLE mzk_user DROP CONSTRAINT FK_user_locale;
ALTER TABLE mzk_user DROP CONSTRAINT FK_role_user;
ALTER TABLE privileges_role DROP CONSTRAINT FK_privileges_role_1;
ALTER TABLE privileges_role DROP CONSTRAINT FK_privileges_role_2;
ALTER TABLE wish DROP CONSTRAINT FK_user_wish;
ALTER TABLE wish DROP CONSTRAINT FK_wish_status;
ALTER TABLE playlist DROP CONSTRAINT FK_playlist_creator;
ALTER TABLE playlist_track DROP CONSTRAINT FK_playlist_track_playlist;
ALTER TABLE playlist_track DROP CONSTRAINT FK_added_by;
ALTER TABLE playlist_track DROP CONSTRAINT FK_track_playlist;
ALTER TABLE random_genre DROP CONSTRAINT FK_rand_genre;
ALTER TABLE random_label DROP CONSTRAINT FK_rand_label;
ALTER TABLE random_release_artist DROP CONSTRAINT FK_rand_rl_artist;
ALTER TABLE scan_status DROP CONSTRAINT FK_scan_status_step;
 
-- ================================
-- DROP FOREIGN KEYS INDEXES
-- ================================
DROP INDEX IDX_album_bio_1;
DROP INDEX IDX_album_bio_2;
DROP INDEX IDX_album_compilation;
DROP INDEX IDX_album_label;
DROP INDEX IDX_album_recording_location_1;
DROP INDEX IDX_album_recording_location_2;
DROP INDEX IDX_album_band;
DROP INDEX IDX_artist_birth_country;
DROP INDEX IDX_band_label;
DROP INDEX IDX_band_link;
DROP INDEX IDX_band_bio;
DROP INDEX IDX_artist_band_member;
DROP INDEX IDX_band_member_artist;
DROP INDEX IDX_member_time_interval_1;
DROP INDEX IDX_member_time_interval_2;
DROP INDEX IDX_member_role_1;
DROP INDEX IDX_member_role_2;
DROP INDEX IDX_link_type;
DROP INDEX IDX_recording_location_country;
DROP INDEX IDX_track_album;
DROP INDEX IDX_track_producer_1;
DROP INDEX IDX_track_producer_2;
DROP INDEX IDX_track_band_artist_1;
DROP INDEX IDX_track_band_artist_2;
DROP INDEX IDX_track_composer_1;
DROP INDEX IDX_track_composer_2;
DROP INDEX IDX_track_lyricist_1;
DROP INDEX IDX_track_lyricist_2;
DROP INDEX IDX_track_performer_1;
DROP INDEX IDX_track_performer_2;
DROP INDEX IDX_track_engineer_1;
DROP INDEX IDX_track_engineer_2;
DROP INDEX IDX_track_arranger_1;
DROP INDEX IDX_track_arranger_2;
DROP INDEX IDX_track_genre_1;
DROP INDEX IDX_track_genre_2;
DROP INDEX IDX_track_key_1;
DROP INDEX IDX_track_key_2;
DROP INDEX IDX_moobar_error_track;
DROP INDEX IDX_label_thumb_error;
DROP INDEX IDX_thumb_error_album;
DROP INDEX IDX_thumb_error_genre;
DROP INDEX IDX_thumb_error_artist;
DROP INDEX IDX_thumb_err_type;
DROP INDEX IDX_badge_user_1;
DROP INDEX IDX_badge_user_2;
DROP INDEX IDX_user_invite_parent;
DROP INDEX IDX_invite_used;
DROP INDEX IDX_user_country;
DROP INDEX IDX_user_locale;
DROP INDEX IDX_role_user;
DROP INDEX IDX_privileges_role_1;
DROP INDEX IDX_privileges_role_2;
DROP INDEX IDX_user_wish;
DROP INDEX IDX_wish_status;
DROP INDEX IDX_playlist_creator;
DROP INDEX IDX_playlist_track_playlist;
DROP INDEX IDX_added_by;
DROP INDEX IDX_track_playlist;
DROP INDEX IDX_rand_genre;
DROP INDEX IDX_rand_label;
DROP INDEX IDX_rand_rl_artist;
DROP INDEX IDX_scan_status_step;
 
-- ================================
-- DROP TABLES
-- ================================
DROP TABLE album;
DROP TABLE album_bio;
DROP TABLE album_recording_location;
DROP TABLE artist;
DROP TABLE band_member;
DROP TABLE member_time_interval;
DROP TABLE member_role;
DROP TABLE bio;
DROP TABLE genre;
DROP TABLE label;
DROP TABLE link;
DROP TABLE recording_location;
DROP TABLE time_interval;
DROP TABLE track;
DROP TABLE track_producer;
DROP TABLE track_band_artist;
DROP TABLE track_composer;
DROP TABLE track_lyricist;
DROP TABLE track_performer;
DROP TABLE track_engineer;
DROP TABLE track_arranger;
DROP TABLE track_genre;
DROP TABLE track_key;
DROP TABLE moodbar_error;
DROP TABLE thumbnail_error;
DROP TABLE band_role;
DROP TABLE compilation_type;
DROP TABLE country;
DROP TABLE key;
DROP TABLE locale;
DROP TABLE scan_step;
DROP TABLE thumb_error_type;
DROP TABLE website_type;
DROP TABLE wish_status;
DROP TABLE badge;
DROP TABLE badge_user;
DROP TABLE invite_code;
DROP TABLE mzk_user;
DROP TABLE privilege;
DROP TABLE role;
DROP TABLE privileges_role;
DROP TABLE wish;
DROP TABLE playlist;
DROP TABLE playlist_track;
DROP TABLE random_genre;
DROP TABLE random_label;
DROP TABLE random_release_artist;
DROP TABLE scan_status;

-- END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
