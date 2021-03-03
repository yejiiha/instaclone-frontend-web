import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import SubmitButton from "../components/auth/SubmitButton";
import Title from "../components/auth/Title";
import routes from "../routes";

const FacebookLogin = styled.div`
  color: #385185;
  font-size: 13px;
  cursor: pointer;
  span {
    margin-left: 8px;
    font-weight: 600;
  }
`;

function Login() {
  return (
    <AuthLayout>
      <FormBox>
        <Title />
        <form>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <SubmitButton type="submit" value="Log In" />
          <Separator />
        </form>
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayout>
  );
}

export default Login;
