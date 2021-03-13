import { gql, useMutation } from "@apollo/client";
import styled, { css } from "styled-components";
import { FatText } from "../shared";

const DELETE_PHOTO_MUTATION = gql`
  mutation deletePhoto($id: Int!) {
    deletePhoto(id: $id) {
      ok
    }
  }
`;

const ModalShow = css`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -70px 0 0 -70px;
`;

const UtilModal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -650vh;
  background-color: #fff;
  width: 280px;
  height: 140px;
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.15);
  z-index: 10;
  cursor: auto;
  border-radius: 12px;
  ${({ active }) => (active ? ModalShow : "")}
`;

const Container = styled.ul``;

const Row = styled.li`
  text-align: center;
  padding: 10px;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
  &:first-child {
    color: tomato;
  }
`;

const OverlayShow = css`
  display: block;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.55);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: none;
  z-index: 5;
  cursor: auto;
  ${({ active }) => (active ? OverlayShow : "")}
`;

function PhotoUtilModal({ id, photoUtilModal, setPhotoUtilModal }) {
  const updateDeletePhoto = (cache, result) => {
    const {
      data: {
        deletePhoto: { ok },
      },
    } = result;

    if (ok) {
      cache.evict({ id: `Photo:${id}` });
    }
  };
  const [deletePhotoMutation] = useMutation(DELETE_PHOTO_MUTATION, {
    variables: {
      id,
    },
    update: updateDeletePhoto,
  });
  const onDeleteClick = () => {
    deletePhotoMutation();
  };
  return (
    <>
      <UtilModal active={photoUtilModal}>
        <Container>
          <Row onClick={onDeleteClick}>
            <FatText>Delete</FatText>
          </Row>
          <Row>Edit</Row>
          <Row>Copy Link</Row>
          <Row onClick={() => setPhotoUtilModal(!photoUtilModal)}>Cancel</Row>
        </Container>
      </UtilModal>
      <Overlay
        active={photoUtilModal}
        onClick={() => setPhotoUtilModal(!photoUtilModal)}
      />
    </>
  );
}

export default PhotoUtilModal;
