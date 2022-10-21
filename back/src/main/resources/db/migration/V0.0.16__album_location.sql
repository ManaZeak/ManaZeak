-- Adding a new column containing the album location.
alter table album add column IF NOT EXISTS location VARCHAR(500) not null default ' ';

-- Adding an index to fetch the albums faster by their location.
create unique index idx_album_location on album (location)