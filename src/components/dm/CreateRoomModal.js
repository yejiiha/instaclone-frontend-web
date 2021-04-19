import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Overlay } from "../feed/PhotoUtilModal";
import {
  CloseBtn,
  HeaderColumn,
  HeaderTitle,
  Modal,
  ModalContainer,
  ModalHeader,
} from "../profile/FollowersModal";

const SModal = styled(Modal)`
  height: 480px;
`;

const NextBtn = styled.input`
  color: ${(props) => props.theme.blue};
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

const InputContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  align-items: center;
  padding: 15px 12px;
`;

const InputColumn = styled.div`
  &:first-child {
    width: 65px;
  }
`;

const CreateRoomForm = styled.form``;

const Input = styled.input`
  color: 12px;
  font-weight: 400;
  ::placeholder {
    color: ${(props) => props.theme.borderColor};
  }
`;

const ModalContents = styled.div`
  h2 {
    padding: 16px;
    font-size: 14px;
  }
`;

function CreateRoomModal({ createRoomModal, setCreateRoomModal }) {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data) => {
    console.log(data);
  };
  return (
    <Overlay active={createRoomModal}>
      <SModal>
        <ModalContainer>
          <CreateRoomForm onSubmit={handleSubmit(onValid)}>
            <ModalHeader>
              <HeaderColumn>
                <CloseBtn onClick={() => setCreateRoomModal(!createRoomModal)}>
                  X
                </CloseBtn>
              </HeaderColumn>
              <HeaderColumn>
                <HeaderTitle>New Message</HeaderTitle>
              </HeaderColumn>
              <HeaderColumn>
                <NextBtn
                  type="submit"
                  value={"Next"}
                  disabled={!formState.isValid}
                />
              </HeaderColumn>
            </ModalHeader>

            <InputContainer>
              <InputColumn>To: </InputColumn>
              <InputColumn>
                <Input
                  ref={register}
                  type="text"
                  placeholder="Search..."
                ></Input>
              </InputColumn>
            </InputContainer>

            <ModalContents>
              <h2>Suggested</h2>
              <ul></ul>
            </ModalContents>
          </CreateRoomForm>
        </ModalContainer>
      </SModal>
    </Overlay>
  );
}

export default CreateRoomModal;
