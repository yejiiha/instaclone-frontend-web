import styled, { css } from "styled-components";
import FollowModalList from "./FollowModalList";

const Modal = styled.div`
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

const ModalContainer = styled.div``;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const HeaderColumn = styled.div`
  width: 100%;
  &:nth-child(3) {
    display: flex;
    justify-content: flex-end;
  }
`;

const HeaderTitle = styled.h1`
  font-weight: 600;
`;

const CloseBtn = styled.button``;

const ModalContents = styled.div``;

const OverlayShow = css`
  display: block;
`;

const Overlay = styled.div`
  background-color: ${(props) => props.theme.overlayColor};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 1;
  display: none;
  ${({ active }) => (active ? OverlayShow : "")}
`;

function FollowersModal({
  followersModal,
  setFollowersModal,
  followers,
  unfollowUser,
  followUser,
}) {
  return (
    <Overlay active={followersModal}>
      <Modal>
        <ModalContainer>
          <ModalHeader>
            <HeaderColumn></HeaderColumn>
            <HeaderColumn>
              <HeaderTitle>Followers</HeaderTitle>
            </HeaderColumn>
            <HeaderColumn>
              <CloseBtn onClick={() => setFollowersModal(!followersModal)}>
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
                  />
                ))}
              {followers && followers.username}
            </ul>
          </ModalContents>
        </ModalContainer>
      </Modal>
    </Overlay>
  );
}

export default FollowersModal;
