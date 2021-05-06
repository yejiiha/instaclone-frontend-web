import { gql, useQuery } from "@apollo/client";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from "react-spinners/ClipLoader";
import styled, { css } from "styled-components";
import Photo from "../components/feed/Photo";
import SideBar from "../components/feed/SideBar";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../components/Fragments";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";
import { CameraWrapper, Text } from "../components/profile/NoPhotos";

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

const Wrapper = styled.div`
  max-width: 930px;
  display: flex;
`;

const Column = styled.div`
  margin-left: 28px;
  @media ${(props) => props.theme.tabletS} {
    margin-left: 0;
    display: none;
  }
`;

const Hide = styled.div`
  max-width: 293px;
  position: absolute;
  right: 0;
  height: 0;
  width: 100%;
`;

const DefaultContainer = styled.div`
  max-width: 615px;
  width: 100%;
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  min-height: 680px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
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
    <Wrapper>
      <PageTitle title="Jistagram" />
      {loading && <Loader />}

      {data?.seeFeed?.length > 0 ? (
        data?.seeFeed && (
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
        )
      ) : (
        <DefaultContainer>
          <CameraWrapper>
            <FontAwesomeIcon icon={faCamera} />
          </CameraWrapper>
          <Text>No post found</Text>
        </DefaultContainer>
      )}
      <Column>
        <Hide></Hide>
        <SideBar />
      </Column>
    </Wrapper>
  );
}

export default Home;
