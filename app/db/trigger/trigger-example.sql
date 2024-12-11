CREATE TRIGGER UpdateMemberCountAfterInsert
AFTER INSERT ON community_membership
FOR EACH ROW
BEGIN
    UPDATE community
    SET member_count = member_count + 1
    WHERE id = NEW.community_id;
END;


