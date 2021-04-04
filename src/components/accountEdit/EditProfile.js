import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import useUser from "../../hooks/useUser";
import { EDIT_PROFILE_MUTATION } from "./accountEditQueries";
import ErrorMessage from "../auth/ErrorMessage";

const Wrapper = styled.div`
  margin-top: 40px;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const EditProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: 100%;
`;

const InfoColumn = styled.div`
  &:first-child {
    margin: 2px 32px 0 124px;
  }
  &:last-child {
    display: flex;
    flex-direction: column;
  }
`;

const PreviewImg = styled.img`
  position: relative;
  height: 35px;
  width: 35px;
  border-radius: 50%;
`;

const InfoUsername = styled.span`
  font-size: 20px;
  margin-bottom: 5px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.blue};
  cursor: pointer;
`;

const ChooseAvatar = styled.input`
  display: none;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 16px;
  &:nth-child(5) {
    margin-bottom: 56px;
  }
`;

const Title = styled.aside`
  position: relative;
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  margin-top: 6px;
  width: 130px;
  padding: 0 32px;
  text-align: right;
  flex: 0 0 194px;
`;

const Content = styled.div`
  &:not(:last-child) {
    flex-basis: 355px;
    justify-content: flex-start;
  }
  &:nth-child(3) {
    display: flex;
    flex-direction: column;
  }
`;

const FirstName = styled.input`
  flex: 0 1 355px;
  height: 32px;
  padding: 0 10px;
  width: 355px;
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  &:focus {
    border-color: ${(props) => props.theme.fontColor};
  }
`;

const LastName = styled(FirstName)``;

const Username = styled(FirstName)``;

const Bio = styled(FirstName)`
  height: 60px;
`;

const Email = styled(FirstName)``;

const SubmitBtn = styled.input`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.blue};
  border-radius: 4px;
  color: white;
  font-weight: 600;
  box-sizing: border-box;
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

const CopyAlarmShow = css`
  display: block;
  bottom: 0;
  opacity: 1;
`;

const CopyAlarm = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 20px;
  background-color: black;
  color: white;
  opacity: 1;
  transition: all 0.3s ease-out;
  ${({ active }) => (active ? CopyAlarmShow : "")};
`;

function EditProfile() {
  const { data: userData } = useUser();
  const [previewUrl, setPreviewUrl] = useState(userData?.me?.avatar);
  const { register, handleSubmit, getValues, errors } = useForm({
    defaultValues: {
      firstName: userData?.me?.firstName,
      lastName: userData?.me?.lastName,
      username: userData?.me?.username,
      bio: userData?.me?.bio,
      email: userData?.me?.email,
    },
    mode: "onChange",
  });

  const editProfileUpdate = (cache, result) => {
    const { avatar, firstName, lastName, username, bio, email } = getValues();
    const {
      data: {
        editProfile: { ok },
      },
    } = result;

    if (!ok) {
      return;
    }

    if (ok && userData.me) {
      cache.modify({
        id: `User:${username}`,
        fields: {
          avatar() {
            return avatar;
          },
          username() {
            return username;
          },
          firstName() {
            return firstName;
          },
          lastName() {
            return lastName;
          },
          bio() {
            return bio;
          },
          email() {
            return email;
          },
        },
      });
    }
  };

  const [editProfileMutation, { loading }] = useMutation(
    EDIT_PROFILE_MUTATION,
    {
      update: editProfileUpdate,
    }
  );

  const onChange = (e) => {
    const avatar = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setPreviewUrl(reader.result);
    });
    reader.readAsDataURL(avatar);
  };

  const onValid = (data) => {
    const { avatar, firstName, lastName, username, bio, email } = data;
    editProfileMutation({
      variables: {
        avatar: avatar[0],
        firstName,
        lastName,
        username,
        bio,
        email,
      },
    });
  };
  return (
    <Wrapper>
      <Info>
        <InfoColumn>
          <PreviewImg src={previewUrl} />
        </InfoColumn>
        <InfoColumn>
          <InfoUsername>{userData?.me?.username}</InfoUsername>
          <Label htmlFor="avatar">Change Profile Photo</Label>
          <ChooseAvatar
            type="file"
            name="avatar"
            id="avatar"
            accept="image/jpg, image/png, image/jpeg"
            onChange={onChange}
            ref={register}
          />
        </InfoColumn>
      </Info>
      <EditProfileForm onSubmit={handleSubmit(onValid)}>
        <Row>
          <Title>First Name</Title>
          <Content>
            <FirstName type="text" name="firstName" ref={register} />
          </Content>
        </Row>
        <Row>
          <Title>Last Name</Title>
          <Content>
            <LastName type="text" name="lastName" ref={register} />
          </Content>
        </Row>
        <Row>
          <Title>Username</Title>
          <Content>
            <Username
              type="text"
              name="username"
              ref={register({
                minLength: {
                  value: 5,
                  message: "Username should be longer than 5 chars.",
                },
              })}
            />
            <ErrorMessage message={errors?.username?.message} />
          </Content>
        </Row>

        <Row>
          <Title>Bio</Title>
          <Content>
            <Bio type="text" name="bio" ref={register} />
          </Content>
        </Row>
        <Row>
          <Title>Email</Title>
          <Content>
            <Email type="text" name="email" ref={register} />
          </Content>
        </Row>
        <Row>
          <Title></Title>
          <Content>
            <SubmitBtn
              type="submit"
              value={loading ? "Loading..." : "Submit"}
            />
          </Content>
        </Row>
      </EditProfileForm>
    </Wrapper>
  );
}

export default EditProfile;
