import { Link } from "react-router-dom";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Avatar from "../Avatar";
import { Copyright, Link as footerLink } from "../Footer";

const SideBarWrapper = styled.div`
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
  &:active {
    color: ${(props) => props.theme.darkGray};
  }
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

const SLink = styled(footerLink)``;

const SCopyright = styled(Copyright)`
  cursor: pointer;
  &:active {
    color: ${(props) => props.theme.borderColor};
  }
`;

function SideBar() {
  const { data: userData } = useUser();
  return (
    <SideBarWrapper>
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
            window.open("https://github.com/yejiiha/instaclone-frontend-web")
          }
        >
          &copy; Jistagram {new Date().getFullYear()}
        </SCopyright>
      </SideBarFooter>
    </SideBarWrapper>
  );
}

export default SideBar;
