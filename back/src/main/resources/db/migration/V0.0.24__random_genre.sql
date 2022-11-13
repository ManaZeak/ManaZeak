-- Add the table containing the random for the genre of the application.

CREATE SEQUENCE SEQ_RANDOM_GENRE START WITH 1000 CACHE 20;
CREATE SEQUENCE IF NOT EXISTS SEQ_RANDOM_GENRE_INDEX START WITH 1 CACHE 20;

CREATE TABLE random_genre
(
    random_genre_id BIGINT not null,
    random_index    BIGINT not null,
    genre_id        BIGINT,
    CONSTRAINT PK_RANDOM_GENRE PRIMARY KEY (random_genre_id)
);
COMMENT ON COLUMN random_genre.genre_id IS 'ManyToOne FK genre';

ALTER TABLE random_genre
    ADD CONSTRAINT FK_rand_genre FOREIGN KEY (genre_id) REFERENCES genre (genre_id);

CREATE INDEX IDX_rand_genre ON random_genre (genre_id);
