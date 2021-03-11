import { useQuery } from "@apollo/client";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";
import { SEARCH } from "../components/search/searchQueries";
import UserCard from "../components/search/UserCard";
import { FatText } from "../components/shared";

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

function Search({ location: { search } }) {
  const keyword = search.split("=")[1];
  const { data, loading } = useQuery(SEARCH, {
    skip: keyword === undefined,
    variables: {
      keyword,
    },
  });
  if (keyword === undefined) {
    return (
      <Wrapper>
        <FatText>Search for something</FatText>
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUsers && data.searchPhotos) {
    return (
      <Wrapper>
        <Section>
          {data.searchUsers.length === 0 ? (
            <FatText>No Users Found</FatText>
          ) : (
            data.searchUsers.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                username={user.username}
                avatar={user.avatar}
                isFollowing={user.isFollowing}
                isMe={user.isMe}
              />
            ))
          )}
        </Section>
      </Wrapper>
    );
  }
  return null;
}

export default withRouter(Search);
