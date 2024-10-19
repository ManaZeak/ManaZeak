-- Creating sequences
CREATE SEQUENCE SEQ_PLAYLIST START WITH 1000 CACHE 20;
CREATE SEQUENCE SEQ_PLAYLIST_TRACK START WITH 1000 CACHE 20;

-- Creating tables
CREATE TABLE playlist (
                          playlist_id BIGINT not null,
                          name VARCHAR(100) not null,
                          description TEXT,
                          creation_date TIMESTAMP not null,
                          is_public BOOLEAN not null,
                          is_public_editable BOOLEAN not null,
                          image_path VARCHAR(500),
                          user_id BIGINT,
                          CONSTRAINT PK_PLAYLIST PRIMARY KEY (playlist_id)
);
COMMENT ON COLUMN playlist.user_id IS 'ManyToOne FK mzk_user';

CREATE TABLE playlist_track (
                                playlist_track_id BIGINT not null,
                                date_added TIMESTAMP not null,
                                rank INTEGER not null,
                                playlist_id BIGINT,
                                user_id BIGINT,
                                track_id BIGINT,
                                CONSTRAINT PK_PLAYLIST_TRACK PRIMARY KEY (playlist_track_id)
);
COMMENT ON COLUMN playlist_track.playlist_id IS 'ManyToOne FK playlist';
COMMENT ON COLUMN playlist_track.user_id IS 'ManyToOne FK mzk_user';
COMMENT ON COLUMN playlist_track.track_id IS 'ManyToOne FK track';

-- Adding constraints
ALTER TABLE playlist ADD CONSTRAINT FK_playlist_creator FOREIGN KEY (user_id) REFERENCES mzk_user(user_id);
ALTER TABLE playlist_track ADD CONSTRAINT FK_playlist_track_playlist FOREIGN KEY (playlist_id) REFERENCES playlist(playlist_id);
ALTER TABLE playlist_track ADD CONSTRAINT FK_added_by FOREIGN KEY (user_id) REFERENCES mzk_user(user_id);
ALTER TABLE playlist_track ADD CONSTRAINT FK_track_playlist FOREIGN KEY (track_id) REFERENCES track(track_id);

-- Creating indexes
CREATE INDEX IDX_playlist_creator ON playlist (user_id);
CREATE INDEX IDX_playlist_track_playlist ON playlist_track (playlist_id);
CREATE INDEX IDX_added_by ON playlist_track (user_id);
CREATE INDEX IDX_track_playlist ON playlist_track (track_id);