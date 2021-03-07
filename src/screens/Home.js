import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
      }
      commentNumber
      isMine
      isLiked
      createdAt
    }
  }
`;

function Home() {
  const { data, loading } = useQuery(FEED_QUERY);
  return (
    <div>
      <PageTitle title="Home" />
      {loading && <Loader />}
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
}

export default Home;
