import { gql } from "@apollo/client";

export const SEARCH = gql`
  query search($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
      likes
      commentNumber
    }
    searchUsers(keyword: $keyword) {
      id
      avatar
      username
      isFollowing
      isMe
    }
  }
`;
