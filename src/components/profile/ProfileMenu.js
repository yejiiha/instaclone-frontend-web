import { useState } from "react";
import styled from "styled-components";
import { faTag, faTh, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePhotos from "./ProfilePhotos";
import NoPhotos from "./NoPhotos";

const Tabs = styled.div`
  overflow: hidden;
  height: 3em;
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 45px;
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
        {photos?.length === 0 ? (
          <NoPhotos />
        ) : (
          <ProfilePhotos photos={photos} />
        )}
      </Content>
      <Content active={tab === 1}>
        <NoPhotos />
      </Content>
      <Content active={tab === 2}>
        <NoPhotos />
      </Content>
    </div>
  );
}

export default ProfileMenu;
