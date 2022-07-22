-- Creating the scan status table.
CREATE TABLE scan_status
(
    scan_status_id      BIGINT    not null,
    start_time          TIMESTAMP not null,
    end_time            TIMESTAMP,
    is_active           BOOLEAN   not null,
    total_track_scanned INTEGER,
    is_rescan           BOOLEAN   not null,
    scan_step_id        BIGINT,
    CONSTRAINT PK_SCAN_STATUS PRIMARY KEY (scan_status_id)
);
COMMENT ON COLUMN scan_status.scan_step_id IS 'ManyToOne FK scan_step';

CREATE TABLE scan_step
(
    scan_step_id BIGINT      not null,
    label        VARCHAR(50) not null,
    code         VARCHAR(50) not null,
    CONSTRAINT PK_SCAN_STEP PRIMARY KEY (scan_step_id)
);

-- Creating the new step for the scan.
INSERT INTO scan_step (scan_step_id, label, code) VALUES (1, 'Clearing library', 'reference.scan_status.clearing');
INSERT INTO scan_step (scan_step_id, label, code) VALUES (2, 'Enumerating files', 'reference.scan_status.enumerating');
INSERT INTO scan_step (scan_step_id, label, code) VALUES (3, 'Library integration', 'reference.scan_status.integration');
INSERT INTO scan_step (scan_step_id, label, code) VALUES (4, 'Track cover extraction', 'reference.scan_status.track_cover');
INSERT INTO scan_step (scan_step_id, label, code) VALUES (5, 'Artist picture extraction', 'reference.scan_status.artist_pictures');
INSERT INTO scan_step (scan_step_id, label, code) VALUES (6, 'Done', 'reference.scan_status.done');

ALTER TABLE scan_status ADD CONSTRAINT FK_scan_status_step FOREIGN KEY (scan_step_id) REFERENCES scan_step(scan_step_id);
CREATE INDEX IDX_scan_status_step ON scan_status (scan_step_id);
