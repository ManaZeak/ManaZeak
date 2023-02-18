-- Creating the sequence for the new table.
CREATE SEQUENCE SEQ_THUMBNAIL_ERROR START WITH 1000 CACHE 20;

-- Creating the table for the thumbnails error.
CREATE TABLE thumbnail_error
(
    thumb_err_id BIGINT  not null,
    error        TEXT    not null,
    processed    BOOLEAN not null,
    label_id     BIGINT,
    album_id     BIGINT,
    genre_id     BIGINT,
    artist_id    BIGINT,
    CONSTRAINT PK_THUMBNAIL_ERROR PRIMARY KEY (thumb_err_id)
);
COMMENT ON COLUMN thumbnail_error.label_id IS 'OneToOne FK label';
COMMENT ON COLUMN thumbnail_error.album_id IS 'OneToOne FK album';
COMMENT ON COLUMN thumbnail_error.genre_id IS 'OneToOne FK genre';
COMMENT ON COLUMN thumbnail_error.artist_id IS 'OneToOne FK artist';

-- Creating the constraints.
ALTER TABLE thumbnail_error
    ADD CONSTRAINT FK_label_thumb_error FOREIGN KEY (label_id) REFERENCES label (label_id);
ALTER TABLE thumbnail_error
    ADD CONSTRAINT FK_thumb_error_album FOREIGN KEY (album_id) REFERENCES album (album_id);
ALTER TABLE thumbnail_error
    ADD CONSTRAINT FK_thumb_error_genre FOREIGN KEY (genre_id) REFERENCES genre (genre_id);
ALTER TABLE thumbnail_error
    ADD CONSTRAINT FK_thumb_error_artist FOREIGN KEY (artist_id) REFERENCES artist (artist_id);

-- Creating the indexes.
CREATE INDEX IDX_label_thumb_error ON thumbnail_error (label_id);
CREATE INDEX IDX_thumb_error_album ON thumbnail_error (album_id);
CREATE INDEX IDX_thumb_error_genre ON thumbnail_error (genre_id);
CREATE INDEX IDX_thumb_error_artist ON thumbnail_error (artist_id);