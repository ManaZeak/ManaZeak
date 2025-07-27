-- Adding the last modified column for the track table.
ALTER TABLE track ADD COLUMN last_modified TIMESTAMP;

UPDATE track set last_modified = '-infinity';

ALTER TABLE track ALTER COLUMN last_modified set not null;

CREATE INDEX IDX_track_location ON track (location);