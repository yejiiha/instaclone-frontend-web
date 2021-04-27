import styled from "styled-components";
import { Overlay } from "../feed/PhotoUtilModal";
import FollowModalList from "./FollowModalList";

export const Modal = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 25%;
  left: 35%;
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 12px;
  z-index: 5;
`;

export const ModalContainer = styled.div``;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

export const HeaderColumn = styled.div`
  width: 100%;
  &:nth-child(3) {
    display: flex;
    justify-content: flex-end;
  }
`;

export const HeaderTitle = styled.h1`
  font-weight: 600;
`;

export const CloseBtn = styled.button`
  cursor: pointer;
  font-size: 18px;
  padding: 3px 7px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  color: ${(props) => props.theme.fontColor};
  &:focus {
    border: none;
    outline: none;
  }
  &:hover {
    background-color: rgba(219, 219, 219, 0.5);
  }
`;

const ModalContents = styled.div``;

const ModalOverlay = styled(Overlay)``;

function FollowersModal({
  followModal,
  setFollowModal,
  followers,
  unfollowUser,
  followUser,
}) {
  return (
    <ModalOverlay active={followModal}>
      <Modal>
        <ModalContainer>
          <ModalHeader>
            <HeaderColumn></HeaderColumn>
            <HeaderColumn>
              <HeaderTitle>Followers</HeaderTitle>
            </HeaderColumn>
            <HeaderColumn>
              <CloseBtn onClick={() => setFollowModal(!followModal)}>
                X
              </CloseBtn>
            </HeaderColumn>
          </ModalHeader>
          <ModalContents>
            <ul>
              {followers &&
                followers.map((f) => (
                  <FollowModalList
                    key={f.id}
                    {...f}
                    followers={followers}
                    unfollowUser={unfollowUser}
                    followUser={followUser}
                    setFollowModal={setFollowModal}
                    followModal={followModal}
                  />
                ))}
              {followers && followers.username}
            </ul>
          </ModalContents>
        </ModalContainer>
      </Modal>
    </ModalOverlay>
  );
}

export default FollowersModal;
