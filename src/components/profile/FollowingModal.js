import FollowModalList from "./FollowModalList";
import {
  CloseBtn,
  Modal,
  ModalContainer,
  ModalHeader,
  ModalOverlay,
  HeaderColumn,
  HeaderTitle,
  ModalContents,
} from "./FollowersModal";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from "react-spinners/ClipLoader";
import { override } from "../../screens/Home";

function FollowingModal({
  followingModal,
  setFollowingModal,
  following,
  unfollowUser,
  followUser,
  onFollowingLoadMore,
  followingLoading,
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
              <CloseBtn onClick={() => setFollowingModal(!followingModal)}>
                X
              </CloseBtn>
            </HeaderColumn>
          </ModalHeader>
          <ModalContents>
            <div>
              {following && (
                <InfiniteScroll
                  dataLength={following?.length}
                  next={onFollowingLoadMore}
                  hasMore={true}
                  loader={
                    <ClipLoader
                      css={override}
                      loading={followingLoading}
                      size={35}
                      color={"#999999"}
                    />
                  }
                >
                  {following?.map((f) => (
                    <FollowModalList
                      key={f.id}
                      {...f}
                      following={following}
                      unfollowUser={unfollowUser}
                      followUser={followUser}
                      setFollowingModal={setFollowingModal}
                      followingModal={followingModal}
                    />
                  ))}
                </InfiniteScroll>
              )}
              {following && following.username}
            </div>
          </ModalContents>
        </ModalContainer>
      </Modal>
    </ModalOverlay>
  );
}

export default FollowingModal;
