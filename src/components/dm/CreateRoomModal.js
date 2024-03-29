import styled from "styled-components";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Overlay } from "../feed/PhotoUtilModal";
import {
  CloseBtn,
  HeaderColumn,
  HeaderTitle,
  Modal,
  ModalContainer,
  ModalHeader,
} from "../profile/FollowersModal";
import Avatar from "../Avatar";
import { CREATE_ROOM_MUTATION, SEE_ALL_USERS_QUERY } from "./DMQueries";
import useUser from "../../hooks/useUser";
import { useHistory } from "react-router";

const SModalContainer = styled(ModalContainer)`
  height: 480px;
`;

const NextBtn = styled.input`
  color: ${(props) => props.theme.blue};
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
  cursor: pointer;
`;

const InputContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  align-items: center;
  padding: 10px 12px;
`;

const ModalContents = styled.div`
  overflow: auto;
  height: 378px;
  h2 {
    padding: 16px;
    font-size: 14px;
  }
`;

const Label = styled("label")`
  width: 65px;
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")`
  width: 300px;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
  color: black;

  & input {
    font-size: 14px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 30px;
  margin: 2px;
  line-height: 22px;
  background-color: #e0f1ff;
  color: ${(props) => props.theme.blue};
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Box = styled.ul``;

const UserRow = styled.li`
  display: flex;
  align-items: center;
  padding: 5px 12px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.bgColor};
  }
  span {
    margin-left: 10px;
    flex-grow: 1;
  }
  svg {
    color: ${(props) => props.theme.fontColor};
  }
`;

function CreateRoomModal({ createRoomModal, setCreateRoomModal }) {
  const { data: meData } = useUser();
  const { data } = useQuery(SEE_ALL_USERS_QUERY);
  const userData = data?.seeAllUsers;
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: userData ? userData : "",
    getOptionLabel: (option) => option.username,
  });
  const history = useHistory();

  const createRoomUpdate = (cache, result) => {
    const {
      data: {
        createRoom: { ok, id, error },
      },
    } = result;

    if (ok && value[0].id) {
      const newRoom = {
        id,
        users: [value[0], meData?.me],
        unreadTotal: 0,
        __typename: "Room",
      };

      const roomFragment = cache.writeFragment({
        data: newRoom,
        fragment: gql`
          fragment NewRoom on Room {
            id
            users
            unreadTotal
          }
        `,
      });

      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeRooms(prev) {
            return [...prev, roomFragment];
          },
        },
      });
      history.push(`/direct/t/${id}`);
    }

    if (!ok && error) {
      alert(error);
    }
    setCreateRoomModal(!createRoomModal);
  };

  const [createRoomMutation] = useMutation(CREATE_ROOM_MUTATION, {
    update: createRoomUpdate,
  });

  const onValid = () => {
    createRoomMutation({
      variables: { userId: value[0].id },
    });
  };

  return (
    <Overlay active={createRoomModal}>
      <Modal>
        <SModalContainer>
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
              <NextBtn type="submit" value="Next" onClick={onValid} />
            </HeaderColumn>
          </ModalHeader>

          <InputContainer {...getRootProps()}>
            <Label {...getInputLabelProps()}>To:</Label>
            <InputWrapper
              ref={setAnchorEl}
              className={focused ? "focused" : ""}
            >
              {value.map((option, index) => (
                <Tag label={option?.username} {...getTagProps({ index })} />
              ))}
              <input {...getInputProps()} placeholder="Search..." />
            </InputWrapper>
          </InputContainer>

          <ModalContents>
            <Box {...getListboxProps()}>
              {groupedOptions.map((option, index) => (
                <UserRow {...getOptionProps({ option, index })}>
                  <Avatar xl url={option?.avatar} />
                  <span>{option?.username}</span>
                  <CheckIcon fontSize="small" />
                </UserRow>
              ))}
            </Box>
          </ModalContents>
        </SModalContainer>
      </Modal>
    </Overlay>
  );
}

export default CreateRoomModal;
