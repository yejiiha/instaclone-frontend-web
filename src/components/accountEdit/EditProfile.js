import { useState } from "react";
import styled from "styled-components";
import useUser from "../../hooks/useUser";

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
  background-color: black;
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

function EditProfile() {
  const { data } = useUser();
  const [previewUrl, setPreviewUrl] = useState(data?.me?.avatar);
  return (
    <Wrapper>
      <Info>
        <InfoColumn>
          <PreviewImg src={previewUrl} />
        </InfoColumn>
        <InfoColumn>
          <InfoUsername>{data?.me?.username}</InfoUsername>
          <Label htmlFor="avatar">Change Profile Photo</Label>
          <ChooseAvatar type="file" name="avatar" id="avatar" />
        </InfoColumn>
      </Info>
      <EditProfileForm>
        <Row>
          <Title>First Name</Title>
          <Content>
            <FirstName type="text" name="firstName" />
          </Content>
        </Row>
        <Row>
          <Title>Last Name</Title>
          <Content>
            <LastName type="text" name="lastName" />
          </Content>
        </Row>
        <Row>
          <Title>Username</Title>
          <Content>
            <Username type="text" name="username" />
          </Content>
        </Row>
        <Row>
          <Title>Bio</Title>
          <Content>
            <Bio type="text" name="bio" />
          </Content>
        </Row>
        <Row>
          <Title>Email</Title>
          <Content>
            <Email type="text" name="email" />
          </Content>
        </Row>
        <Row>
          <Title></Title>
          <Content>
            <SubmitBtn type="submit" value={"Submit"} />
          </Content>
        </Row>
      </EditProfileForm>
    </Wrapper>
  );
}

export default EditProfile;
