import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { client } from "../../apollo";
import useUser from "../../hooks/useUser";
import {
  FOLLOW_USER_MUTATION,
  UNFOLLOW_USER_MUTATION,
} from "../profile/ProfileQueries";
import {
  Lists,
  List,
  ListColumn,
  Column,
  UnfollowBtn,
  FollowBtn,
  Username,
} from "../profile/FollowModalList";
import Avatar from "../Avatar";

function UserRow({ id, username, avatar, isMe, isFollowing }) {
  const { data: userData } = useUser();
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
            <Link to={`/users/${username}`}>
              <Username>{username}</Username>
            </Link>
          </Column>
        </ListColumn>
        <ListColumn>{id ? getButton(isMe, isFollowing) : null}</ListColumn>
      </List>
    </Lists>
  );
}

export default UserRow;
