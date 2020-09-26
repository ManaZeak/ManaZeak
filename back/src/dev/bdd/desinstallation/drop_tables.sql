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
DROP SEQUENCE SEQ_LOCALE;
DROP SEQUENCE SEQ_INVITE_CODE;
DROP SEQUENCE SEQ_MZK_USER;
DROP SEQUENCE SEQ_PRIVILEGE;
DROP SEQUENCE SEQ_ROLE;
DROP SEQUENCE SEQ_WISH;
DROP SEQUENCE SEQ_WISH_STATUS;
 
-- ================================
-- DROP FOREIGN KEY
-- ================================
ALTER TABLE mzk_user DROP CONSTRAINT FK_invite_used;
ALTER TABLE user_invite DROP CONSTRAINT FK_user_invite_1;
ALTER TABLE user_invite DROP CONSTRAINT FK_user_invite_2;
ALTER TABLE mzk_user DROP CONSTRAINT FK_user_country;
ALTER TABLE mzk_user DROP CONSTRAINT FK_user_locale;
ALTER TABLE mzk_user DROP CONSTRAINT FK_role_user;
ALTER TABLE privileges_role DROP CONSTRAINT FK_privileges_role_1;
ALTER TABLE privileges_role DROP CONSTRAINT FK_privileges_role_2;
ALTER TABLE wish DROP CONSTRAINT FK_user_wish;
ALTER TABLE wish DROP CONSTRAINT FK_wish_status;
 
-- ================================
-- DROP FOREIGN KEYS INDEXES
-- ================================
DROP INDEX IDX_invite_used;
DROP INDEX IDX_user_invite_1;
DROP INDEX IDX_user_invite_2;
DROP INDEX IDX_user_country;
DROP INDEX IDX_user_locale;
DROP INDEX IDX_role_user;
DROP INDEX IDX_privileges_role_1;
DROP INDEX IDX_privileges_role_2;
DROP INDEX IDX_user_wish;
DROP INDEX IDX_wish_status;
 
-- ================================
-- DROP TABLES
-- ================================
DROP TABLE Country;
DROP TABLE Locale;
DROP TABLE invite_code;
DROP TABLE mzk_user;
DROP TABLE user_invite;
DROP TABLE privilege;
DROP TABLE role;
DROP TABLE privileges_role;
DROP TABLE wish;
DROP TABLE wish_status;

-- END OF GENERATED CODE - YOU CAN EDIT THE FILE AFTER THIS LINE, DO NOT EDIT THIS LINE OR BEFORE THIS LINE
