-- Adding a new column to the label table.
ALTER TABLE label add column artist_released BOOLEAN not null default false;
ALTER TABLE label ALTER COLUMN artist_released DROP DEFAULT;

-- Creating an index on the new column.
CREATE INDEX idx_artist_released_label ON label (artist_released);

