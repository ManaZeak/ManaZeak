-- Deleting the old column in the artist table.
ALTER TABLE artist
    DROP COLUMN bio_id;

-- Creating the association table
CREATE TABLE band_bio
(
    artist_id BIGINT not null,
    bio_id    BIGINT not null,
    CONSTRAINT PK_BAND_BIO PRIMARY KEY (artist_id, bio_id)
);
COMMENT ON TABLE band_bio IS 'ManyToMany artist / bio';
COMMENT ON COLUMN band_bio.artist_id IS 'ManyToMany FK artist';
COMMENT ON COLUMN band_bio.bio_id IS 'ManyToMany FK bio';

-- Creating constraints and indexes.
ALTER TABLE band_bio
    ADD CONSTRAINT FK_band_bio_1 FOREIGN KEY (artist_id) REFERENCES artist (artist_id);
ALTER TABLE band_bio
    ADD CONSTRAINT FK_band_bio_2 FOREIGN KEY (bio_id) REFERENCES bio (bio_id);
CREATE INDEX IDX_band_bio_1 ON band_bio (artist_id);
CREATE INDEX IDX_band_bio_2 ON band_bio (bio_id);

ALTER TABLE testimony ADD COLUMN from_artist_id BIGINT;
COMMENT ON COLUMN testimony.from_artist_id IS 'ManyToOne FK artist';
ALTER TABLE testimony ADD CONSTRAINT FK_testimony_from_artist FOREIGN KEY (from_artist_id) REFERENCES artist(artist_id);
CREATE INDEX IDX_testimony_from_artist ON testimony (from_artist_id);

-- Modifying the artist table.
ALTER TABLE artist DROP COLUMN death_date;
ALTER TABLE artist DROP COLUMN birth_date;

ALTER TABLE artist ADD COLUMN birth_date DATE;
ALTER TABLE artist ADD COLUMN death_date DATE;