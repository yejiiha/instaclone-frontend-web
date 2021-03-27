import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../components/Fragments";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      isMine
      createdAt
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

function Home() {
  const { data, loading } = useQuery(FEED_QUERY);
  return (
    <div>
      <PageTitle title="Jistagram" />
      {loading && <Loader />}
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
}

export default Home;
