import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../shared";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
`;

const Username = styled(FatText)``;

function UserCard(id, avatar, username, isFollowing, isMe) {
  return (
    <Card>
      <Avatar lg url={avatar} />
      <Username>{username}</Username>
      {/* {!isMe && <FollowButton id={id} isFollowing={isFollowing} />} */}
    </Card>
  );
}
export default UserCard;
