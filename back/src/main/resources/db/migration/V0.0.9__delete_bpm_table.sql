-- Removing all the elements in the track table.
truncate table track CASCADE ;

-- Removing the bpm table.
DROP SEQUENCE SEQ_BPM;
DROP TABLE bpm CASCADE;

-- Modifying the structure of the table.
ALTER TABLE track ADD COLUMN location VARCHAR(500) not null;
ALTER TABLE track ADD COLUMN bpm DOUBLE PRECISION;
ALTER TABLE track ADD COLUMN bpm_offset DOUBLE PRECISION;
ALTER TABLE track ADD COLUMN first_bar DOUBLE PRECISION;
ALTER TABLE track DROP COLUMN bpm_id;
