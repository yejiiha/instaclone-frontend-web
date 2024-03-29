import React from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { FatText } from "../shared";
import Avatar from "../Avatar";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Column = styled.div`
  width: 95%;
  display: flex;
  align-items: ${(props) => (props.long ? "flex-start" : "center")};
  @media ${(props) => props.theme.mobileM} {
    flex-direction: ${(props) => (props.long ? "column" : "row")};
  }
  &:last-child {
    opacity: 0;
    &:hover {
      opacity: 1;
    }
  }
`;

const Caption = styled.div`
  display: flex;
  align-items: center;
`;

const CommentUsername = styled(FatText)`
  margin-left: 10px;
  font-size: 13px;
  &:hover {
    text-decoration: underline;
  }
`;

const CommentCaption = styled.span`
  margin-left: 5px;
  width: 205px;
  overflow-wrap: break-word;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.hashtagColor};
    opacity: 0.9;
    cursor: pointer;
  }
`;

const CommentDeleteBtn = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  &:focus {
    border: none;
    outline: none;
  }
`;

function ProfileModalComment({
  id,
  avatar,
  author,
  caption,
  isMine,
  photoId,
  createdAt,
}) {
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;

    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };

  return (
    <CommentContainer>
      <Column long={caption?.length > 50}>
        <Caption>
          <Link to={`/users/${author}`}>
            <Avatar url={avatar} />
          </Link>
          <Link to={`/users/${author}`}>
            <CommentUsername>{author}</CommentUsername>
          </Link>
        </Caption>
        <CommentCaption>
          {caption !== null &&
            caption.split(" ").map((word, index) =>
              /#[\w]+/.test(word) ? (
                <React.Fragment key={index}>
                  <Link to={`/search?term=${word}`}>{word}</Link>{" "}
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>{word} </React.Fragment>
              )
            )}
        </CommentCaption>
      </Column>
      <Column>
        {isMine ? (
          <CommentDeleteBtn onClick={onDeleteClick}>❌</CommentDeleteBtn>
        ) : null}
      </Column>
    </CommentContainer>
  );
}

export default ProfileModalComment;
