-- Modifying the time interval table
ALTER TABLE time_interval DROP COLUMN starting_date;
ALTER TABLE time_interval DROP COLUMN ending_date;

ALTER TABLE time_interval ADD COLUMN starting_date INTEGER not null ;
ALTER TABLE time_interval ADD COLUMN ending_date INTEGER;

-- Dropping the old table and creating it again.
DROP TABLE member_time_interval;
CREATE TABLE member_time_interval (
                                      artist_id BIGINT not null,
                                      interval_id BIGINT not null,
                                      CONSTRAINT PK_MEMBER_TIME_INTERVAL PRIMARY KEY (artist_id,interval_id)
);
COMMENT ON TABLE member_time_interval IS 'ManyToMany artist / time_interval';
COMMENT ON COLUMN member_time_interval.artist_id IS 'ManyToMany FK artist';
COMMENT ON COLUMN member_time_interval.interval_id IS 'ManyToMany FK time_interval';

ALTER TABLE member_time_interval ADD CONSTRAINT FK_member_time_interval_1 FOREIGN KEY (artist_id) REFERENCES artist(artist_id);
ALTER TABLE member_time_interval ADD CONSTRAINT FK_member_time_interval_2 FOREIGN KEY (interval_id) REFERENCES time_interval(interval_id);
CREATE INDEX IDX_member_time_interval_1 ON member_time_interval (artist_id);
CREATE INDEX IDX_member_time_interval_2 ON member_time_interval (interval_id);
