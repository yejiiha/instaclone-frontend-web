import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FatText } from "../shared";
import DeleteModal from "./DeleteModal";

const DELETE_PHOTO_MUTATION = gql`
  mutation deletePhoto($id: Int!) {
    deletePhoto(id: $id) {
      ok
    }
  }
`;

const ModalShow = css`
  opacity: 1;
`;

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
  opacity: 1;
  /* ${({ active }) => (active ? ModalShow : "")} */
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

const CopyAlarmShow = css`
  display: block;
  bottom: 0;
  opacity: 1;
`;

const CopyAlarm = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 20px;
  background-color: black;
  color: white;
  opacity: 1;
  transition: all 0.3s ease-out;
  ${({ active }) => (active ? CopyAlarmShow : "")};
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

  const text = `http://localhost:3000/posts/${id}?utm_source=ig_web_copy_link`;
  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

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
          <Row>
            <Link to={`/posts/${id}`}>Go to post</Link>
          </Row>
          <CopyToClipboard text={text} onCopy={onCopyText}>
            <div>
              <Row onClick={() => setPhotoUtilModal(!photoUtilModal)}>
                Copy Link
              </Row>
              <CopyAlarm active={isCopied}>Link copied to clipboard.</CopyAlarm>
            </div>
          </CopyToClipboard>
          <Row onClick={() => setPhotoUtilModal(!photoUtilModal)}>Cancel</Row>
        </Container>
      </UtilModal>
    </Overlay>
  );
}

export default PhotoUtilModal;
