import { Route } from "react-router";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Avatar from "../Avatar";
import Room from "./Room";

const RoomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.bgColor};
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const Username = styled.span`
  font-weight: 600;
`;
const UnreadText = styled.span`
  margin-top: 8px;
  color: ${(props) => props.theme.darkGray};
  font-size: 13px;
`;

const UnreadDot = styled.div`
  width: 5px;
  height: 5px;
  background-color: tomato;
  border-radius: 50%;
`;

export const NotMeUsername = ({ users }) => {
  const { data: userData } = useUser();
  const notMe = users.find((user) => user.username !== userData?.me?.username);
  return notMe.username;
};

function RoomList({ unreadTotal, users }) {
  const { data: userData } = useUser();
  const notMe = users.find((user) => user.username !== userData?.me?.username);
  return (
    <>
      <RoomContainer>
        <Column>
          <Avatar xl url={notMe.avatar} />
          <Data>
            <Username>{notMe.username}</Username>
            <UnreadText>
              {unreadTotal} unread {unreadTotal === 1 ? "message" : "messages"}
            </UnreadText>
          </Data>
        </Column>
        <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
      </RoomContainer>
    </>
  );
}

export default RoomList;
