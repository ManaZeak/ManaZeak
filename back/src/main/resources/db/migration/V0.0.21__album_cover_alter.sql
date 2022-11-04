-- Dropping the old tables.
drop sequence SEQ_COVER;

alter table album drop column cover_id;

drop table cover;

-- Adding the new column for the album cover.
alter table album add column cover VARCHAR(32);