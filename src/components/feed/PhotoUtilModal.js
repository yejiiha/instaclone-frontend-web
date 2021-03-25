import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import styled, { css } from "styled-components";
import { FatText } from "../shared";
import DeleteModal from "./DeleteModal";

const DELETE_PHOTO_MUTATION = gql`
  mutation deletePhoto($id: Int!) {
    deletePhoto(id: $id) {
      ok
    }
  }
`;

// const EDIT_PHOTO_MUTATION = gql`
//   mutation editPhoto($id: Int!, $caption: String!) {
//     editPhoto(id: $id, caption: $caption) {
//       ok
//     }
//   }
// `;

const UtilModal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40%;
  left: 45%;
  background-color: ${(props) => props.theme.formColor};
  width: 280px;
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.15);
  z-index: 10;
  cursor: auto;
  border-radius: 12px;
`;

const Container = styled.ul``;

const Row = styled.li`
  text-align: center;
  padding: 10px;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
  &:hover {
    background-color: ${(props) => props.theme.bgColor};
    &:first-child {
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
    &:last-child {
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }
  }
`;

const SFatText = styled(FatText)`
  color: tomato;
`;

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
  display: none;
  z-index: 5;
  cursor: auto;
  ${({ active }) => (active ? OverlayShow : "")}
`;

function PhotoUtilModal({ id, photoUtilModal, setPhotoUtilModal, isMine }) {
  const [deleteModal, setDeleteModal] = useState(false);
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
  // const updateEditPhoto = (cache, result) => {};
  // const [editPhotoMutation] = useMutation(EDIT_PHOTO_MUTATION, {
  //   variables: {
  //     id,
  //     caption,
  //   },
  //   update: updateEditPhoto,
  // });

  return (
    <Overlay active={photoUtilModal}>
      <UtilModal>
        <Container>
          {isMine ? (
            <>
              <Row onClick={() => setDeleteModal(!deleteModal)}>
                <SFatText>Delete</SFatText>
              </Row>
              <DeleteModal
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                onDeleteClick={onDeleteClick}
              />
              <Row>Edit</Row>
            </>
          ) : null}
          <Row>Copy Link</Row>
          <Row onClick={() => setPhotoUtilModal(!photoUtilModal)}>Cancel</Row>
        </Container>
      </UtilModal>
    </Overlay>
  );
}

export default PhotoUtilModal;
