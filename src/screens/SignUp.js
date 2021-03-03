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
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const FacebookLogin = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.blue};
  color: white;
  font-size: 13px;
  padding: 10px 0;
  margin-top: 15px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  span {
    margin-left: 8px;
    font-weight: 600;
  }
`;

const Text = styled.h2`
  width: 100%;
  color: ${(props) => props.theme.darkGray};
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  margin: 0 40px 10px;
  text-align: center;
`;

const Text2 = styled.p`
  width: 100%;
  color: ${(props) => props.theme.darkGray};
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  margin: 25px 40px 10px 40px;
  text-align: center;
`;

function SignUp() {
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <Title />
        <form>
          <Text>Sign up to see photos and videos from your friends.</Text>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
            <span>Log in with Facebook</span>
          </FacebookLogin>

          <Separator />
          <Input type="text" placeholder="Email" />
          <Input type="text" placeholder="Full Name" />
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <SubmitButton type="submit" value="Sign up" />
          <Text2>
            By signing up, you agree to our Terms, Data Policy and Cookies
            Policy.
          </Text2>
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
}

export default SignUp;
