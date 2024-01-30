-- Creating the sequence
CREATE SEQUENCE SEQ_CONFIGURATION START WITH 1000 CACHE 20;
-- Creating the table
CREATE TABLE configuration
(
    configuration_tech_id BIGINT        not null,
    configuration_id      BIGINT        not null,
    value                 VARCHAR(1000) not null,
    code                  VARCHAR(200)  not null,
    type                  VARCHAR(100)  not null,
    CONSTRAINT PK_CONFIGURATION PRIMARY KEY (configuration_tech_id)
);

-- Creating the unique index on the configuration table.
CREATE UNIQUE INDEX idx_config_id on configuration (configuration_id);