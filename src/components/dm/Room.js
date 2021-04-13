import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Avatar from "../Avatar";
import Loader from "../Loader";
import RoomContent from "./RoomContent";

const SEE_ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
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

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      id
      ok
    }
  }
`;

const RoomHeader = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: 60px;
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
  flex-direction: column-reverse;
`;

const ChatContainer = styled.div`
  height: 643px;
  display: flex;
  flex-direction: column-reverse;
  overflow-x: hidden;
  overflow-y: auto;
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
  const { register, setValue, handleSubmit, getValues } = useForm();
  const { id: roomId } = useParams();
  const { data, loading } = useQuery(SEE_ROOM_QUERY, {
    variables: { id: Number(roomId) },
  });
  const { data: userData } = useUser();
  const notMe = data?.seeRoom?.users.find(
    (user) => user.username !== userData?.me?.username
  );

  const updateSendMessage = (cache, result) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;

    if (ok && userData) {
      const messageObj = {
        id: id,
        payload,
        user: {
          username: userData?.me?.username,
          avatar: userData?.me?.avatar,
        },
        read: true,
        __typename: "Message",
      };
      const messageFragment = cache.writeFragment({
        data: messageObj,
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
      });
      cache.modify({
        id: `Room:${Number(roomId)}`,
        fields: {
          messages(prev) {
            return [...prev, messageFragment];
          },
        },
      });
    }
  };

  const [
    sendMessageMutation,
    { loading: sendingMessage },
  ] = useMutation(SEND_MESSAGE_MUTATION, { update: updateSendMessage });

  const onValid = (data) => {
    const { payload } = data;
    if (!sendingMessage) {
      sendMessageMutation({
        variables: { payload, roomId: Number(roomId) },
      });
    }
  };

  useEffect(() => {
    register("payload", { required: true });
  }, [register]);

  const messagesArray = [...(data?.seeRoom?.messages ?? [])];
  messagesArray.reverse();

  return (
    <>
      <RoomHeader>
        <Avatar url={notMe?.avatar} />
        <Username>{notMe?.username}</Username>
      </RoomHeader>
      <RoomContainer>
        <ChatContainer>
          {loading ? (
            <Loader />
          ) : (
            messagesArray.map((m) => (
              <RoomContent key={m.id} notMe={notMe} {...m} />
            ))
          )}
        </ChatContainer>
      </RoomContainer>
      <RoomFooter>
        <InputContainer>
          <FontAwesomeIcon icon={faSmile} size="2x" />
          <MessageForm onSubmit={handleSubmit(onValid)}>
            <MessageInput
              type="text"
              name="payload"
              placeholder="Write a message"
              ref={register({ required: true })}
            />
          </MessageForm>
        </InputContainer>
      </RoomFooter>
    </>
  );
}

export default Room;