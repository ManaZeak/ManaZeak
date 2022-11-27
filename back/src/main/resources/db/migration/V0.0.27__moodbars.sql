ALTER TABLE track ADD COLUMN mood VARCHAR(50);

UPDATE track set mood = 'aze';

ALTER TABLE track ALTER COLUMN mood SET NOT NULL;
