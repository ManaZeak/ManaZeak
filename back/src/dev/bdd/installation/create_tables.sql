-- *********************************************
-- CREATE TABLES FOR POSTGRES
--
-- This file has been automatically generated
-- *********************************************
SET search_path TO mix;

-- ================================
-- SEQUENCES
-- ================================
CREATE SEQUENCE SEQ_MIX_USER START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_PRIVILEGE START WITH 1000 CACHE 20; 
CREATE SEQUENCE SEQ_ROLE START WITH 1000 CACHE 20; 
 
 
-- ================================
-- TABLES
-- ================================
CREATE TABLE mix_user (
	is_active BOOLEAN not null,
	password VARCHAR(500) not null,
	user_id BIGINT not null,
	username VARCHAR(200) not null,
	CONSTRAINT PK_MIX_USER PRIMARY KEY (user_id)
);
COMMENT ON TABLE mix_user IS 'A user object.';

CREATE TABLE roles_user (
	user_id BIGINT not null,
	role_id BIGINT not null,
	CONSTRAINT PK_ROLES_USER PRIMARY KEY (user_id,role_id)
);
COMMENT ON TABLE roles_user IS 'ManyToMany mix_user / role';
COMMENT ON COLUMN roles_user.user_id IS 'ManyToMany FK mix_user';
COMMENT ON COLUMN roles_user.role_id IS 'ManyToMany FK role';

CREATE TABLE privilege (
	code_privilege VARCHAR(100) not null,
	privilege_id BIGINT not null,
	CONSTRAINT PK_PRIVILEGE PRIMARY KEY (privilege_id)
);
COMMENT ON TABLE privilege IS 'The privilege a role has.';

CREATE TABLE role (
	code_role VARCHAR(100) not null,
	role_id BIGINT not null,
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
ALTER TABLE roles_user ADD CONSTRAINT FK_roles_user_1 FOREIGN KEY (user_id) REFERENCES mix_user(user_id);
ALTER TABLE roles_user ADD CONSTRAINT FK_roles_user_2 FOREIGN KEY (role_id) REFERENCES role(role_id);
ALTER TABLE privileges_role ADD CONSTRAINT FK_privileges_role_1 FOREIGN KEY (role_id) REFERENCES role(role_id);
ALTER TABLE privileges_role ADD CONSTRAINT FK_privileges_role_2 FOREIGN KEY (privilege_id) REFERENCES privilege(privilege_id);


-- ================================
-- FOREIGN KEYS INDEXES
-- ================================
CREATE INDEX IDX_roles_user_1 ON roles_user (user_id);
CREATE INDEX IDX_roles_user_2 ON roles_user (role_id);
CREATE INDEX IDX_privileges_role_1 ON privileges_role (role_id);
CREATE INDEX IDX_privileges_role_2 ON privileges_role (privilege_id);

-- END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
