CREATE SEQUENCE SEQ_BAND_MEMBER START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_TIME_INTERVAL START WITH 1000 CACHE 20;

DROP TABLE band_member;

CREATE TABLE band_member (
                             band_member_id BIGINT not null,
                             band_id BIGINT,
                             member_id BIGINT,
                             CONSTRAINT PK_BAND_MEMBER PRIMARY KEY (band_member_id)
);
COMMENT ON COLUMN band_member.band_id IS 'ManyToOne FK artist';
COMMENT ON COLUMN band_member.member_id IS 'ManyToOne FK artist';

CREATE TABLE time_interval (
                               interval_id BIGINT not null,
                               starting_date DATE not null,
                               ending_date DATE not null,
                               CONSTRAINT PK_TIME_INTERVAL PRIMARY KEY (interval_id)
);

CREATE TABLE band_role (
                           band_role_id BIGINT not null,
                           label VARCHAR(200) not null,
                           description VARCHAR(1000),
                           CONSTRAINT PK_BAND_ROLE PRIMARY KEY (band_role_id)
);


CREATE TABLE member_role (
                             band_member_id BIGINT not null,
                             band_role_id BIGINT not null,
                             CONSTRAINT PK_MEMBER_ROLE PRIMARY KEY (band_member_id,band_role_id)
);
COMMENT ON TABLE member_role IS 'ManyToMany band_member / band_role';
COMMENT ON COLUMN member_role.band_member_id IS 'ManyToMany FK band_member';
COMMENT ON COLUMN member_role.band_role_id IS 'ManyToMany FK band_role';

CREATE TABLE member_time_interval (
                                      band_member_id BIGINT not null,
                                      interval_id BIGINT not null,
                                      CONSTRAINT PK_MEMBER_TIME_INTERVAL PRIMARY KEY (band_member_id,interval_id)
);
COMMENT ON TABLE member_time_interval IS 'ManyToMany band_member / time_interval';
COMMENT ON COLUMN member_time_interval.band_member_id IS 'ManyToMany FK band_member';
COMMENT ON COLUMN member_time_interval.interval_id IS 'ManyToMany FK time_interval';

ALTER TABLE band_member ADD CONSTRAINT FK_artist_band_member FOREIGN KEY (band_id) REFERENCES artist(artist_id);
ALTER TABLE band_member ADD CONSTRAINT FK_band_member_artist FOREIGN KEY (member_id) REFERENCES artist(artist_id);
ALTER TABLE member_time_interval ADD CONSTRAINT FK_member_time_interval_1 FOREIGN KEY (band_member_id) REFERENCES band_member(band_member_id);
ALTER TABLE member_time_interval ADD CONSTRAINT FK_member_time_interval_2 FOREIGN KEY (interval_id) REFERENCES time_interval(interval_id);
ALTER TABLE member_role ADD CONSTRAINT FK_member_role_1 FOREIGN KEY (band_member_id) REFERENCES band_member(band_member_id);
ALTER TABLE member_role ADD CONSTRAINT FK_member_role_2 FOREIGN KEY (band_role_id) REFERENCES band_role(band_role_id);

CREATE INDEX IDX_artist_band_member ON band_member (band_id);
CREATE INDEX IDX_band_member_artist ON band_member (member_id);
CREATE INDEX IDX_member_time_interval_1 ON member_time_interval (band_member_id);
CREATE INDEX IDX_member_time_interval_2 ON member_time_interval (interval_id);
CREATE INDEX IDX_member_role_1 ON member_role (band_member_id);
CREATE INDEX IDX_member_role_2 ON member_role (band_role_id);

ALTER TABLE band_member ADD CONSTRAINT unique_member_per_band UNIQUE(band_id, member_id);