import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PHOTO_FRAGMENT } from "../components/Fragments";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";
import ProfileContents from "../components/profile/ProfileContents";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalPhotos
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

function Profile() {
  const { username } = useParams();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });
  return (
    <div>
      <PageTitle
        title={`${data?.seeProfile?.firstName} ${data?.seeProfile?.lastName}(@${username}) | Jistagram`}
      />
      {loading && <Loader />}
      <ProfileContents
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
      />
    </div>
  );
}

export default Profile;
