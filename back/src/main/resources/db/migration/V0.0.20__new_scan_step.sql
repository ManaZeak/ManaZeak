INSERT INTO scan_step (scan_step_id, label, code) VALUES (7, 'Label picture extraction', 'reference.scan_status.label_pictures') ON CONFLICT DO NOTHING;