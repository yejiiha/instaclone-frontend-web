import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { logUserOut } from "../apollo";

const ModalShow = css`
  top: 49px;
  display: block;
`;

const Modal = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: auto;
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 6px;
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  z-index: 1;
  display: none;
  ${({ active }) => (active ? ModalShow : "")};
`;

const ModalContainer = styled.div``;

const ModalRow = styled.div`
  cursor: pointer;
  display: flex;
  padding: 10px 15px;
  align-items: center;
  &:nth-child(4) {
    border-top: 1px solid ${(props) => props.theme.borderColor};
  }
  &:hover {
    background-color: ${(props) => props.theme.bgColor};
    &:first-child {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    &:last-child {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

const Column = styled.div`
  svg {
    font-size: 25px;
  }
`;

const ModalText = styled.div`
  margin-left: 10px;
`;

const Text = styled.span`
  color: tomato;
  font-weight: 600;
`;

const OverlayShow = css`
  display: block;
`;

const Overlay = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: none;
  ${({ active }) => (active ? OverlayShow : "")}
`;

function HeaderModal({ profileModal, setProfileModal, username }) {
  return (
    <>
      <Modal active={profileModal}>
        <ModalContainer>
          <Link to={`/users/${username}`}>
            <ModalRow onClick={() => setProfileModal(!profileModal)}>
              <Column>
                <FontAwesomeIcon icon={faUser} size="lg" />
              </Column>
              <Column>
                <ModalText>Profile</ModalText>
              </Column>
            </ModalRow>
          </Link>
          <ModalRow>
            <Column>
              <FontAwesomeIcon icon={faBookmark} size="lg" />
            </Column>
            <Column>
              <ModalText style={{ marginLeft: "12px" }}>Saved</ModalText>
            </Column>
          </ModalRow>
          <Link to={"/accounts/edit"}>
            <ModalRow>
              <Column>
                <FontAwesomeIcon
                  icon={faCog}
                  size="lg"
                  style={{ paddingRight: "1px" }}
                />
              </Column>
              <Column>
                <ModalText style={{ marginLeft: "8px" }}>Setting</ModalText>
              </Column>
            </ModalRow>
          </Link>
          <ModalRow onClick={() => logUserOut()}>
            <Text>Log out</Text>
          </ModalRow>
        </ModalContainer>
      </Modal>
      <Overlay
        active={profileModal}
        onClick={() => setProfileModal(!profileModal)}
      />
    </>
  );
}

export default HeaderModal;
