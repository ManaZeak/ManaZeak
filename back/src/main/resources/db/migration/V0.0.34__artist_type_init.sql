-- Insert the type of artist into the database.
INSERT INTO artist_type (artist_type_id, code, type) VALUES (1, 'artist.type.band', 'band') ON CONFLICT DO NOTHING;
INSERT INTO artist_type (artist_type_id, code, type) VALUES (2, 'artist.type.artist', 'artist') ON CONFLICT DO NOTHING;

-- Deleting the artist column in the alias table.
ALTER TABLE alias drop column artist_id;

CREATE TABLE artist_alias (
                              artist_id BIGINT not null,
                              alias_id BIGINT not null,
                              CONSTRAINT PK_ARTIST_ALIAS PRIMARY KEY (artist_id,alias_id)
);
COMMENT ON TABLE artist_alias IS 'ManyToMany artist / alias';
COMMENT ON COLUMN artist_alias.artist_id IS 'ManyToMany FK artist';
COMMENT ON COLUMN artist_alias.alias_id IS 'ManyToMany FK alias';

ALTER TABLE time_interval ADD COLUMN interval_key VARCHAR(50) not null;

CREATE UNIQUE INDEX idx_time_interval_concat on time_interval (interval_key);

-- Add a constraint to avoid multiple previous band members
ALTER TABLE band_previous_member ADD CONSTRAINT unique_prev_member_per_band UNIQUE(band_id, prev_member_id);
