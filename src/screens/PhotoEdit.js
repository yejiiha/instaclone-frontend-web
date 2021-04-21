import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { SEE_PHOTO_QUERY } from "../components/profile/ProfileQueries";
import {
  Modal,
  ModalColumn,
  PhotoFile,
  PhotoHeader,
  Username,
} from "../components/PostPresenter";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CopyAlarm } from "../components/feed/PhotoUtilModal";
import { CaptionContainer, Caption, SubmitContainer, Submit } from "./Create";
import PageTitle from "../components/PageTitle";

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

const SCaptionContainer = styled(CaptionContainer)`
  width: 100%;
`;

function PhotoEdit() {
  const history = useHistory();
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
    const {
      data: {
        editPhoto: { ok },
      },
    } = result;

    if (!ok) {
      return;
    }

    if (ok && photoData?.seePhoto) {
      cache.modify({
        id: `Photo:${photoData.seePhoto.id}`,
        fields: {
          caption(prev) {
            return caption;
          },
        },
      });
    }
  };

  const [editPhotoMutation, { loading }] = useMutation(EDIT_PHOTO_MUTATION, {
    update: editPhotoUpdate,
  });

  const onPhotoEditValid = (data) => {
    const { caption } = data;
    editPhotoMutation({ variables: { id: Number(id), caption } });

    setDisplay(true);
    setMessage("Post is changed.");
    setTimeout(() => {
      setDisplay(false);
      history.push(`/posts/${id}`);
    }, 2000);
  };

  useEffect(() => {
    register("caption");
  }, [register]);

  return (
    <>
      <PageTitle title="Edit Post | Jistagram" />
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
          <EditForm onSubmit={handleSubmit(onPhotoEditValid)}>
            <SCaptionContainer>
              <Avatar url={photoData?.seePhoto.user.avatar} />
              <Caption type="text" name="caption" ref={register} />
            </SCaptionContainer>

            <SubmitContainer>
              <Submit
                type="submit"
                value={loading ? "Loading..." : "Submit"}
                disabled={!formState.isValid || loading}
              />
            </SubmitContainer>
          </EditForm>
        </ContainerColumn>
      </Container>
      <CopyAlarm active={display}>{message}</CopyAlarm>
    </>
  );
}

export default PhotoEdit;
