-- Creating sequence for the new tables.
CREATE SEQUENCE SEQ_MZK_USER START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_PRIVILEGE START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_ROLE START WITH 1000 CACHE 20;

-- Creating the tables
CREATE TABLE mzk_user (
                          is_active BOOLEAN not null,
                          password VARCHAR(500) not null,
                          user_id BIGINT not null,
                          username VARCHAR(200) not null,
                          role_id BIGINT,
                          CONSTRAINT PK_MZK_USER PRIMARY KEY (user_id)
);
COMMENT ON TABLE mzk_user IS 'A user object.';
COMMENT ON COLUMN mzk_user.role_id IS 'ManyToOne FK role';

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

-- Creating the foreign keys
ALTER TABLE mzk_user ADD CONSTRAINT FK_roles_user FOREIGN KEY (role_id) REFERENCES role(role_id);
ALTER TABLE privileges_role ADD CONSTRAINT FK_privileges_role_1 FOREIGN KEY (role_id) REFERENCES role(role_id);
ALTER TABLE privileges_role ADD CONSTRAINT FK_privileges_role_2 FOREIGN KEY (privilege_id) REFERENCES privilege(privilege_id);

-- Adding foreign key indexes
CREATE INDEX IDX_roles_user ON mzk_user (role_id);
CREATE INDEX IDX_privileges_role_1 ON privileges_role (role_id);
CREATE INDEX IDX_privileges_role_2 ON privileges_role (privilege_id);

commit;
