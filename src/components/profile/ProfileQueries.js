import { gql } from "@apollo/client";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../Fragments";

export const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalPhotos
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

export const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

export const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

export const SEE_PHOTO_QUERY = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      isMine
      createdAt
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export const SEE_FOLLOWERS = gql`
  query seeFollowers($username: String!, $offset: Int!) {
    seeFollowers(username: $username, offset: $offset) {
      ok
      followers {
        id
        username
        avatar
        isMe
        isFollowing
      }
    }
  }
`;

export const SEE_FOLLOWING = gql`
  query seeFollowing($username: String!, $offset: Int!) {
    seeFollowing(username: $username, offset: $offset) {
      ok
      following {
        id
        username
        avatar
        isMe
        isFollowing
      }
    }
  }
`;
