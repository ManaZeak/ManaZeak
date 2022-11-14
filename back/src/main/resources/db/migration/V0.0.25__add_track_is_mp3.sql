-- Adding the new column to the track table.
alter table track add column is_mp3 BOOLEAN;

update track set is_mp3 = false;

alter table track alter column is_mp3 set not null;
