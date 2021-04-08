import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../shared";
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";
import { SEE_FOLLOWERS, SEE_FOLLOWING } from "./ProfileQueries";

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

const ItemText = styled.span`
  cursor: pointer;
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
  const [followersModal, setFollowersModal] = useState(false);
  const { data, loading } = useQuery(SEE_FOLLOWERS, {
    variables: { username: String(username), page: 1 },
  });
  const [followingModal, setFollowingModal] = useState(false);
  const { data: whoFollowing } = useQuery(SEE_FOLLOWING, {
    variables: { username: String(username) },
  });

  if (!loading && data && data.seeFollowers) {
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
                <ItemText>
                  <Value>{totalPhotos}</Value> Posts
                </ItemText>
              </Item>
              <Item>
                <ItemText
                  onClick={
                    totalFollowers === 0
                      ? null
                      : () => setFollowersModal(!followersModal)
                  }
                >
                  <Value>{totalFollowers}</Value> Followers
                  <FollowersModal
                    followersModal={followersModal}
                    setFollowersModal={setFollowersModal}
                    username={username}
                    followers={data?.seeFollowers?.followers}
                    unfollowUser={unfollowUser}
                    followUser={followUser}
                  />
                </ItemText>
              </Item>
              <Item>
                <ItemText
                  onClick={
                    totalFollowing === 0
                      ? null
                      : () => setFollowingModal(!followingModal)
                  }
                >
                  <Value>{totalFollowing}</Value> Following
                  <FollowingModal
                    followingModal={followingModal}
                    setFollowingModal={setFollowingModal}
                    username={username}
                    following={whoFollowing?.seeFollowing?.following}
                    unfollowUser={unfollowUser}
                    followUser={followUser}
                  />
                </ItemText>
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
  return null;
}

export default ProfileHeader;
