import styled from "styled-components";
import Avatar from "../Avatar";

const MessageContainer = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  margin-bottom: 8px;
`;
const Author = styled.div`
  margin-left: 10px;
`;
const Message = styled.span`
  background-color: ${(props) => props.theme.lightGray};
  padding: 16px;
  border-radius: 25px;
  overflow: hidden;
  color: rgb(38, 38, 38);
`;

function RoomContent({ user, payload }) {
  return (
    <MessageContainer outGoing={user.username}>
      <Author>
        <Avatar sm url={user.avatar} />
      </Author>
      <Message>{payload}</Message>
    </MessageContainer>
  );
}

export default RoomContent;
