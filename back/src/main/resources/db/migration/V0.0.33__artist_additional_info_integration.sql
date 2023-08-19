-- This script used to add the additional information of the artist.

-- Creating the new sequences
CREATE SEQUENCE SEQ_ALIAS START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_TESTIMONY START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_ARTIST_TYPE START WITH 1000 CACHE 20;

-- Creating the new tables
CREATE TABLE alias (
                       alias_id BIGINT not null,
                       value VARCHAR(100) not null,
                       artist_id BIGINT,
                       CONSTRAINT PK_ALIAS PRIMARY KEY (alias_id)
);
COMMENT ON COLUMN alias.artist_id IS 'ManyToOne FK artist';

CREATE TABLE artist_origin_country (
                                       artist_id BIGINT not null,
                                       country_id BIGINT not null,
                                       CONSTRAINT PK_ARTIST_ORIGIN_COUNTRY PRIMARY KEY (artist_id,country_id)
);
COMMENT ON TABLE artist_origin_country IS 'ManyToMany artist / country';
COMMENT ON COLUMN artist_origin_country.artist_id IS 'ManyToMany FK artist';
COMMENT ON COLUMN artist_origin_country.country_id IS 'ManyToMany FK country';

CREATE TABLE band_previous_member (
                                      band_id BIGINT not null,
                                      prev_member_id BIGINT not null,
                                      CONSTRAINT PK_BAND_PREVIOUS_MEMBER PRIMARY KEY (band_id,prev_member_id)
);
COMMENT ON TABLE band_previous_member IS 'ManyToMany artist / artist';
COMMENT ON COLUMN band_previous_member.band_id IS 'ManyToMany FK artist';
COMMENT ON COLUMN band_previous_member.prev_member_id IS 'ManyToMany FK artist';

CREATE TABLE artist_type (
                             artist_type_id BIGINT not null,
                             code VARCHAR(50) not null,
                             type TEXT not null,
                             CONSTRAINT PK_ARTIST_TYPE PRIMARY KEY (artist_type_id)
);

CREATE TABLE testimony (
                           testimony_id INTEGER not null,
                           text TEXT not null,
                           artist_id BIGINT,
                           locale_id BIGINT,
                           CONSTRAINT PK_TESTIMONY PRIMARY KEY (testimony_id)
);
COMMENT ON COLUMN testimony.artist_id IS 'ManyToOne FK artist';
COMMENT ON COLUMN testimony.locale_id IS 'ManyToOne FK locale';

-- Updating the artist table.
ALTER TABLE artist DROP COLUMN birth_date;
ALTER TABLE artist DROP COLUMN death_date;

ALTER TABLE artist
    ADD COLUMN birth_date INTEGER,
    ADD COLUMN death_date INTEGER,
    DROP COLUMN country_id,
    DROP COLUMN testimony_from,
    DROP COLUMN testimony_text,
    ADD COLUMN birth_place VARCHAR(100),
    ADD COLUMN death_place VARCHAR(100),
    ADD COLUMN death_country_id BIGINT,
    ADD COLUMN birth_country_id BIGINT,
    ADD COLUMN artist_type_id BIGINT;
COMMENT ON COLUMN artist.death_country_id IS 'ManyToOne FK country';
COMMENT ON COLUMN artist.birth_country_id IS 'ManyToOne FK country';

-- Updating the link table
ALTER TABLE link ADD COLUMN artist_id BIGINT;
COMMENT ON COLUMN link.artist_id IS 'ManyToOne FK artist';

--Updating the bio table
ALTER TABLE bio ADD COLUMN locale_id BIGINT;
COMMENT ON COLUMN bio.locale_id IS 'ManyToOne FK locale';

-- Creating / updating the foreign keys.
ALTER TABLE artist DROP CONSTRAINT IF EXISTS FK_artist_birth_country;
ALTER TABLE artist DROP CONSTRAINT IF EXISTS FK_band_link;
ALTER TABLE alias ADD CONSTRAINT FK_artist_alias FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE artist_origin_country ADD CONSTRAINT FK_artist_origin_country_1 FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE artist_origin_country ADD CONSTRAINT FK_artist_origin_country_2 FOREIGN KEY (country_id) REFERENCES country(country_id);
ALTER TABLE artist ADD CONSTRAINT FK_country_of_death FOREIGN KEY (death_country_id) REFERENCES country(country_id);
ALTER TABLE artist ADD CONSTRAINT FK_country_of_birth FOREIGN KEY (birth_country_id) REFERENCES country(country_id);
ALTER TABLE band_previous_member ADD CONSTRAINT FK_band_previous_member_1 FOREIGN KEY (band_id) REFERENCES artist(artist_id);
ALTER TABLE band_previous_member ADD CONSTRAINT FK_band_previous_member_2 FOREIGN KEY (prev_member_id) REFERENCES artist(artist_id);
ALTER TABLE artist ADD CONSTRAINT FK_artist_type FOREIGN KEY (artist_type_id) REFERENCES artist_type(artist_type_id);
ALTER TABLE bio ADD CONSTRAINT FK_bio_locale FOREIGN KEY (locale_id) REFERENCES locale(locale_id);
ALTER TABLE link ADD CONSTRAINT FK_band_link FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE testimony ADD CONSTRAINT FK_artist_testimony FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE testimony ADD CONSTRAINT FK_testimony_locale FOREIGN KEY (locale_id) REFERENCES locale(locale_id);

-- Creating / updating indexes.
DROP INDEX IF EXISTS IDX_artist_birth_country;
DROP INDEX IF EXISTS IDX_band_link;
CREATE INDEX IDX_artist_alias ON alias (artist_id);
CREATE INDEX IDX_artist_origin_country_1 ON artist_origin_country (artist_id);
CREATE INDEX IDX_artist_origin_country_2 ON artist_origin_country (country_id);
CREATE INDEX IDX_country_of_death ON artist (death_country_id);
CREATE INDEX IDX_country_of_birth ON artist (birth_country_id);
CREATE INDEX IDX_band_previous_member_1 ON band_previous_member (band_id);
CREATE INDEX IDX_band_previous_member_2 ON band_previous_member (prev_member_id);
CREATE INDEX IDX_artist_type ON artist (artist_type_id);
CREATE INDEX IDX_bio_locale ON bio (locale_id);
CREATE INDEX IDX_band_link ON link (artist_id);
CREATE INDEX IDX_artist_testimony ON testimony (artist_id);
CREATE INDEX IDX_testimony_locale ON testimony (locale_id);
