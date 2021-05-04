import { gql, useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import styled, { css } from "styled-components";
import Avatar from "../components/Avatar";
import Photo from "../components/feed/Photo";
import { Copyright, Link as footrerLink } from "../components/Footer";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../components/Fragments";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";
import useUser from "../hooks/useUser";

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
`;

const Hide = styled.div`
  max-width: 293px;
  position: absolute;
  right: 0;
  height: 0;
  width: 100%;
`;

const SideBar = styled.div`
  width: 293px;
  position: fixed;
  height: 18vh;
`;

const SideBarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 18px;
`;

const SideBarColumn = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: 600;
`;

const FullName = styled.span`
  margin-top: 8px;
  font-size: 13px;
  color: ${(props) => props.theme.darkGray};
`;

const SideBarFooter = styled.footer`
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-top: 36px;
  font-size: 12px;
`;

const FooterNav = styled.nav`
  margin-bottom: 16px;
  color: ${(props) => props.theme.darkGray};
`;

const Lists = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const List = styled.li`
  &:not(:last-of-type)::after {
    content: "\\00B7";
    margin: 0 0.25em;
  }
`;

const SLink = styled(footrerLink)``;

const SCopyright = styled(Copyright)`
  cursor: pointer;
  &:active {
    color: ${(props) => props.theme.borderColor};
  }
`;

function Home() {
  const { data: userData } = useUser();
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
      <Column>
        <Hide></Hide>
        <SideBar>
          <SideBarHeader>
            <Link to={`/users/${userData?.me?.username}`}>
              <Avatar xl url={userData?.me?.avatar} />
            </Link>
            <SideBarColumn>
              <Link to={`/users/${userData?.me?.username}`}>
                <Username>{userData?.me?.username}</Username>
              </Link>
              <FullName>
                {userData?.me?.firstName} {userData?.me?.lastName}
              </FullName>
            </SideBarColumn>
          </SideBarHeader>
          <SideBarFooter>
            <FooterNav>
              <Lists>
                <List>
                  <SLink>About</SLink>
                </List>
                <List>
                  <SLink>Blog</SLink>
                </List>
                <List>
                  <SLink>Jobs</SLink>
                </List>
                <List>
                  <SLink>Help</SLink>
                </List>
                <List>
                  <SLink>API</SLink>
                </List>
                <List>
                  <SLink>Privacy</SLink>
                </List>
                <List>
                  <SLink>Terms</SLink>
                </List>
                <List>
                  <SLink>Top Accounts</SLink>
                </List>
                <List>
                  <SLink>Hashtags</SLink>
                </List>
                <List>
                  <SLink>Location</SLink>
                </List>
              </Lists>
            </FooterNav>
            <SCopyright
              onClick={() =>
                window.open(
                  "https://github.com/yejiiha/instaclone-frontend-web"
                )
              }
            >
              &copy; Jistagram {new Date().getFullYear()}
            </SCopyright>
          </SideBarFooter>
        </SideBar>
      </Column>
    </Wrapper>
  );
}

export default Home;
