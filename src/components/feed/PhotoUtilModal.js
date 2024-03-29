import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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

const UtilModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Container = styled.ul`
  width: 280px;
  background-color: ${(props) => props.theme.formColor};
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.15);
  z-index: 10;
  cursor: auto;
  border-radius: 12px;
`;

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

export const Overlay = styled.div`
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

export const CopyAlarmShow = css`
  display: block;
  bottom: 0;
`;

export const CopyAlarm = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 20px;
  background-color: black;
  color: white;
  display: none;
  transition: all 0.3s ease-out;
  ${({ active }) => (active ? CopyAlarmShow : "")};
`;

function PhotoUtilModal({
  id,
  photoUtilModal,
  setPhotoUtilModal,
  isMine,
  isPost,
}) {
  const history = useHistory();
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
    setDisplay(true);
    setTimeout(() => {
      setDisplay(false);
    }, 2000);
    history.go(-2);
  };

  const text = `http://jistagram.netlify.app/posts/${id}?utm_source=ig_web_copy_link`;
  const [display, setDisplay] = useState(false);

  const setCopyAlarm = () => {
    setDisplay(true);
    setTimeout(() => {
      setDisplay(false);
    }, 2000);
  };

  return (
    <Overlay active={photoUtilModal}>
      <UtilModal>
        <Container>
          {isMine && isPost ? (
            <>
              <Row onClick={() => setDeleteModal(!deleteModal)}>
                <SFatText>Delete</SFatText>
              </Row>
              <DeleteModal
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                onDeleteClick={onDeleteClick}
                display={display}
              />
              <Row>
                <Link to={`/posts/${id}/edit`}>Edit</Link>
              </Row>
            </>
          ) : null}
          {!isPost && (
            <Row>
              <Link to={`/posts/${id}`}>Go to post</Link>
            </Row>
          )}
          <CopyToClipboard text={text}>
            <div>
              <Row onClick={setCopyAlarm}>Copy Link</Row>
              <CopyAlarm active={display}>Link copied to clipboard.</CopyAlarm>
            </div>
          </CopyToClipboard>
          <Row onClick={() => setPhotoUtilModal(!photoUtilModal)}>Cancel</Row>
        </Container>
      </UtilModal>
    </Overlay>
  );
}

export default PhotoUtilModal;
