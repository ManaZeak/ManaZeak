-- *********************************************
-- DROP TABLES FOR ORACLE
--
-- This file has been automatically generated
-- *********************************************
SET search_path TO mix;

-- ================================
-- DROP SEQUENCE
-- ================================
DROP SEQUENCE SEQ_MIX_USER;
DROP SEQUENCE SEQ_PRIVILEGE;
DROP SEQUENCE SEQ_ROLE;
 
-- ================================
-- DROP FOREIGN KEY
-- ================================
ALTER TABLE roles_user DROP CONSTRAINT FK_roles_user_1;
ALTER TABLE roles_user DROP CONSTRAINT FK_roles_user_2;
ALTER TABLE privileges_role DROP CONSTRAINT FK_privileges_role_1;
ALTER TABLE privileges_role DROP CONSTRAINT FK_privileges_role_2;
 
-- ================================
-- DROP FOREIGN KEYS INDEXES
-- ================================
DROP INDEX IDX_roles_user_1;
DROP INDEX IDX_roles_user_2;
DROP INDEX IDX_privileges_role_1;
DROP INDEX IDX_privileges_role_2;
 
-- ================================
-- DROP TABLES
-- ================================
DROP TABLE mix_user;
DROP TABLE roles_user;
DROP TABLE privilege;
DROP TABLE role;
DROP TABLE privileges_role;

-- END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
