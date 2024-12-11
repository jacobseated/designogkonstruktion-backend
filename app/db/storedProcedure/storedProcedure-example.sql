CREATE PROCEDURE RemoveUserFromCommunity(userId INT, communityId INT)
BEGIN
    DELETE FROM community_membership
    WHERE user_id = userId AND community_id = communityId;

    -- Efter vi har slettet en bruger fra community_membership,
    -- kan vi eventuelt slette deres beskeder fra det tilhørende community forum
    -- (det er en dårlig idé, men det er bare et teoretisk eksempel)
    DELETE FROM forum
    WHERE user_id = userId AND community_id = communityId;
END;

-- En kæmpe sikkerhedsmæsig fordel er, at vi kan tildele rettigheder på stored procedures;
-- det betyder, at vi generelt set ka begrænse/forbyde skrive-adgang til databasen,
-- og kun tillade en bruger at anvende fores stored procedures
GRANT EXECUTE ON PROCEDURE database_name.insert_into_forum TO 'username'@'host';

-- Det kan muligvis være, man lige skal flush'e en gang, så ændringerne går live..
FLUSH PRIVILEGES;
