-- Creating the table containing the labels.
CREATE SEQUENCE SEQ_RANDOM_LABEL START WITH 1000 CACHE 20;
CREATE SEQUENCE IF NOT EXISTS SEQ_RANDOM_LABEL_INDEX START WITH 1 CACHE 20;


CREATE TABLE random_label (
                              random_label_id BIGINT not null,
                              random_index BIGINT not null,
                              label_id BIGINT,
                              CONSTRAINT PK_RANDOM_LABEL PRIMARY KEY (random_label_id)
);
COMMENT ON COLUMN random_label.label_id IS 'ManyToOne FK label';

ALTER TABLE random_label ADD CONSTRAINT FK_rand_label FOREIGN KEY (label_id) REFERENCES label(label_id);
CREATE INDEX IDX_rand_label ON random_label (label_id);

