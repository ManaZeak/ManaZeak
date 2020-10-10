-- Adds the wishes to the application

-- Creating sequences
CREATE SEQUENCE SEQ_WISH START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_WISH_STATUS START WITH 1000 CACHE 20;

-- Creating the tables
CREATE TABLE wish
(
    wish_id        BIGINT not null,
    content        TEXT   not null,
    user_id        BIGINT,
    wish_status_id BIGINT,
    CONSTRAINT PK_WISH PRIMARY KEY (wish_id)
);
COMMENT ON COLUMN wish.user_id IS 'ManyToOne FK mzk_user';
COMMENT ON COLUMN wish.wish_status_id IS 'ManyToOne FK wish_status';

CREATE TABLE wish_status
(
    wish_status_id BIGINT      not null,
    code           VARCHAR(32) not null,
    CONSTRAINT PK_WISH_STATUS PRIMARY KEY (wish_status_id)
);

-- Adding foreign key
ALTER TABLE wish
    ADD CONSTRAINT FK_user_wish FOREIGN KEY (user_id) REFERENCES mzk_user (user_id);
ALTER TABLE wish
    ADD CONSTRAINT FK_wish_status FOREIGN KEY (wish_status_id) REFERENCES wish_status (wish_status_id);

-- Creating index
CREATE INDEX IDX_user_wish ON wish (user_id);
CREATE INDEX IDX_wish_status ON wish (wish_status_id);

-- Inserting data in the tables
INSERT INTO wish_status (wish_status_id, code)
VALUES (1, 'OK');
INSERT INTO wish_status (wish_status_id, code)
VALUES (2, 'NOK');
INSERT INTO wish_status (wish_status_id, code)
VALUES (3, 'TODO');

