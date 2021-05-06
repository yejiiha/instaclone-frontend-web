import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { override } from "../../screens/Home";
import { Overlay } from "../feed/PhotoUtilModal";
import FollowModalList from "./FollowModalList";
import ClipLoader from "react-spinners/ClipLoader";

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ModalContainer = styled.div`
  width: 400px;
  height: 400px;
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 12px;
  z-index: 5;
`;

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

export const ModalContents = styled.div`
  height: 350px;
  overflow: auto;
`;

export const ModalOverlay = styled(Overlay)``;

function FollowersModal({
  followers,
  followersModal,
  setFollowersModal,
  onFollowersLoadMore,
  loading,
}) {
  return (
    <ModalOverlay active={followersModal}>
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
            <div>
              {followers && (
                <InfiniteScroll
                  dataLength={followers?.length}
                  next={onFollowersLoadMore}
                  hasMore={true}
                  loader={
                    <ClipLoader
                      css={override}
                      loading={loading}
                      size={35}
                      color={"#999999"}
                    />
                  }
                >
                  {followers.map((f) => (
                    <FollowModalList
                      key={f.id}
                      {...f}
                      followers={followers}
                      followersModal={followersModal}
                      setFollowersModal={setFollowersModal}
                    />
                  ))}
                </InfiniteScroll>
              )}
              {followers && followers.username}
            </div>
          </ModalContents>
        </ModalContainer>
      </Modal>
    </ModalOverlay>
  );
}

export default FollowersModal;
