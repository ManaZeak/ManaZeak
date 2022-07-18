-- Creating the new indexes to speed up the database queries.
CREATE UNIQUE INDEX IDX_album_title ON album (title);
CREATE UNIQUE INDEX IDX_artist_name ON artist (name);
CREATE UNIQUE INDEX IDX_label_name ON label (name);
CREATE UNIQUE INDEX IDX_recording_location_label ON recording_location (label);
