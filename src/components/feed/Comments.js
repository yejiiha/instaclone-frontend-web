import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 10px;
`;

const CommentCount = styled.span`
  display: block;
  margin: 10px 0 7px 0;
  opacity: 0.7;
  font-size: 12px;
`;

function Comments({ author, caption, commentNumber, comments }) {
  return (
    <CommentsContainer>
      <Comment author={author} caption={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          caption={comment.payload}
        />
      ))}
    </CommentsContainer>
  );
}

Comments.propTypes = {
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
      payload: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default Comments;
