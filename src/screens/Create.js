import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FEED_FRAGMENT } from "../components/Fragments";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared";
import useUser from "../hooks/useUser";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedFragment
    }
  }
  ${FEED_FRAGMENT}
`;

const Container = styled.div``;

const CreateForm = styled.form`
  display: flex;
`;

const CreateColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  &:first-child {
    left: 0;
    width: 600px;
    height: 600px;
    background-color: ${(props) => props.theme.borderColor};
    align-items: center;
  }
  &:last-child {
    left: 0;
    width: 335px;
    height: 600px;
    background-color: ${(props) => props.theme.formColor};
    border: 1px solid ${(props) => props.theme.borderColor};
  }
`;

const Header = styled.div`
  padding: 20px 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Username = styled(FatText)`
  margin-left: 10px;
  font-size: 13px;
  &:hover {
    text-decoration: underline;
  }
`;

const PreviewImg = styled.img`
  height: 545px;
  width: 600px;
`;

const ChooseImg = styled.input`
  background-color: yellowgreen;
`;

const CaptionContainer = styled.div`
  padding: 20px 15px;
  display: flex;
`;

const Caption = styled.input`
  margin-left: 10px;
  width: 85%;
`;

const SubmitContainer = styled.div`
  background-color: yellowgreen;
  text-align: center;
  margin-top: 405px;
`;

const Submit = styled.input`
  width: 100%;
  padding: 20px 15px;
  background-color: ${(props) => props.theme.blue};
  color: white;
  box-sizing: border-box;
  cursor: pointer;
`;

function Create({ props }) {
  const [uploadPhotoMutation, { loading }] = useMutation(UPLOAD_PHOTO_MUTATION);
  const { data } = useUser();
  const { register, handleSubmit, setValue, getValues, formState } = useForm({
    mode: "onChange",
  });
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    register("caption");
  }, [register]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const onChange = (e) => {
    let reader = new FileReader();
    let targetFile = e.target.files[0];
    reader.readAsDataURL(targetFile);
    reader.onload = (evt) => {
      setPreviewUrl(evt.target.result);
    };
  };

  const onValid = ({
    target: {
      validity,
      files: [file],
      caption,
    },
  }) => {
    if (validity.valid) uploadPhotoMutation({ variables: { file, caption } });

    uploadPhotoMutation({
      variables: {
        caption,
        file,
      },
    });
  };

  return (
    <Container>
      <PageTitle title="Create post" />
      <CreateForm onSubmit={handleSubmit(onValid)}>
        <CreateColumn>
          <PreviewImg src={previewUrl} />
          <ChooseImg
            type="file"
            name="file"
            onChange={onChange}
            accept="image/jpg, image/png, image/jpeg"
          />
        </CreateColumn>
        <CreateColumn>
          <Header>
            <Link to={`/users/${data?.me?.username}`}>
              <Avatar url={data?.me?.avatar} />
            </Link>
            <Link to={`/users/${data?.me?.username}`}>
              <Username>{data?.me?.username}</Username>
            </Link>
          </Header>

          <CaptionContainer>
            <Avatar url={data?.me?.avatar} />
            <Caption
              type="text"
              name="caption"
              ref={register}
              placeholder="Write a caption..."
            />
          </CaptionContainer>

          <SubmitContainer>
            <Submit
              type="submit"
              value={loading ? "Loading..." : "Share"}
              disabled={!formState.isValid || loading}
            />
          </SubmitContainer>
        </CreateColumn>
      </CreateForm>
    </Container>
  );
}

export default Create;
