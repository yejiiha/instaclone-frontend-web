import { useQuery } from "@apollo/client";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Link } from "react-router-dom";
import RoomList from "../components/dm/RoomList";
import useUser from "../hooks/useUser";
import Loader from "../components/Loader";
import { SEE_ROOMS_QUERY } from "../components/dm/DMQueries";
import { useState } from "react";
import CreateRoomModal from "../components/dm/CreateRoomModal";

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  background-color: ${(props) => props.theme.formColor};
  align-items: center;
  margin: auto;
  max-width: 935px;
  height: 800px;
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
    height: 800px;
    border-right: 1px solid ${(props) => props.theme.borderColor};
  }
  &:last-child {
    position: relative;
    left: 0;
    width: 585px;
    height: 800px;
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

const RoomLists = styled.ul`
  margin-top: 8px;
`;

function DM({ children }) {
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const { data: userData } = useUser();
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  const seeRoomsArray = [...(data?.seeRooms ?? [])];
  seeRoomsArray.reverse();
  return (
    <Wrapper>
      <Column>
        <ListHeader>
          <ListHeaderColumn></ListHeaderColumn>
          <ListHeaderColumn>{userData?.me?.username}</ListHeaderColumn>
          <ListHeaderColumn>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => setCreateRoomModal(!createRoomModal)}
            />
            <CreateRoomModal
              createRoomModal={createRoomModal}
              setCreateRoomModal={setCreateRoomModal}
            />
          </ListHeaderColumn>
        </ListHeader>
        {loading ? (
          <Loader />
        ) : (
          <RoomLists>
            {seeRoomsArray.map((room) => (
              <Link to={`/direct/t/${room.id}`} key={room.id}>
                <RoomList key={room.id} {...room} />
              </Link>
            ))}
          </RoomLists>
        )}
      </Column>
      <Column>{children}</Column>
    </Wrapper>
  );
}

export default DM;
