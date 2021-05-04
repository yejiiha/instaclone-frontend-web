import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { CloseBtn } from "../profile/FollowersModal";
import { Overlay } from "./PhotoUtilModal";
import UserRow from "./UserRow";

const SEE_PHOTO_LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      id
      username
      avatar
      isFollowing
      isMe
    }
  }
`;

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

const ModalContents = styled.div``;

const ModalOverlay = styled(Overlay)``;

function PhotoLikesModal({ id, photoLikesModal, setPhotoLikesModal }) {
  const { data } = useQuery(SEE_PHOTO_LIKES_QUERY, {
    variables: {
      id,
    },
    skip: !id,
  });

  return (
    <ModalOverlay active={photoLikesModal}>
      <Modal>
        <ModalContainer>
          <ModalHeader>
            <HeaderColumn></HeaderColumn>
            <HeaderColumn>
              <HeaderTitle>Likes</HeaderTitle>
            </HeaderColumn>
            <HeaderColumn>
              <CloseBtn onClick={() => setPhotoLikesModal(!photoLikesModal)}>
                X
              </CloseBtn>
            </HeaderColumn>
          </ModalHeader>
          <ModalContents>
            <div>
              {data?.seePhotoLikes.map((like) => (
                <UserRow key={like.id} {...like} />
              ))}
            </div>
          </ModalContents>
        </ModalContainer>
      </Modal>
    </ModalOverlay>
  );
}

export default PhotoLikesModal;
