import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Avatar from "../Avatar";
import Loader from "../Loader";
import RoomContent from "./RoomContent";
import { NotMeUsername } from "./RoomList";

const SEE_ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      users {
        username
        avatar
      }
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`;

const RoomHeader = styled.div`
  position: relative;
  top: 0;
  display: flex;
  align-items: center;
  height: 75px;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding-left: 36px;
`;

const Username = styled.span`
  font-weight: 600;
  margin-left: 12px;
`;

const RoomContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const RoomFooter = styled.div`
  margin-top: 10px;
  padding: 20px;
`;

const InputContainer = styled.div`
  padding: 6px 10px 6px 20px;
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 30px;
`;

const MessageForm = styled.form`
  width: 100%;
`;

const MessageInput = styled.input`
  width: 100%;
  height: 18px;
  padding: 8px 9px;
`;

function Room() {
  const { id } = useParams();
  const { data, loading } = useQuery(SEE_ROOM_QUERY, {
    variables: { id: Number(id) },
  });
  const { data: userData } = useUser();
  const notMe = data?.seeRoom?.users.find(
    (user) => user.username !== userData?.me?.username
  );
  console.log(data);
  return (
    <>
      <RoomHeader>
        <Avatar url={notMe?.avatar} />
        <Username>{notMe?.username}</Username>
      </RoomHeader>
      <RoomContainer>
        {loading ? (
          <Loader />
        ) : (
          data?.seeRoom?.messages.map((m) => <RoomContent key={m.id} {...m} />)
        )}
      </RoomContainer>
      <RoomFooter>
        <InputContainer>
          <FontAwesomeIcon icon={faSmile} size="2x" />
          <MessageForm>
            <MessageInput type="text" placeholder="Write a message" />
          </MessageForm>
        </InputContainer>
      </RoomFooter>
    </>
  );
}

export default Room;
