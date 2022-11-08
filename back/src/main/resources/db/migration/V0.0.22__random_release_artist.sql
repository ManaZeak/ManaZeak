-- Creating the table containing the random release artists.
CREATE SEQUENCE IF NOT EXISTS SEQ_RANDOM_RELEASE_ARTIST START WITH 1000 CACHE 20;
CREATE SEQUENCE IF NOT EXISTS SEQ_RANDOM_RELEASE_ARTIST_INDEX START WITH 1 CACHE 20;

CREATE TABLE IF NOT EXISTS random_release_artist
(
    random_release_artist_id BIGINT not null,
    index                    BIGINT not null,
    artist_id                BIGINT,
    CONSTRAINT PK_RANDOM_RELEASE_ARTIST PRIMARY KEY (random_release_artist_id)
);
COMMENT ON COLUMN random_release_artist.artist_id IS 'ManyToOne FK artist';


ALTER TABLE random_release_artist
    DROP CONSTRAINT IF EXISTS FK_rand_rl_artist;
ALTER TABLE random_release_artist
    ADD CONSTRAINT FK_rand_rl_artist FOREIGN KEY (artist_id) REFERENCES artist (artist_id);

CREATE INDEX IF NOT EXISTS IDX_rand_rl_artist ON random_release_artist (artist_id);

-- Creating the index for getting the elements faster.
CREATE INDEX IF NOT EXISTS IDX_rand_rl_artist_index ON random_release_artist (index);

-- Adding a new status for the generation of the library.
INSERT INTO scan_step (scan_step_id, label, code)
VALUES (9, 'Random table generation', 'reference.scan_status.random_table_generation')
ON CONFLICT DO NOTHING;
