-- Creating the sequence
CREATE SEQUENCE SEQ_CONFIGURATION START WITH 1000 CACHE 20;
-- Creating the table
CREATE TABLE configuration
(
    configuration_id BIGINT        not null,
    value            VARCHAR(1000) not null,
    type             VARCHAR(100)  not null,
    CONSTRAINT PK_CONFIGURATION PRIMARY KEY (configuration_id)
);
