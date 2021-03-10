import styled from "styled-components";
import { FatText } from "../shared";

const Header = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  margin-left: 50px;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  margin-right: 150px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: black;
`;

const Column = styled.div``;

const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  &:nth-child(1) {
    display: flex;
    align-items: center;
  }
  &:nth-child(2) {
    margin-bottom: 30px;
  }
  &:nth-child(3) {
    margin-bottom: 10px;
  }
`;

const Username = styled.span`
  font-size: 28px;
`;

const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;

const Value = styled(FatText)`
  font-size: 16px;
`;

const Name = styled(FatText)`
  font-size: 17px;
  cursor: auto;
`;

const UnfollowButton = styled.span`
  cursor: pointer;
  margin-left: 20px;
  margin-top: 8px;
  width: 33%;
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

function ProfileHeader({
  seeProfile,
  avatar,
  username,
  totalFollowers,
  totalFollowing,
  totalPhotos,
  firstName,
  lastName,
  bio,
  unfollowUser,
  followUser,
}) {
  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return <UnfollowButton>Edit Profile</UnfollowButton>;
    }
    if (isFollowing) {
      return <UnfollowButton onClick={unfollowUser}>Unfollow</UnfollowButton>;
    } else {
      return <FollowButton onClick={followUser}>Follow</FollowButton>;
    }
  };
  return (
    <Header>
      <Avatar src={avatar} />
      <Column>
        <Row>
          <Username>{username}</Username>
          {seeProfile ? getButton(seeProfile) : null}
        </Row>
        <Row>
          <List>
            <Item>
              <span>
                <Value>{totalPhotos}</Value> Posts
              </span>
            </Item>
            <Item>
              <span>
                <Value>{totalFollowers}</Value> Followers
              </span>
            </Item>
            <Item>
              <span>
                <Value>{totalFollowing}</Value> Following
              </span>
            </Item>
          </List>
        </Row>
        <Row>
          <Name>
            {firstName}
            {"  "}
            {lastName}
          </Name>
        </Row>
        <Row>{bio}</Row>
      </Column>
    </Header>
  );
}

export default ProfileHeader;
