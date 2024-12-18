
-- CRUD henviser til funktionaliteten i (C)REATE (R)EAD (U)PDATE (D)ELETE, som igen høre under Database Query Language (DQL)
-- og det er nogle generelle principper indenfor programmering, som også gælder med andre programmeringssprog

-- CREATE: Indsættelse af data (husk NOW() fordi Sequelize har ikke implementeret DEFAULT værdien fysisk)
INSERT INTO forum (user_id, community_id, forum_message, message_created)
    VALUES (1, 2, 'This is a forum message.', NOW());

-- READ: Udhentning af data med INNER JOIN som eksempel
SELECT forum.forum_message, user.user_fullname
    FROM forum INNER JOIN user ON forum.user_id = user.user_id;

-- UPDATE: Opdatering af data

UPDATE user SET user_fullname = 'Jacob' WHERE user_id = 3;

-- DELETE: Sletning af data

DELETE FROM user WHERE user_id = 3;


