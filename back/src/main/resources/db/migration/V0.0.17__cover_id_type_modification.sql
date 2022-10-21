-- Modifying the cover id type.
ALTER TABLE cover ALTER COLUMN cover_id type BIGINT;

ALTER TABLE album alter column cover_id type BIGINT;

ALTER TABLE album ADD CONSTRAINT unique_cover_name UNIQUE (location);