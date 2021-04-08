import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";

const Lists = styled.ul`
  width: 100%;
`;

const List = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
`;

const ListColumn = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  &:last-child {
    justify-content: flex-end;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  &:first-child {
    margin-right: 12px;
  }
  &:last-child {
    font-weight: 600;
  }
`;

const UnfollowButton = styled.span`
  cursor: pointer;
  margin-left: 20px;
  width: 40%;
  font-size: 14px;
  padding: 9px 6px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
  text-align: center;
  border-radius: 5px;
  font-weight: 600;
  border: 1px solid ${(props) => props.theme.borderColor};
  box-sizing: border-box;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

const FollowButton = styled(UnfollowButton)`
  background-color: ${(props) => props.theme.blue};
  color: white;
  border: none;
`;

function FollowModalList({
  username,
  avatar,
  isMe,
  isFollowing,
  unfollowUser,
  followUser,
  followers,
  following,
}) {
  const getButton = (isMe, isFollowing) => {
    if (isMe) {
      return (
        <Link to="/accounts/edit">
          <UnfollowButton>Edit Profile</UnfollowButton>
        </Link>
      );
    }
    if (isFollowing) {
      return <UnfollowButton onClick={unfollowUser}>Unfollow</UnfollowButton>;
    } else {
      return <FollowButton onClick={followUser}>Follow</FollowButton>;
    }
  };
  return (
    <Lists>
      <List>
        <ListColumn>
          <Column>
            <Link to={`/users/${username}`}>
              <Avatar src={avatar} />
            </Link>
          </Column>
          <Column>
            <Link to={`/users/${username}`}>{username}</Link>
          </Column>
        </ListColumn>
        <ListColumn>
          {followers ? getButton(isMe, isFollowing) : null}
          {following ? getButton(isMe, isFollowing) : null}
        </ListColumn>
      </List>
    </Lists>
  );
}

export default FollowModalList;
