import { useQuery } from "@apollo/client";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";
import { SEARCH } from "../components/search/SearchQueries";
import SquarePost from "../components/search/SquarePost";
import UserCard from "../components/search/UserCard";
import { FatText } from "../components/shared";

const Tabs = styled.div`
  overflow: hidden;
  height: 3em;
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  position: relative;
  border: none;
  outline: none;
  cursor: pointer;
  width: 30%;
  border-bottom: 1.5px solid ${(props) => props.theme.borderColor};
  border-bottom: ${(props) =>
    props.active ? `1.5px solid ${props.theme.fontColor}` : ""};
  color: ${(props) => (props.active ? "inherit" : `${props.theme.darkGray}`)};
  background-color: ${(props) => props.theme.bgColor};
  font-weight: 600;
`;
const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(5, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const NotFoundText = styled(FatText)`
  cursor: auto;
  text-align: left;
`;

function Search({ location: { search } }) {
  const [tab, setTab] = useState(0);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== tab) {
      setTab(index);
    }
  };
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
        <Tabs>
          <Tab onClick={handleClick} active={tab === 0} id={0}>
            Accounts
          </Tab>
          <Tab onClick={handleClick} active={tab === 1} id={1}>
            Posts
          </Tab>
        </Tabs>
        <Content active={tab === 0}>
          <Section>
            {data.searchUsers.length === 0 ? (
              <NotFoundText>No results found</NotFoundText>
            ) : (
              data.searchUsers.map((user) => (
                <UserCard key={user.id} {...user} />
              ))
            )}
          </Section>
        </Content>
        <Content active={tab === 1}>
          <PostSection>
            {data.searchPhotos.length === 0 ? (
              <NotFoundText>No results found</NotFoundText>
            ) : (
              data.searchPhotos.map((post) => (
                <SquarePost key={post.id} {...post} />
              ))
            )}
          </PostSection>
        </Content>
      </Wrapper>
    );
  }
  return null;
}

export default withRouter(Search);