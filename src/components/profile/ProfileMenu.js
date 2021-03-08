import { useState } from "react";
import styled from "styled-components";
import { faTag, faTh, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePhotos from "./ProfilePhotos";

const Menus = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  color: #828282;
  text-align: center;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  margin-top: 45px;
`;

const MenuColumn = styled.div`
  margin-top: -1px;
  padding-top: 20px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 60px;
  }
`;

const Text = styled.span`
  margin-left: 8px;
`;

function ProfileMenu({ photos }) {
  const [tab, setTab] = useState("posts");
  return (
    <div>
      <Menus
        style={
          tab === "posts"
            ? { color: "inherit" }
            : tab === "saved"
            ? { color: "inherit" }
            : tab === "tagged"
            ? { color: "inherit" }
            : { color: "#828282" }
        }
      >
        <MenuColumn
          onClick={() => setTab("posts")}
          style={
            tab === "posts"
              ? { color: "inherit", borderTop: "1px solid black" }
              : { color: "#828282" }
          }
        >
          <FontAwesomeIcon
            icon={faTh}
            size="lg"
            style={
              tab === "posts" ? { color: "inherit" } : { color: "#828282" }
            }
          />
          <Text>Posts</Text>
        </MenuColumn>
        <MenuColumn
          onClick={() => setTab("saved")}
          style={
            tab === "saved"
              ? { color: "inherit", borderTop: "1px solid black" }
              : { color: "#828282" }
          }
        >
          <FontAwesomeIcon
            icon={faBookmark}
            size="lg"
            style={
              tab === "saved" ? { color: "inherit" } : { color: "#828282" }
            }
          />
          <Text>Saved</Text>
        </MenuColumn>
        <MenuColumn
          onClick={() => setTab("tagged")}
          style={
            tab === "tagged"
              ? { color: "inherit", borderTop: "1px solid black" }
              : { color: "#828282" }
          }
        >
          <FontAwesomeIcon
            icon={faTag}
            size="lg"
            style={tab === "posts" ? { fill: "inherit" } : { fill: "#828282" }}
          />
          <Text>Tagged</Text>
        </MenuColumn>
      </Menus>

      <ProfilePhotos photos={photos} tab={tab} />
    </div>
  );
}

export default ProfileMenu;
