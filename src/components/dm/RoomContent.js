import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { client } from "../../apollo";
import Avatar from "../Avatar";
import { READ_MESSAGE_MUTATION } from "./DMQueries";

const MessageContainer = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
  margin: 4px 0;
`;
const Author = styled.div``;
const Message = styled.span`
  cursor: pointer;
  background-color: ${(props) =>
    props.outGoing ? `${props.theme.lightGray}` : "null"};
  padding: 16px;
  border: ${(props) =>
    props.outGoing
      ? ""
      : props.read
      ? `1px solid ${props.theme.lightGray}`
      : `1px solid ${props.theme.darkGray}`};
  border-radius: 25px;
  overflow: hidden;
  margin: 0 10px;
  color: ${(props) =>
    props.outGoing ? "rgb(38, 38, 38)" : `${props.theme.fontColor}`};
`;

function RoomContent({ id, user, payload, read, notMe }) {
  const updateReadMessage = (cache, result) => {
    const {
      data: {
        readMessage: { ok },
      },
    } = result;

    if (ok) {
      client.cache.modify({
        id: `Message:${id}`,
        fields: {
          read(prev) {
            return true;
          },
        },
      });
    }
  };

  const [readMessageMutation] = useMutation(READ_MESSAGE_MUTATION, {
    update: updateReadMessage,
  });
  return (
    <MessageContainer outGoing={user.username !== notMe.username}>
      <Author>
        <Avatar sm url={user.avatar} />
      </Author>
      <Message
        read={read}
        outGoing={user.username !== notMe.username}
        onClick={() => readMessageMutation({ variables: { id } })}
      >
        {payload}
      </Message>
    </MessageContainer>
  );
}

export default RoomContent;
