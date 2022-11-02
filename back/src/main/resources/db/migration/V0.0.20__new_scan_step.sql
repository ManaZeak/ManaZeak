INSERT INTO scan_step (scan_step_id, label, code)
VALUES (7, 'Label picture extraction', 'reference.scan_status.label_pictures')
ON CONFLICT DO NOTHING;

ALTER TABLE genre ADD COLUMN IF NOT EXISTS picture_filename VARCHAR(32);

INSERT INTO scan_step (scan_step_id, label, code)
VALUES (8, 'Genre picture extraction', 'reference.scan_status.genre_pictures')
ON CONFLICT DO NOTHING;
