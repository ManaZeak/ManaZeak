-- Adding a new column picture for the artists and the labels.
ALTER TABLE label ADD COLUMN picture_filename VARCHAR(50);
ALTER TABLE artist ADD COLUMN picture_filename VARCHAR(50);
