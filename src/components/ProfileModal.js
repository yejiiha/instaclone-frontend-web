import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { logUserOut } from "../apollo";

const ModalShow = css`
  top: 55px;
`;

const Modal = styled.div`
  width: 170px;
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: auto;
  background-color: ${(props) => props.theme.formColor};
  border-radius: 6px;
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  ${({ active }) => (active ? ModalShow : "")};
`;

const ModalContainer = styled.div``;

const ModalRow = styled.div`
  cursor: pointer;
  display: flex;
  padding: 10px 15px;
  align-items: center;
  &:last-child {
    border-top: 1px solid ${(props) => props.theme.borderColor};
  }
  &:hover {
    background-color: ${(props) => props.theme.bgColor};
  }
`;

const Column = styled.div``;

const ModalText = styled.div`
  margin-left: 10px;
`;

function ProfileModal({ profileModal, username }) {
  return (
    <>
      {profileModal ? (
        <Modal active={profileModal}>
          <ModalContainer>
            <Link to={`/users/${username}`}>
              <ModalRow>
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
            <ModalRow onClick={() => logUserOut()}>
              <Column>Log out</Column>
            </ModalRow>
          </ModalContainer>
        </Modal>
      ) : null}
    </>
  );
}

export default ProfileModal;
