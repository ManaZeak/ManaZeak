CREATE SEQUENCE SEQ_BADGE START WITH 1000 CACHE 20;

CREATE TABLE badge
(
    badge_id BIGINT not null,
    label    TEXT   not null,
    CONSTRAINT PK_BADGE PRIMARY KEY (badge_id)
);

CREATE TABLE badge_user
(
    badge_id BIGINT not null,
    user_id  BIGINT not null,
    CONSTRAINT PK_BADGE_USER PRIMARY KEY (badge_id, user_id)
);
COMMENT ON TABLE badge_user IS 'ManyToMany badge / mzk_user';
COMMENT ON COLUMN badge_user.badge_id IS 'ManyToMany FK badge';
COMMENT ON COLUMN badge_user.user_id IS 'ManyToMany FK mzk_user';


ALTER TABLE badge_user
    ADD CONSTRAINT FK_badge_user_1 FOREIGN KEY (badge_id) REFERENCES badge (badge_id);
ALTER TABLE badge_user
    ADD CONSTRAINT FK_badge_user_2 FOREIGN KEY (user_id) REFERENCES mzk_user (user_id);

CREATE INDEX IDX_badge_user_1 ON badge_user (badge_id);
CREATE INDEX IDX_badge_user_2 ON badge_user (user_id);

-- Insert the emperor badge (for the super admin)
INSERT INTO badge (badge_id, label) VALUES (1, 'Emperor');

-- Linking the badge to the superuser.
INSERT INTO badge_user (badge_id, user_id) VALUES (1, 1);

commit;