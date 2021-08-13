-- *********************************************
-- DROP TABLES FOR ORACLE
--
-- This file has been automatically generated
-- *********************************************
SET search_path TO music;

-- ================================
-- DROP SEQUENCE
-- ================================
DROP SEQUENCE SEQ_ARTIST;
DROP SEQUENCE SEQ_BAND;
DROP SEQUENCE SEQ_TRACK;
 
-- ================================
-- DROP FOREIGN KEY
-- ================================
ALTER TABLE band_artist DROP CONSTRAINT FK_band_artist_1;
ALTER TABLE band_artist DROP CONSTRAINT FK_band_artist_2;
ALTER TABLE track_band_artist DROP CONSTRAINT FK_track_band_artist_1;
ALTER TABLE track_band_artist DROP CONSTRAINT FK_track_band_artist_2;
ALTER TABLE track_band_performer DROP CONSTRAINT FK_track_band_performer_1;
ALTER TABLE track_band_performer DROP CONSTRAINT FK_track_band_performer_2;
 
-- ================================
-- DROP FOREIGN KEYS INDEXES
-- ================================
DROP INDEX IDX_band_artist_1;
DROP INDEX IDX_band_artist_2;
DROP INDEX IDX_track_band_artist_1;
DROP INDEX IDX_track_band_artist_2;
DROP INDEX IDX_track_band_performer_1;
DROP INDEX IDX_track_band_performer_2;
 
-- ================================
-- DROP TABLES
-- ================================
DROP TABLE Artist;
DROP TABLE Band;
DROP TABLE band_artist;
DROP TABLE Track;
DROP TABLE track_band_artist;
DROP TABLE track_band_performer;

-- END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
