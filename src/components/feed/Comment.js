import React, { useState } from "react";
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
  padding: 0 15px;
  margin-bottom: 7px;
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
  width: 540px;
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

const More = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.darkGray};
  &:active {
    color: ${(props) => props.theme.borderColor};
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

  const refinedCaption =
    caption !== null &&
    caption.split(" ").map((word, index) =>
      /#[\w]+/.test(word) ? (
        <React.Fragment key={index}>
          <Link to={`/search?term=${word}`}>{word}</Link>{" "}
        </React.Fragment>
      ) : (
        <React.Fragment key={index}>{word} </React.Fragment>
      )
    );

  const [showMore, setShowMore] = useState(false);

  return (
    <CommentContainer>
      <Column>
        <Link to={`/users/${author}`}>
          <CommentUsername>{author}</CommentUsername>
        </Link>
        <CommentCaption>
          {!showMore && caption?.length > 50
            ? refinedCaption.slice(0, 11)
            : refinedCaption}
          {!showMore && caption?.length > 50 ? (
            <More onClick={() => setShowMore(!showMore)}>... more</More>
          ) : null}
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
