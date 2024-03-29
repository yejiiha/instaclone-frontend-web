import { useApolloClient, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Avatar from "../Avatar";
import { FOLLOW_USER_MUTATION, UNFOLLOW_USER_MUTATION } from "./ProfileQueries";

export const Lists = styled.div`
  width: 100%;
`;

export const List = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
`;

export const Username = styled.span`
  &:hover {
    text-decoration: underline;
  }
`;

export const ListColumn = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  &:last-child {
    justify-content: flex-end;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  &:first-child {
    margin-right: 12px;
  }
  &:last-child {
    font-weight: 600;
  }
`;

export const UnfollowBtn = styled.span`
  cursor: pointer;
  margin-left: 20px;
  margin-top: 0;
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

export const FollowBtn = styled(UnfollowBtn)`
  background-color: ${(props) => props.theme.blue};
  color: white;
  border: none;
`;

function FollowModalList({
  username,
  avatar,
  isMe,
  isFollowing,
  followers,
  following,
  setFollowingModal,
  followingModal,
  followersModal,
  setFollowersModal,
}) {
  const { data: userData } = useUser();
  const client = useApolloClient();
  const unfollowUserUpdate = (cache, result) => {
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return false;
        },
        totalFollowers(prev) {
          return prev - 1;
        },
      },
    });
    const { me } = userData;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev) {
          return prev - 1;
        },
      },
    });
  };
  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    update: unfollowUserUpdate,
  });

  const followUserCompleted = (data) => {
    const {
      followUser: { ok },
    } = data;
    if (!ok) {
      return;
    }
    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return true;
        },
        totalFollowers(prev) {
          return prev + 1;
        },
      },
    });
    const { me } = userData;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1;
        },
      },
    });
  };
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    onCompleted: followUserCompleted,
  });
  const getButton = (isMe, isFollowing) => {
    if (isMe) {
      return null;
    }
    if (isFollowing) {
      return <UnfollowBtn onClick={unfollowUser}>Unfollow</UnfollowBtn>;
    } else {
      return <FollowBtn onClick={followUser}>Follow</FollowBtn>;
    }
  };
  return (
    <Lists>
      <List>
        <ListColumn>
          <Column>
            <Link to={`/users/${username}`}>
              <Avatar url={avatar} />
            </Link>
          </Column>
          <Column>
            <Link
              to={`/users/${username}`}
              onClick={
                followersModal
                  ? () => setFollowersModal(!followersModal)
                  : () => setFollowingModal(!followingModal)
              }
            >
              <Username>{username}</Username>
            </Link>
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
