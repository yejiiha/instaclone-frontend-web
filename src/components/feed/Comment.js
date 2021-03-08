import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";

const CommentContainer = styled.div`
  margin-bottom: 8px;
`;

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
    color: rgb(0, 55, 107);
    opacity: 0.9;
    cursor: pointer;
  }
`;

function Comment({ author, caption }) {
  return (
    <CommentContainer>
      <CommentUsername>{author}</CommentUsername>
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
    </CommentContainer>
  );
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
};

export default Comment;
