import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import useUser from "../../hooks/useUser";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  FOLLOW_USER_MUTATION,
  SEE_PROFILE_QUERY,
  UNFOLLOW_USER_MUTATION,
} from "../profile/ProfileQueries";
import { UnfollowButton } from "../profile/ProfileHeader";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
`;

const CLink = styled(Link)`
  margin: 10px 0;
`;

const UnfollowBtn = styled(UnfollowButton)`
  width: 100px;
  margin: 0;
  padding: 8px 5px;
`;

const FollowBtn = styled(UnfollowBtn)`
  background-color: ${(props) => props.theme.blue};
  color: white;
  border: none;
`;

function UserCard({ avatar, username }) {
  const { data: userData } = useUser();
  const client = useApolloClient();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

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

  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return (
        <Link to="/accounts/edit">
          <UnfollowBtn>Edit Profile</UnfollowBtn>
        </Link>
      );
    }
    if (isFollowing) {
      return <UnfollowBtn onClick={unfollowUser}>Unfollow</UnfollowBtn>;
    } else {
      return <FollowBtn onClick={followUser}>Follow</FollowBtn>;
    }
  };

  return (
    <Card>
      <Avatar xxl url={avatar} />
      <CLink to={`/users/${username}`}>
        <FatText>{username}</FatText>
      </CLink>
      {data?.seeProfile ? getButton(data?.seeProfile) : null}
    </Card>
  );
}

UserCard.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
};

export default UserCard;
