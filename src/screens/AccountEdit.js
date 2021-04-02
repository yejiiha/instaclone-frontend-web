import { useState } from "react";
import styled from "styled-components";
import EditProfile from "../components/accountEdit/EditProfile";
import ChangePw from "../components/accountEdit/ChangePw";
import AppsandWebsites from "../components/accountEdit/AppsandWebsites";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  position: relative;
  width: 930px;
  height: 600px;
  display: flex;
`;

const MenuList = styled.ul`
  width: 236px;
  border-right: 1px solid ${(props) => props.theme.borderColor};
  list-style: none;
`;

const Contents = styled.div`
  width: 100%;
  ${(props) => (props.active ? "" : "display:none")}
`;

const Menu = styled.li`
  cursor: pointer;
  padding: 16px 16px 16px 30px;
  border-left: ${(props) =>
    props.active
      ? `2px solid ${props.theme.fontColor}`
      : "2px solid transparent"};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  &:hover {
    background-color: ${(props) =>
      props.active ? "" : "rgb(219, 219, 219, 0.2)"};
    border-left: ${(props) =>
      props.active ? "" : `2px solid ${props.theme.borderColor}`};
  }
`;

function AccountEdit() {
  const [tab, setTab] = useState(0);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== tab) {
      setTab(index);
    }
  };
  return (
    <Wrapper>
      <MenuList>
        <Menu onClick={handleClick} active={tab === 0} id={0}>
          Edit Profile
        </Menu>
        <Menu onClick={handleClick} active={tab === 1} id={1}>
          Change Password
        </Menu>
        <Menu onClick={handleClick} active={tab === 2} id={2}>
          Apps and Websites
        </Menu>
      </MenuList>
      <Contents active={tab === 0}>
        <EditProfile />
      </Contents>
      <Contents active={tab === 1}>
        <ChangePw />
      </Contents>
      <Contents active={tab === 2}>
        <AppsandWebsites />
      </Contents>
    </Wrapper>
  );
}

export default AccountEdit;
