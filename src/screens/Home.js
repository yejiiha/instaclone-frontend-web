import { gql, useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "styled-components";
import Photo from "../components/feed/Photo";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../components/Fragments";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
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

export const override = css`
  display: block;
  margin: 0 auto;
`;

function Home() {
  const { data, loading, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });

  const onLoadMore = () => {
    fetchMore({
      variables: {
        offset: data?.seeFeed?.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          seeFeed: [...prev.seeFeed, ...fetchMoreResult.seeFeed],
        });
      },
    });
  };

  return (
    <>
      <PageTitle title="Jistagram" />
      {loading && <Loader />}
      {data?.seeFeed && (
        <InfiniteScroll
          dataLength={data?.seeFeed?.length}
          next={onLoadMore}
          hasMore={true}
          loader={
            <ClipLoader
              css={override}
              loading={loading}
              size={35}
              color={"#999999"}
            />
          }
        >
          {data?.seeFeed?.map((photo) => (
            <Photo key={photo.id} {...photo} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}

export default Home;
