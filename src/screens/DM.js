import { gql, useQuery } from "@apollo/client";
import { faEdit, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { ROOM_FRAGMENT } from "../components/Fragments";
import PageTitle from "../components/PageTitle";
import Room from "../components/room/Room";
import useUser from "../hooks/useUser";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomFragment
    }
  }
  ${ROOM_FRAGMENT}
`;

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  background-color: ${(props) => props.theme.formColor};
  align-items: center;
  margin: auto;
  max-width: 935px;
  height: 650px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
  cursor: auto;
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  &:first-child {
    left: 0;
    width: 350px;
    height: 650px;
    border-right: 1px solid ${(props) => props.theme.borderColor};
  }
  &:last-child {
    position: relative;
    left: 0;
    width: 585px;
    height: 650px;
    align-items: center;
    justify-content: center;
  }
`;

const ListHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  font-weight: 600;
  height: 60px;
  padding: 0 20px;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const ListHeaderColumn = styled.div`
  display: flex;
  flex-basis: 32px;
  justify-content: center;
  align-items: center;
  &:nth-child(1) {
    margin-right: 8px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
  }
  &:nth-child(2) {
    width: 100%;
    flex: 1;
  }

  &:nth-child(3) {
    margin-left: 8px;
    svg {
      font-size: 24px;
      cursor: pointer;
    }
  }
`;

const RoomList = styled.ul``;

const PlaneContainer = styled.div`
  border: 3px solid;
  padding: 15px;
  border-radius: 50%;
  svg {
    font-size: 40px;
  }
`;

const TitleText = styled.span`
  text-align: center;
  margin-top: 16px;
  font-size: 20px;
`;

const Text = styled.span`
  margin-top: 12px;
  font-weight: 600;
  font-size: 12px;
`;

const SendBtn = styled.button`
  padding: 5px 9px;
  margin-top: 24px;
  background-color: ${(props) => props.theme.blue};
  color: white;
  text-align: center;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:focus {
    border: none;
    outline: none;
  }
`;

function DM() {
  const { data: userData } = useUser();
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  console.log(data);
  return (
    <>
      <PageTitle title="Inbox | Direct" />
      <Wrapper>
        <Column>
          <ListHeader>
            <ListHeaderColumn></ListHeaderColumn>
            <ListHeaderColumn>{userData?.me?.username}</ListHeaderColumn>
            <ListHeaderColumn>
              <FontAwesomeIcon icon={faEdit} />
            </ListHeaderColumn>
          </ListHeader>
          <RoomList>
            {data?.seeRooms.map((room) => (
              <Room key={room.id} {...room} />
            ))}
          </RoomList>
        </Column>
        <Column>
          <PlaneContainer>
            <FontAwesomeIcon icon={faPaperPlane} />
          </PlaneContainer>
          <TitleText>Your Messages</TitleText>
          <Text>Send private photos and messages to a friend or group.</Text>
          <SendBtn>Send Message</SendBtn>
        </Column>
      </Wrapper>
    </>
  );
}

export default DM;
