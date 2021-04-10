import styled from "styled-components";
import FollowModalList from "./FollowModalList";
import { CloseBtn } from "./FollowersModal";
import { Overlay } from "../feed/PhotoUtilModal";

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
  z-index: 10;
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

const Close = styled(CloseBtn)``;

const ModalContents = styled.div``;

const ModalOverlay = styled(Overlay)``;

function FollowingModal({
  followingModal,
  setFollowingModal,
  following,
  unfollowUser,
  followUser,
}) {
  return (
    <ModalOverlay active={followingModal}>
      <Modal>
        <ModalContainer>
          <ModalHeader>
            <HeaderColumn></HeaderColumn>
            <HeaderColumn>
              <HeaderTitle>Following</HeaderTitle>
            </HeaderColumn>
            <HeaderColumn>
              <Close onClick={() => setFollowingModal(!followingModal)}>
                X
              </Close>
            </HeaderColumn>
          </ModalHeader>
          <ModalContents>
            <div>
              {following &&
                following.map((f) => (
                  <FollowModalList
                    key={f.id}
                    {...f}
                    following={following}
                    unfollowUser={unfollowUser}
                    followUser={followUser}
                  />
                ))}
              {following && following.username}
            </div>
          </ModalContents>
        </ModalContainer>
      </Modal>
    </ModalOverlay>
  );
}

export default FollowingModal;
