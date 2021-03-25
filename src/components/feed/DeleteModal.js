import styled, { css } from "styled-components";

const Modal = styled.div`
  position: absolute;
  top: 40%;
  left: 45%;
  width: 350px;
  height: 140px;
  padding: 20px;
  background-color: ${(props) => props.theme.formColor};
  border-radius: 12px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CloseBtn = styled.button`
  outline: none;
  border: none;
  height: 15px;
  background-color: ${(props) => props.theme.formColor};
  cursor: pointer;
`;

const ModalTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ModalText = styled.p`
  font-size: 14px;
`;

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

const CancelBtn = styled.button`
  background-color: ${(props) => props.theme.formColor};
  outline: none;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  padding: 5px 8px;
  font-weight: 600;
  cursor: pointer;
`;

const DeleteBtn = styled(CancelBtn)`
  background-color: #f14668;
  color: white;
  margin-left: 5px;
`;

const OverlayShow = css`
  display: block;
`;

const Overlay = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: none;
  z-index: 5;
  cursor: auto;
  ${({ active }) => (active ? OverlayShow : "")};
`;

function DeleteModal({ deleteModal, setDeleteModal, onDeleteClick }) {
  return (
    <Overlay active={deleteModal}>
      <Modal>
        <Row>
          <ModalTitle>Delete Post</ModalTitle>
          <CloseBtn onClick={() => setDeleteModal(!deleteModal)}>X</CloseBtn>
        </Row>
        <ModalText>
          Are you sure you want to delete this post permanently?
        </ModalText>
        <Buttons>
          <CancelBtn onClick={() => setDeleteModal(!deleteModal)}>
            Cancel
          </CancelBtn>
          <DeleteBtn onClick={onDeleteClick}>Yes, delete this post</DeleteBtn>
        </Buttons>
      </Modal>
    </Overlay>
  );
}

export default DeleteModal;
