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

const Column = styled.div`
  width: 100%;
  &:first-child {
    width: 30%;
  }
  &:last-child {
    width: 70%;
  }
`;

const Avatar = styled.img`
  margin-left: 50px;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  margin-right: 150px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: black;
  @media ${(props) => props.theme.mobileM} {
    height: 77px;
    width: 77px;
    margin-right: 28px;
    margin-left: 28px;
  }
`;

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
  &:not(:last-child) {
    cursor: pointer;
    &:active {
      color: ${(props) => props.theme.darkGray};
      span {
        color: ${(props) => props.theme.darkGray};
      }
    }
  }
`;

const Value = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
`;

const Name = styled(FatText)`
  font-size: 17px;
  cursor: auto;
`;

export const UnfollowButton = styled.span`
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

export const FollowButton = styled(UnfollowButton)`
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
  const [followingModal, setFollowingModal] = useState(false);
  const [followersModal, setFollowersModal] = useState(false);
  const { data, loading, fetchMore: followersFetMore } = useQuery(
    SEE_FOLLOWERS,
    {
      variables: { username: String(username), offset: 0 },
    }
  );
  const { data: whoFollowing, loading: followingLoading, fetchMore } = useQuery(
    SEE_FOLLOWING,
    {
      variables: { username: String(username), offset: 0 },
    }
  );

  const onFollowersLoadMore = () => {
    followersFetMore({
      variables: {
        offset: data?.seeFollowers?.followers?.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const newData = {
          ...prev,
          seeFollowers: {
            ...prev.seeFollowers,
            followers: [
              ...prev.seeFollowers.followers,
              ...fetchMoreResult.seeFollowers.followers,
            ],
          },
        };
        return newData;
      },
    });
  };

  const onFollowingLoadMore = () => {
    fetchMore({
      variables: {
        offset: whoFollowing?.seeFollowing?.following?.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const newData = {
          ...prev,
          seeFollowing: {
            ...prev.seeFollowing,
            following: [
              ...prev.seeFollowing.following,
              ...fetchMoreResult.seeFollowing.following,
            ],
          },
        };
        return newData;
      },
    });
  };

  if (!loading && data && data.seeFollowers) {
    return (
      <Header>
        <Column>
          <Avatar src={avatar} />
        </Column>
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
                </ItemText>
                <FollowersModal
                  followersModal={followersModal}
                  setFollowersModal={setFollowersModal}
                  username={username}
                  followers={data?.seeFollowers?.followers}
                  unfollowUser={unfollowUser}
                  followUser={followUser}
                  onFollowersLoadMore={onFollowersLoadMore}
                  loading={loading}
                />
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
                </ItemText>
                <FollowingModal
                  followingModal={followingModal}
                  setFollowingModal={setFollowingModal}
                  username={username}
                  following={whoFollowing?.seeFollowing?.following}
                  unfollowUser={unfollowUser}
                  followUser={followUser}
                  onFollowingLoadMore={onFollowingLoadMore}
                  followingLoading={followingLoading}
                />
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
