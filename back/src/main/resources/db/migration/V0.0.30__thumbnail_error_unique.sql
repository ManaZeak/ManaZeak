-- Creating a unique constraint for the thumbnails error.
ALTER TABLE thumbnail_error DROP CONSTRAINT IF EXISTS unique_thumb_error;
ALTER TABLE thumbnail_error ADD CONSTRAINT unique_thumb_error UNIQUE (label_id, album_id, artist_id, genre_id);

CREATE SEQUENCE SEQ_THUMB_ERROR_TYPE START WITH 1000 CACHE 20;

ALTER TABLE thumbnail_error ADD COLUMN thumb_error_type_id BIGINT;

COMMENT ON COLUMN thumbnail_error.label_id IS 'ManyToOne FK label';
COMMENT ON COLUMN thumbnail_error.album_id IS 'ManyToOne FK album';
COMMENT ON COLUMN thumbnail_error.genre_id IS 'ManyToOne FK genre';
COMMENT ON COLUMN thumbnail_error.artist_id IS 'ManyToOne FK artist';
COMMENT ON COLUMN thumbnail_error.thumb_error_type_id IS 'ManyToOne FK thumb_error_type';

CREATE TABLE thumb_error_type (
                                  thumb_error_type_id BIGINT not null,
                                  label VARCHAR(50) not null,
                                  code VARCHAR(50) not null,
                                  CONSTRAINT PK_THUMB_ERROR_TYPE PRIMARY KEY (thumb_error_type_id)
);

ALTER TABLE thumbnail_error ADD CONSTRAINT FK_thumb_err_type FOREIGN KEY (thumb_error_type_id) REFERENCES thumb_error_type(thumb_error_type_id);

CREATE INDEX IDX_thumb_err_type ON thumbnail_error (thumb_error_type_id);

INSERT INTO thumb_error_type (thumb_error_type_id, label, code) VALUES (1, 'File not found', 'admin.thumb.error.file_not_found');
INSERT INTO thumb_error_type (thumb_error_type_id, label, code) VALUES (2, 'Image error', 'admin.thumb.error.image_error');