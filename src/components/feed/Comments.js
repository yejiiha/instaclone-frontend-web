import { gql, useMutation } from "@apollo/client";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import { dateConverter, feedDateConverter } from "../shared";
import Comment from "./Comment";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      id
      ok
      error
    }
  }
`;

const CommentsContainer = styled.div`
  margin-top: 10px;
`;

const CommentCount = styled.span`
  padding: 0 15px;
  display: block;
  margin: 10px 0 7px 0;
  opacity: 0.7;
  font-size: 12px;
`;

const Timestamp = styled.span`
  padding: 0 15px;
  font-size: 10px;
  color: ${(props) => props.theme.darkGray};
`;

const PostCommentContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 10px 0 0;
  margin-top: 10px;
`;

const CommentForm = styled.form`
  padding: 0 15px;
  display: flex;
  align-items: center;
`;

const PostCommentInput = styled.input`
  margin-left: 15px;
  width: 100%;
`;

const CommentSubmitButton = styled.input`
  color: ${(props) => props.theme.blue};
  text-align: center;
  font-weight: 600;
  border: none;
  box-sizing: border-box;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

function Comments({
  photoId,
  author,
  caption,
  commentNumber,
  comments,
  createdAt,
}) {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues, formState } = useForm({
    mode: "onChange",
  });
  const createCommentUpdate = (cache, result) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    if (ok && userData.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: { ...userData.me },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );
  const onValid = (data) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };
  return (
    <CommentsContainer>
      <Comment author={author} caption={caption} />
      <CommentCount>
        {commentNumber === 0
          ? ""
          : commentNumber === 1
          ? "1 comment"
          : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          author={comment.user.username}
          caption={comment.payload}
          isMine={comment.isMine}
          photoId={photoId}
        />
      ))}
      <Timestamp>{feedDateConverter(createdAt)}</Timestamp>
      <PostCommentContainer>
        <CommentForm onSubmit={handleSubmit(onValid)}>
          <FontAwesomeIcon icon={faSmile} size="2x" />
          <PostCommentInput
            name="payload"
            ref={register({ required: true })}
            type="text"
            placeholder="Write a comment"
          />
          <CommentSubmitButton
            type="submit"
            value={loading ? "Loading..." : "Post"}
            disabled={!formState.isValid || loading}
          />
        </CommentForm>
      </PostCommentContainer>
    </CommentsContainer>
  );
}

Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
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
