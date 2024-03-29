import { gql, useMutation } from "@apollo/client";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FEED_FRAGMENT } from "../components/Fragments";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared";
import useUser from "../hooks/useUser";
import routes from "../routes";

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
    justify-content: center;
    align-items: center;
    text-align: center;
    @media ${(props) => props.theme.tabletS} {
      width: 500px;
    }
    @media ${(props) => props.theme.mobileM} {
      width: 400px;
    }
    @media ${(props) => props.theme.mobileS} {
      width: 300px;
    }
  }
  &:last-child {
    position: relative;
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
  position: relative;
  height: 600px;
  width: 600px;
`;

const Label = styled.label`
  position: absolute;

  display: inline-block;
  padding: 10px;
  cursor: pointer;
  svg {
    font-size: 200px;
    opacity: 0;
  }
  &:hover {
    svg {
      opacity: 0.7;
    }
  }
`;

const ChooseImg = styled.input`
  display: none;
`;

export const CaptionContainer = styled.div`
  padding: 20px 15px;
  display: flex;
`;

export const Caption = styled.textarea`
  margin-left: 10px;
  width: 85%;
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const SubmitContainer = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: -1px;
`;

export const Submit = styled.input`
  width: 100%;
  padding: 20px 15px;
  background-color: ${(props) => props.theme.blue};
  color: white;
  box-sizing: border-box;
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

function Create() {
  const history = useHistory();
  const { data } = useUser();
  const defaultImg = "https://www.gamudacove.com.my/media/img/default-img.jpg";
  const [previewUrl, setPreviewUrl] = useState(defaultImg);
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  const uploadPhotoUpdate = (cache, result) => {
    const {
      data: { uploadPhoto },
    } = result;

    if (uploadPhoto.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev) {
            return [uploadPhoto, ...prev];
          },
        },
      });
      history.push(routes.home);
    }
  };

  const [uploadPhotoMutation, { loading }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      update: uploadPhotoUpdate,
    }
  );

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setPreviewUrl(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const onValid = (data) => {
    const { file, caption } = data;
    uploadPhotoMutation({ variables: { file: file[0], caption } });
  };

  useEffect(() => {
    register("caption");
  }, [register]);

  return (
    <Container>
      <PageTitle title="Create post | Jistagram" />
      <CreateForm onSubmit={handleSubmit(onValid)}>
        <CreateColumn>
          <PreviewImg src={previewUrl} />
          <Label htmlFor="file">
            <FontAwesomeIcon icon={faPlusCircle} />
          </Label>
          <ChooseImg
            type="file"
            name="file"
            id="file"
            accept="image/jpg, image/png, image/jpeg"
            required
            onChange={onFileChange}
            ref={register({ required: true })}
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
              cols="20"
              rows="28"
              name="caption"
              ref={register}
              placeholder="Write a caption..."
            />
          </CaptionContainer>

          <SubmitContainer>
            <Submit
              type="submit"
              value={loading ? "Loading..." : "Submit"}
              disabled={!formState.isValid || loading}
            />
          </SubmitContainer>
        </CreateColumn>
      </CreateForm>
    </Container>
  );
}

export default Create;
