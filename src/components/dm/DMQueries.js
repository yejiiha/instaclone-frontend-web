import { gql } from "@apollo/client";
import { ROOM_FRAGMENT } from "../Fragments";

export const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomFragment
    }
  }
  ${ROOM_FRAGMENT}
`;

export const SEE_ROOM_QUERY = gql`
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

export const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      id
      ok
    }
  }
`;

export const ROOM_UPDATES = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      user {
        username
        avatar
      }
      read
    }
  }
`;

export const SEE_ALL_USERS_QUERY = gql`
  query seeAllUsers {
    seeAllUsers {
      id
      avatar
      username
    }
  }
`;

export const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($userId: Int!) {
    createRoom(userId: $userId) {
      ok
      id
      error
    }
  }
`;

export const READ_MESSAGE_MUTATION = gql`
  mutation readMessage($id: Int!) {
    readMessage(id: $id) {
      ok
      id
    }
  }
`;
