-- Creating sequence for the new tables.
CREATE SEQUENCE SEQ_COUNTRY START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_INVITE_CODE START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_MZK_USER START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_PRIVILEGE START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_ROLE START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_LOCALE START WITH 1000 CACHE 20;

-- Creating the tables
CREATE TABLE country
(
    country_id   BIGINT           not null,
    name         VARCHAR(50)      not null,
    trigram      VARCHAR(32)      not null,
    capital_name VARCHAR(50)      not null,
    capital_lat  DOUBLE PRECISION not null,
    capital_long DOUBLE PRECISION not null,
    center_lat   DOUBLE PRECISION not null,
    center_long  DOUBLE PRECISION not null,
    CONSTRAINT PK_COUNTRY PRIMARY KEY (country_id)
);
COMMENT ON TABLE country IS 'The countries on the earth.';

CREATE TABLE locale
(
    locale_id BIGINT      not null,
    code      VARCHAR(32) not null,
    value     VARCHAR(50) not null,
    CONSTRAINT PK_LOCALE PRIMARY KEY (locale_id)
);
COMMENT ON TABLE locale IS 'The locale supported by the app.';

CREATE TABLE invite_code
(
    invite_code_id BIGINT      not null,
    value          VARCHAR(50) not null,
    is_active      BOOLEAN     not null,
    parent         BIGINT,
    CONSTRAINT PK_INVITE_CODE PRIMARY KEY (invite_code_id)
);
COMMENT ON TABLE invite_code IS 'The invite code of a user.';
COMMENT ON COLUMN invite_code.parent IS 'ManyToOne FK mzk_user';

CREATE TABLE mzk_user
(
    user_id        BIGINT       not null,
    username       VARCHAR(200) not null,
    password       VARCHAR(500) not null,
    mail           VARCHAR(100),
    is_active      BOOLEAN      not null,
    name           VARCHAR(100),
    surname        VARCHAR(100),
    birth_date     DATE,
    profile_pic    VARCHAR(1000),
    bio            TEXT,
    is_complete    BOOLEAN      not null,
    creation_date  TIMESTAMP    not null,
    invite_code_id BIGINT,
    country_id     BIGINT,
    locale_id      BIGINT,
    role_id        BIGINT,
    CONSTRAINT PK_MZK_USER PRIMARY KEY (user_id)
);
COMMENT ON TABLE mzk_user IS 'A user object.';
COMMENT ON COLUMN mzk_user.invite_code_id IS 'ManyToOne FK invite_code';
COMMENT ON COLUMN mzk_user.country_id IS 'ManyToOne FK country';
COMMENT ON COLUMN mzk_user.locale_id IS 'ManyToOne FK locale';
COMMENT ON COLUMN mzk_user.role_id IS 'ManyToOne FK role';

CREATE TABLE privilege
(
    privilege_id   BIGINT       not null,
    code_privilege VARCHAR(100) not null,
    CONSTRAINT PK_PRIVILEGE PRIMARY KEY (privilege_id)
);
COMMENT ON TABLE privilege IS 'The privilege a role has.';

CREATE TABLE role
(
    role_id   BIGINT       not null,
    code_role VARCHAR(100) not null,
    CONSTRAINT PK_ROLE PRIMARY KEY (role_id)
);
COMMENT ON TABLE role IS 'The role of a user.';

CREATE TABLE privileges_role
(
    role_id      BIGINT not null,
    privilege_id BIGINT not null,
    CONSTRAINT PK_PRIVILEGES_ROLE PRIMARY KEY (role_id, privilege_id)
);
COMMENT ON TABLE privileges_role IS 'ManyToMany role / privilege';
COMMENT ON COLUMN privileges_role.role_id IS 'ManyToMany FK role';
COMMENT ON COLUMN privileges_role.privilege_id IS 'ManyToMany FK privilege';


-- Creating the foreign keys
ALTER TABLE mzk_user
    ADD CONSTRAINT FK_invite_used FOREIGN KEY (invite_code_id) REFERENCES invite_code (invite_code_id);
ALTER TABLE mzk_user
    ADD CONSTRAINT FK_user_country FOREIGN KEY (country_id) REFERENCES country (country_id);
ALTER TABLE mzk_user
    ADD CONSTRAINT FK_roles_user FOREIGN KEY (role_id) REFERENCES role (role_id);
ALTER TABLE privileges_role
    ADD CONSTRAINT FK_privileges_role_1 FOREIGN KEY (role_id) REFERENCES role (role_id);
ALTER TABLE privileges_role
    ADD CONSTRAINT FK_privileges_role_2 FOREIGN KEY (privilege_id) REFERENCES privilege (privilege_id);
ALTER TABLE mzk_user
    ADD CONSTRAINT FK_user_locale FOREIGN KEY (locale_id) REFERENCES locale (locale_id);
ALTER TABLE invite_code
    ADD CONSTRAINT FK_user_invite_parent FOREIGN KEY (parent) REFERENCES mzk_user (user_id);


-- Adding foreign key indexes
CREATE INDEX IDX_invite_used ON mzk_user (invite_code_id);
CREATE INDEX IDX_user_invite ON invite_code (parent);
CREATE INDEX IDX_user_country ON mzk_user (country_id);
CREATE INDEX IDX_roles_user ON mzk_user (role_id);
CREATE INDEX IDX_privileges_role_1 ON privileges_role (role_id);
CREATE INDEX IDX_privileges_role_2 ON privileges_role (privilege_id);
CREATE INDEX IDX_user_locale ON mzk_user (locale_id);


-- Inserting data for the privileges
INSERT INTO privilege (code_privilege, privilege_id)
values ('PLAY', 1);
INSERT INTO privilege (code_privilege, privilege_id)
values ('WISH', 2);
INSERT INTO privilege (code_privilege, privilege_id)
values ('WISR', 3);
INSERT INTO privilege (code_privilege, privilege_id)
values ('UPLD', 4);
INSERT INTO privilege (code_privilege, privilege_id)
values ('UPAP', 5);
INSERT INTO privilege (code_privilege, privilege_id)
values ('LBED', 6);
INSERT INTO privilege (code_privilege, privilege_id)
values ('ADMV', 7);
INSERT INTO privilege (code_privilege, privilege_id)
values ('RLPV', 8);
INSERT INTO privilege (code_privilege, privilege_id)
values ('USRL', 9);
INSERT INTO privilege (code_privilege, privilege_id)
values ('EDCO', 10);
INSERT INTO privilege (code_privilege, privilege_id)
values ('EDPL', 11);

-- Inserting data for the roles.
INSERT INTO role (role_id, code_role)
values (1, 'USER');
INSERT INTO role (role_id, code_role)
values (2, 'EDITOR');
INSERT INTO role (role_id, code_role)
values (3, 'ADMIN');

-- The user privileges.
INSERT INTO privileges_role (role_id, privilege_id)
values (1, 1);
INSERT INTO privileges_role (role_id, privilege_id)
values (1, 2);
INSERT INTO privileges_role (role_id, privilege_id)
values (1, 4);

-- The editor privileges.
INSERT INTO privileges_role (role_id, privilege_id)
values (2, 1);
INSERT INTO privileges_role (role_id, privilege_id)
values (2, 2);
INSERT INTO privileges_role (role_id, privilege_id)
values (2, 3);
INSERT INTO privileges_role (role_id, privilege_id)
values (2, 4);
INSERT INTO privileges_role (role_id, privilege_id)
values (2, 6);

-- The admin privileges.
INSERT INTO privileges_role (role_id, privilege_id)
values (3, 1);
INSERT INTO privileges_role (role_id, privilege_id)
values (3, 2);
INSERT INTO privileges_role (role_id, privilege_id)
values (3, 3);
INSERT INTO privileges_role (role_id, privilege_id)
values (3, 4);
INSERT INTO privileges_role (role_id, privilege_id)
values (3, 5);
INSERT INTO privileges_role (role_id, privilege_id)
values (3, 6);
INSERT INTO privileges_role (role_id, privilege_id)
values (3, 7);
INSERT INTO privileges_role (role_id, privilege_id)
values (3, 8);
INSERT INTO privileges_role (role_id, privilege_id)
values (3, 9);
INSERT INTO privileges_role (role_id, privilege_id)
values (3, 10);
INSERT INTO privileges_role (role_id, privilege_id)
values (3, 11);

-- Inserting the default admin user.
INSERT INTO mzk_user
(user_id, username, password, mail, is_active, is_complete, name, surname, locale_id, birth_date, profile_pic, bio,
 creation_date, invite_code_id, country_id, role_id)
VALUES (1, 'JESUS', '$2a$10$6iwTp1lPS9cPKqshhJtFsOp/CPTRUA5u0XZnV6Ab0Z3KyBCCHg7DK', 'JESUS@JESUS.JESUS', true, true,
        null, '', null, null, null, null, CURRENT_TIMESTAMP, null, null, 3);

-- Inserting the default invite code for the admin.
INSERT INTO invite_code
    (invite_code_id, value, is_active, parent)
VALUES (1, 'GG_JESUS', true, 1);

commit;
