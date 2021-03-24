import { useState } from "react";
import styled from "styled-components";
import { faTag, faTh, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePhotos from "./ProfilePhotos";

const Tabs = styled.div`
  overflow: hidden;
  height: 3em;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 45px;
  background-color: yellowgreen;
`;

const Tab = styled.button`
  width: 100%;
  position: relative;
  border: none;
  outline: none;
  cursor: pointer;
  text-align: center;
  border-top: 1.5px solid ${(props) => props.theme.borderColor};
  border-top: ${(props) =>
    props.active ? `1.5px solid ${props.theme.fontColor}` : ""};
  color: ${(props) => (props.active ? "inherit" : `${props.theme.darkGray}`)};
  background-color: ${(props) => props.theme.bgColor};
  font-weight: 600;
  svg {
    margin-right: 6px;
  }
`;

const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;

function ProfileMenu({ photos }) {
  const [tab, setTab] = useState(0);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== tab) {
      setTab(index);
    }
  };
  return (
    <div>
      <Tabs>
        <Tab onClick={handleClick} active={tab === 0} id={0}>
          <FontAwesomeIcon icon={faTh} size="lg" />
          Posts
        </Tab>
        <Tab onClick={handleClick} active={tab === 1} id={1}>
          <FontAwesomeIcon icon={faBookmark} size="lg" />
          Saved
        </Tab>
        <Tab onClick={handleClick} active={tab === 2} id={2}>
          <FontAwesomeIcon icon={faTag} size="lg" />
          Tagged
        </Tab>
      </Tabs>
      <Content active={tab === 0}>
        <ProfilePhotos photos={photos} tab={tab} />
      </Content>
      <Content active={tab === 1}>
        <ProfilePhotos photos={photos} tab={tab} />
      </Content>
      <Content active={tab === 2}>
        <ProfilePhotos photos={photos} tab={tab} />
      </Content>
    </div>
  );
}

export default ProfileMenu;
