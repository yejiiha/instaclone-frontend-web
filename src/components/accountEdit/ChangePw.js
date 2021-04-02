import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Avatar from "../Avatar";

const Wrapper = styled.div`
  margin-top: 40px;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ChangePwForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: 100%;
`;

const InfoColumn = styled.div`
  &:first-child {
    margin: 2px 32px 0 124px;
  }
`;

const InfoUsername = styled.span`
  font-size: 20px;
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
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  &:focus {
    border-color: ${(props) => props.theme.fontColor};
  }
`;

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

function ChangePw() {
  const { data } = useUser();
  return (
    <Wrapper>
      <Info>
        <InfoColumn>
          <Avatar lg src={data?.me?.avatar} />
        </InfoColumn>
        <InfoColumn>
          <InfoUsername>{data?.me?.username}</InfoUsername>
        </InfoColumn>
      </Info>
      <ChangePwForm>
        <Row>
          <Title>Old Password</Title>
          <Content>
            <FirstName type="text" name="firstName" />
          </Content>
        </Row>
        <Row>
          <Title>New Password</Title>
          <Content>
            <FirstName type="text" name="firstName" />
          </Content>
        </Row>
        <Row>
          <Title>Confirm New Password</Title>
          <Content>
            <FirstName type="text" name="firstName" />
          </Content>
        </Row>
        <Row>
          <Title></Title>
          <Content>
            <SubmitBtn type="submit" value={"Change Password"} />
          </Content>
        </Row>
      </ChangePwForm>
    </Wrapper>
  );
}

export default ChangePw;
