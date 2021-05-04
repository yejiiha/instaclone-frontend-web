import styled from "styled-components";

const SFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  margin: 24px 0 52px 0;
`;

const List = styled.ul`
  display: flex;
  margin-bottom: 16px;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

export const Link = styled.a`
  color: ${(props) => props.theme.darkGray};
  cursor: pointer;
  &:active {
    color: ${(props) => props.theme.borderColor};
  }
`;

export const Copyright = styled.span`
  color: ${(props) => props.theme.darkGray};
`;

function Footer() {
  return (
    <SFooter>
      <List>
        <ListItem>
          <Link>About</Link>
        </ListItem>
        <ListItem>
          <Link>Blog</Link>
        </ListItem>
        <ListItem>
          <Link>Jobs</Link>
        </ListItem>
        <ListItem>
          <Link>Help</Link>
        </ListItem>
        <ListItem>
          <Link>API</Link>
        </ListItem>
        <ListItem>
          <Link>Privacy</Link>
        </ListItem>
        <ListItem>
          <Link>Terms</Link>
        </ListItem>
        <ListItem>
          <Link>Top Accounts</Link>
        </ListItem>
        <ListItem>
          <Link>Hashtags</Link>
        </ListItem>
        <ListItem>
          <Link>Location</Link>
        </ListItem>
      </List>
      <Copyright>&copy; Jistagram {new Date().getFullYear()}</Copyright>
    </SFooter>
  );
}

export default Footer;
