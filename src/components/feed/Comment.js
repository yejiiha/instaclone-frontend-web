import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div``;

const CommentUsername = styled(FatText)`
  &:hover {
    text-decoration: underline;
  }
`;

const CommentCaption = styled.span`
  margin-left: 5px;
`;

function Comment({ author, caption }) {
  return (
    <CommentContainer>
      <CommentUsername>{author}</CommentUsername>
      <CommentCaption>{caption}</CommentCaption>
    </CommentContainer>
  );
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
};

export default Comment;
