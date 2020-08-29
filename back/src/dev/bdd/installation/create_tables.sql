-- *********************************************
-- CREATE TABLES FOR POSTGRES
--
-- This file has been automatically generated
-- *********************************************
SET search_path TO music;

-- ================================
-- SEQUENCES
-- ================================
CREATE SEQUENCE SEQ_COUNTRY START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_LOCALE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_INVITE_CODE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_MZK_USER START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_PRIVILEGE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_ROLE START WITH 1000 CACHE 20; 
 
 
-- ================================
-- TABLES
-- ================================
CREATE TABLE Country (
	country_id BIGINT not null,
	name VARCHAR(50) not null,
	trigram VARCHAR(32) not null,
	capital_name VARCHAR(50) not null,
	capital_lat DOUBLE PRECISION not null,
	capital_long DOUBLE PRECISION not null,
	center_lat DOUBLE PRECISION not null,
	center_long DOUBLE PRECISION not null,
	CONSTRAINT PK_COUNTRY PRIMARY KEY (country_id)
);
COMMENT ON TABLE Country IS 'The countries on the earth.';

CREATE TABLE Locale (
	locale_id BIGINT not null,
	code VARCHAR(32) not null,
	value VARCHAR(50) not null,
	CONSTRAINT PK_LOCALE PRIMARY KEY (locale_id)
);
COMMENT ON TABLE Locale IS 'The locale supported by the app.';

CREATE TABLE invite_code (
	invite_code_id BIGINT not null,
	value VARCHAR(50) not null,
	is_active BOOLEAN not null,
	CONSTRAINT PK_INVITE_CODE PRIMARY KEY (invite_code_id)
);
COMMENT ON TABLE invite_code IS 'The invite code of a user.';

CREATE TABLE mzk_user (
	user_id BIGINT not null,
	username VARCHAR(200) not null,
	password VARCHAR(500) not null,
	mail VARCHAR(100),
	is_active BOOLEAN not null,
	name VARCHAR(100),
	surname VARCHAR(100),
	birth_date DATE,
	profile_pic VARCHAR(1000),
	bio TEXT,
	is_complete BOOLEAN not null,
	invite_code_id BIGINT,
	country_id BIGINT,
	locale_id BIGINT,
	role_id BIGINT,
	CONSTRAINT PK_MZK_USER PRIMARY KEY (user_id)
);
COMMENT ON TABLE mzk_user IS 'A user object.';
COMMENT ON COLUMN mzk_user.invite_code_id IS 'ManyToOne FK invite_code';
COMMENT ON COLUMN mzk_user.country_id IS 'ManyToOne FK Country';
COMMENT ON COLUMN mzk_user.locale_id IS 'ManyToOne FK Locale';
COMMENT ON COLUMN mzk_user.role_id IS 'ManyToOne FK role';

CREATE TABLE user_invite (
	user_id BIGINT not null,
	invite_code_id BIGINT not null,
	CONSTRAINT PK_USER_INVITE PRIMARY KEY (user_id,invite_code_id)
);
COMMENT ON TABLE user_invite IS 'ManyToMany mzk_user / invite_code';
COMMENT ON COLUMN user_invite.user_id IS 'ManyToMany FK mzk_user';
COMMENT ON COLUMN user_invite.invite_code_id IS 'ManyToMany FK invite_code';

CREATE TABLE privilege (
	privilege_id BIGINT not null,
	code_privilege VARCHAR(100) not null,
	CONSTRAINT PK_PRIVILEGE PRIMARY KEY (privilege_id)
);
COMMENT ON TABLE privilege IS 'The privilege a role has.';

CREATE TABLE role (
	role_id BIGINT not null,
	code_role VARCHAR(100) not null,
	CONSTRAINT PK_ROLE PRIMARY KEY (role_id)
);
COMMENT ON TABLE role IS 'The role of a user.';

CREATE TABLE privileges_role (
	role_id BIGINT not null,
	privilege_id BIGINT not null,
	CONSTRAINT PK_PRIVILEGES_ROLE PRIMARY KEY (role_id,privilege_id)
);
COMMENT ON TABLE privileges_role IS 'ManyToMany role / privilege';
COMMENT ON COLUMN privileges_role.role_id IS 'ManyToMany FK role';
COMMENT ON COLUMN privileges_role.privilege_id IS 'ManyToMany FK privilege';



-- ================================
-- FOREIGN KEYS
-- ================================
ALTER TABLE mzk_user ADD CONSTRAINT FK_invite_used FOREIGN KEY (invite_code_id) REFERENCES invite_code(invite_code_id);
ALTER TABLE user_invite ADD CONSTRAINT FK_user_invite_1 FOREIGN KEY (user_id) REFERENCES mzk_user(user_id);
ALTER TABLE user_invite ADD CONSTRAINT FK_user_invite_2 FOREIGN KEY (invite_code_id) REFERENCES invite_code(invite_code_id);
ALTER TABLE mzk_user ADD CONSTRAINT FK_user_country FOREIGN KEY (country_id) REFERENCES Country(country_id);
ALTER TABLE mzk_user ADD CONSTRAINT FK_user_locale FOREIGN KEY (locale_id) REFERENCES Locale(locale_id);
ALTER TABLE mzk_user ADD CONSTRAINT FK_role_user FOREIGN KEY (role_id) REFERENCES role(role_id);
ALTER TABLE privileges_role ADD CONSTRAINT FK_privileges_role_1 FOREIGN KEY (role_id) REFERENCES role(role_id);
ALTER TABLE privileges_role ADD CONSTRAINT FK_privileges_role_2 FOREIGN KEY (privilege_id) REFERENCES privilege(privilege_id);


-- ================================
-- FOREIGN KEYS INDEXES
-- ================================
CREATE INDEX IDX_invite_used ON mzk_user (invite_code_id);
CREATE INDEX IDX_user_invite_1 ON user_invite (user_id);
CREATE INDEX IDX_user_invite_2 ON user_invite (invite_code_id);
CREATE INDEX IDX_user_country ON mzk_user (country_id);
CREATE INDEX IDX_user_locale ON mzk_user (locale_id);
CREATE INDEX IDX_role_user ON mzk_user (role_id);
CREATE INDEX IDX_privileges_role_1 ON privileges_role (role_id);
CREATE INDEX IDX_privileges_role_2 ON privileges_role (privilege_id);

-- END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
