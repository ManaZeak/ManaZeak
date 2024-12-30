-- Adding the sequence.
CREATE SEQUENCE SEQ_PLAYLIST_ASIDE START WITH 1000 CACHE 20;

-- Creating the new table.
CREATE TABLE playlist_aside
(
    playlist_aside_id BIGINT  not null,
    rank              INTEGER not null,
    playlist_id       BIGINT,
    user_id           BIGINT,
    CONSTRAINT PK_PLAYLIST_ASIDE PRIMARY KEY (playlist_aside_id),
    UNIQUE (playlist_id, user_id) -- Only one playlist id in the aside.
);
COMMENT ON COLUMN playlist_aside.playlist_id IS 'ManyToOne FK playlist';
COMMENT ON COLUMN playlist_aside.user_id IS 'ManyToOne FK mzk_user';

-- Adding indexes.
CREATE INDEX IDX_playlist_aside_playlist ON playlist_aside (playlist_id);
CREATE INDEX IDX_playlist_aside_user ON playlist_aside (user_id);