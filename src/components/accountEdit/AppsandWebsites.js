import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Title = styled.h1`
  display: block;
  margin: 68px 0 0 68px;
  font-size: 28px;
  line-height: 32px;
`;

const Container = styled.div`
  padding: 32px 44px 35px 65px;
`;

const MenuList = styled.ul`
  display: flex;
  list-style: none;
  width: 100%;
`;

const Menu = styled.li`
  display: flex;
  justify-content: center;
  padding: 12px 0;
  width: 197px;
  font-weight: 600;
  border-bottom: 1px solid ${(props) => props.theme.fontColor};
  opacity: ${(props) => (props.active ? "1" : "0.3")};
  cursor: pointer;
`;

const Contents = styled.div`
  width: 100%;
  font-size: 15px;
  ${(props) => (props.active ? "" : "display:none")}
`;

const LongText = styled.p`
  display: block;
  margin-top: 32px;
  margin-bottom: 24px;
  line-height: 1.8;
`;

const Text = styled.span`
  color: ${(props) => props.theme.darkGray};
`;

function AppsandWebsites() {
  const [tab, setTab] = useState(0);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== tab) {
      setTab(index);
    }
  };
  return (
    <Wrapper>
      <Title>Apps and Websites</Title>
      <Container>
        <MenuList>
          <Menu onClick={handleClick} active={tab === 0} id={0}>
            ACTIVE
          </Menu>
          <Menu onClick={handleClick} active={tab === 1} id={1}>
            EXPIRED
          </Menu>
          <Menu onClick={handleClick} active={tab === 2} id={2}>
            REMOVED
          </Menu>
        </MenuList>
        <Contents active={tab === 0}>
          <LongText>
            These are apps and websites you've used Instagram to log into and
            have recently used. They can request info you chose to share with
            them.
          </LongText>
          <Text>
            You have not authorized any applications to access your Instagram
            account.
          </Text>
        </Contents>
        <Contents active={tab === 1}>
          <LongText>
            These are apps and websites you've used Instagram to log into and
            may not have used in a while. They may still have access to info you
            previously shared, but their ability to make additional requests for
            private info has expired.
          </LongText>
          <Text>
            You have no expired applications that had access to your Instagram
            account.
          </Text>
        </Contents>
        <Contents active={tab === 2}>
          <LongText>
            These are apps and websites you removed from your account. This
            means they may still have access to info you previously shared, but
            can't make additional requests for private info.
          </LongText>
          <Text>
            You have no removed applications that had access to your Instagram
            account.
          </Text>
        </Contents>
      </Container>
    </Wrapper>
  );
}

export default AppsandWebsites;
