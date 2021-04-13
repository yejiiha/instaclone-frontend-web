import styled from "styled-components";
import Avatar from "../Avatar";

const MessageContainer = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
  margin-bottom: 8px;
`;
const Author = styled.div``;
const Message = styled.span`
  background-color: ${(props) =>
    props.outGoing ? `${props.theme.lightGray}` : "null"};
  padding: 16px;
  border: ${(props) =>
    props.outGoing ? "" : `1px solid ${props.theme.lightGray}`};
  border-radius: 25px;
  overflow: hidden;
  margin: 0 10px;
  color: ${(props) =>
    props.outGoing ? "rgb(38, 38, 38)" : `${props.theme.fontColor}`};
`;

function RoomContent({ user, payload, notMe }) {
  return (
    <MessageContainer outGoing={user.username !== notMe.username}>
      <Author>
        <Avatar sm url={user.avatar} />
      </Author>
      <Message outGoing={user.username !== notMe.username}>{payload}</Message>
    </MessageContainer>
  );
}

export default RoomContent;
