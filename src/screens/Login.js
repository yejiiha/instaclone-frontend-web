import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
  width: 100%;
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 35px 0 20px 0;
  margin-bottom: 10px;
  form {
    width: 100%;
    margin-top: 35px;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
      width: 100%;
      padding: 9px 0 7px 8px;
      background-color: #fafafa;
      border: 0.5px solid rgb(219, 219, 219);
      border-radius: 3px;
      &:not(:first-child) {
        margin-top: 7px;
      }
      &:last-child {
        margin-top: 15px;
        padding: 9px 6px;
        background-color: #b2dffc;
        color: white;
        text-align: center;
        border-radius: 5px;
        font-weight: 600;
        border: none;
      }
    }
  }
`;

const Title = styled.h1`
  font-size: 40px;
  font-family: "Pacifico", cursive;
`;

const Separator = styled.div`
  width: 100%;
  padding: 0 35px;
  margin: 25px 40px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: #dbdbdb;
  }
  span {
    font-size: 13px;
    margin: 0 18px;
    font-weight: 600;
    color: #8e8e8e;
  }
`;

const FacebookLogin = styled.div`
  color: #385185;
  font-size: 13px;
  cursor: pointer;
  span {
    margin-left: 8px;
    font-weight: 600;
  }
`;

const BottomBox = styled(WhiteBox)`
  padding: 25px 0px;
  text-align: center;
  a {
    font-weight: 600;
    color: #0095f6;
  }
`;

function Login() {
  return (
    <Container>
      <Wrapper>
        <TopBox>
          <Title>Jistagram</Title>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="submit" value="Log In" />
          </form>
          <Separator>
            <div></div>
            <span>OR</span>
            <div></div>
          </Separator>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
            <span>Log in with Facebook</span>
          </FacebookLogin>
        </TopBox>
        <BottomBox>
          <span> Don't have an account? </span> <a href="#">Sign up</a>
        </BottomBox>
      </Wrapper>
    </Container>
  );
}

export default Login;
