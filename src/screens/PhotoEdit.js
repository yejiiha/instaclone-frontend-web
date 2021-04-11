import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import styled from "styled-components";
import { SEE_PHOTO_QUERY } from "../components/profile/ProfileQueries";
import {
  Modal,
  ModalColumn,
  PhotoFile,
  PhotoHeader,
  Username,
} from "../components/PostPresenter";
import { CaptionContainer, Caption, SubmitContainer, Submit } from "./Create";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CopyAlarm } from "../components/feed/PhotoUtilModal";

const EDIT_PHOTO_MUTATION = gql`
  mutation editPhoto($id: Int!, $caption: String!) {
    editPhoto(id: $id, caption: $caption) {
      ok
    }
  }
`;

const Container = styled(Modal)``;

const ContainerColumn = styled(ModalColumn)``;

const PostHeader = styled(PhotoHeader)`
  justify-content: flex-start;
`;

const EditForm = styled.form`
  display: flex;
`;

function PhotoEdit() {
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState(false);
  const { id } = useParams();
  const { data: photoData } = useQuery(SEE_PHOTO_QUERY, {
    variables: { id: Number(id) },
  });
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
    defaultValues: { caption: photoData?.seePhoto?.caption || "" },
  });

  const editPhotoUpdate = (cache, result) => {
    const { caption } = getValues();
    console.log(caption);
    const {
      data: {
        editPhoto: { ok },
      },
    } = result;

    if (!ok) {
      return;
    }

    if (ok && photoData.seePhoto) {
      const newCaption = {
        caption,
      };
      const newCacheCaption = cache.writeFragment({
        data: newCaption,
        fragment: gql`
          fragment BSName on Photo {
            caption
          }
        `,
      });
      cache.modify({
        id: `Photo:${id}`,
        fields: {
          caption(prev) {
            return [...prev, newCacheCaption];
          },
        },
      });
    }
  };

  const [editPhotoMutation, { loading }] = useMutation(EDIT_PHOTO_MUTATION, {
    update: editPhotoUpdate,
  });

  const onValid = (data) => {
    const { caption } = data;
    editPhotoMutation({ variables: { id: Number(id), caption } });

    setDisplay(true);
    setMessage("Post is changed.");
    setTimeout(() => {
      setDisplay(false);
    }, 2000);
  };

  useEffect(() => {
    register("caption");
  }, [register]);

  return (
    <>
      <Container>
        <ContainerColumn>
          <PhotoFile src={photoData?.seePhoto?.file} />
        </ContainerColumn>
        <ContainerColumn>
          <PostHeader>
            <Link to={`/users/${photoData?.seePhoto.user.username}`}>
              <Avatar url={photoData?.seePhoto.user.avatar} />
            </Link>
            <Link to={`/users/${photoData?.seePhoto.user.username}`}>
              <Username>{photoData?.seePhoto.user.username}</Username>
            </Link>
          </PostHeader>

          <CaptionContainer>
            <EditForm onSubmit={handleSubmit(onValid)}>
              <Avatar url={photoData?.seePhoto.user.avatar} />
              <Caption type="text" name="caption" ref={register} />
            </EditForm>
          </CaptionContainer>

          <SubmitContainer>
            <Submit
              type="submit"
              value={loading ? "Loading..." : "Submit"}
              disabled={!formState.isValid || loading}
            />
          </SubmitContainer>
        </ContainerColumn>
      </Container>
      <CopyAlarm active={display}>{message}</CopyAlarm>
    </>
  );
}

export default PhotoEdit;
