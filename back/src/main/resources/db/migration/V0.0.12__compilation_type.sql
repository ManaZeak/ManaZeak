ALTER TABLE compilation_type ADD COLUMN code INTEGER not null;

-- Inserting the value of the compilation type ref.
INSERT INTO compilation_type (compilation_type_id, label, code) VALUES (1, 'regular', 0);
INSERT INTO compilation_type (compilation_type_id, label, code) VALUES (2, 'Various artists', 1);
INSERT INTO compilation_type (compilation_type_id, label, code) VALUES (3, 'Compilation', 2);

