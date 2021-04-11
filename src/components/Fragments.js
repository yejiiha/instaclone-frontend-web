import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const FEED_FRAGMENT = gql`
  fragment FeedFragment on Photo {
    ...PhotoFragment
    user {
      username
      avatar
    }
    caption
    isMine
    createdAt
  }
  ${PHOTO_FRAGMENT}
`;

export const ROOM_FRAGMENT = gql`
  fragment RoomFragment on Room {
    id
    unreadTotal
    users {
      username
      avatar
    }
  }
`;
