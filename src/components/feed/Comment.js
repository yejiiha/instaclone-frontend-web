import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { FatText } from "../shared";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.div``;

const CommentUsername = styled(FatText)`
  font-size: 13px;
  &:hover {
    text-decoration: underline;
  }
`;

const CommentCaption = styled.span`
  margin-left: 5px;
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

function Comment({ id, author, caption, isMine, photoId }) {
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
      <Column>
        <Link to={`/users/${author}`}>
          <CommentUsername>{author}</CommentUsername>
        </Link>
        <CommentCaption>
          {caption.split(" ").map((word, index) =>
            /#[\w]+/.test(word) ? (
              <React.Fragment key={index}>
                <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
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

Comment.propTypes = {
  id: PropTypes.number,
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  isMine: PropTypes.bool,
  photoId: PropTypes.number,
};

export default Comment;
