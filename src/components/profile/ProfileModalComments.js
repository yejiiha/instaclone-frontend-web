import { gql, useMutation } from "@apollo/client";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";

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
  position: absolute;
  bottom: 0px;
  right: 0;
  width: 335px;
  margin-top: 16px;
`;

const PostCommentContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 15px;
  margin-top: 4px;
`;

const CommentForm = styled.form`
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

function ProfileModalComments({ photoId }) {
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

export default ProfileModalComments;
