-- *********************************************
-- DROP TABLES FOR ORACLE
--
-- This file has been automatically generated
-- *********************************************
SET search_path TO music;

-- ================================
-- DROP SEQUENCE
-- ================================
DROP SEQUENCE SEQ_COUNTRY;
DROP SEQUENCE SEQ_INVITE_CODE;
DROP SEQUENCE SEQ_MZK_USER;
DROP SEQUENCE SEQ_PRIVILEGE;
DROP SEQUENCE SEQ_ROLE;
 
-- ================================
-- DROP FOREIGN KEY
-- ================================
ALTER TABLE user_invite DROP CONSTRAINT FK_user_invite_1;
ALTER TABLE user_invite DROP CONSTRAINT FK_user_invite_2;
ALTER TABLE mzk_user DROP CONSTRAINT FK_user_country;
ALTER TABLE mzk_user DROP CONSTRAINT FK_roles_user;
ALTER TABLE privileges_role DROP CONSTRAINT FK_privileges_role_1;
ALTER TABLE privileges_role DROP CONSTRAINT FK_privileges_role_2;
 
-- ================================
-- DROP FOREIGN KEYS INDEXES
-- ================================
DROP INDEX IDX_user_invite_1;
DROP INDEX IDX_user_invite_2;
DROP INDEX IDX_user_country;
DROP INDEX IDX_roles_user;
DROP INDEX IDX_privileges_role_1;
DROP INDEX IDX_privileges_role_2;
 
-- ================================
-- DROP TABLES
-- ================================
DROP TABLE Country;
DROP TABLE invite_code;
DROP TABLE mzk_user;
DROP TABLE user_invite;
DROP TABLE privilege;
DROP TABLE role;
DROP TABLE privileges_role;

-- END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE