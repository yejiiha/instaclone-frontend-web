import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";
import ProfileContents from "../components/profile/ProfileContents";
import {
  FOLLOW_USER_MUTATION,
  SEE_PROFILE_QUERY,
  UNFOLLOW_USER_MUTATION,
} from "../components/profile/ProfileQueries";
import useUser from "../hooks/useUser";

function Profile() {
  const { username } = useParams();
  const { data: userData } = useUser();
  const client = useApolloClient();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
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
  return (
    <div>
      <PageTitle
        title={`${data?.seeProfile?.firstName} ${data?.seeProfile?.lastName}(@${username}) | Jistagram`}
      />
      {loading && <Loader />}
      <ProfileContents
        seeProfile={data?.seeProfile}
        avatar={data?.seeProfile?.avatar}
        username={data?.seeProfile?.username}
        totalFollowers={data?.seeProfile?.totalFollowers}
        totalFollowing={data?.seeProfile?.totalFollowing}
        totalPhotos={data?.seeProfile?.totalPhotos}
        firstName={data?.seeProfile?.firstName}
        lastName={data?.seeProfile?.lastName}
        bio={data?.seeProfile?.bio}
        photos={data?.seeProfile?.photos}
        isMe={data?.seeProfile?.isMe}
        isFollowing={data?.seeProfile?.isFollowing}
        unfollowUser={unfollowUser}
        followUser={followUser}
      />
    </div>
  );
}

export default Profile;
