import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";

const CommentContainer = styled.div``;

const CommentUsername = styled(FatText)`
  &:hover {
    text-decoration: underline;
  }
`;

const CommentCaption = styled.span`
  margin-left: 5px;
  a {
    background-color: inherit;
    color: rgb(0, 55, 107);
    cursor: pointer;
  }
`;

function Comment({ author, caption }) {
  return (
    <CommentContainer>
      <CommentUsername>{author}</CommentUsername>
      <CommentCaption>
        {caption.split(" ").map((word, index) =>
          /#[\w]+/g.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word}</React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
};

export default Comment;
