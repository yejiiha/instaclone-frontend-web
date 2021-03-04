import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import ErrorMessage from "../components/auth/ErrorMessage";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import SubmitButton from "../components/auth/SubmitButton";
import Title from "../components/auth/Title";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
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

const Text = styled(FatLink)`
  width: 100%;
  font-size: 17px;
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

const TextFatLink = styled(FatLink)`
  cursor: pointer;
`;

function SignUp() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    //console.log(data);
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <Title />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Text>Sign up to see photos and videos from your friends.</Text>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
            <span>Log in with Facebook</span>
          </FacebookLogin>

          <Separator />
          <Input
            ref={register({
              required: "Email is required.",
            })}
            hasError={Boolean(errors?.email?.message)}
            name="email"
            type="text"
            placeholder="Email"
          />
          <ErrorMessage message={errors?.email?.message} />

          <Input
            ref={register({
              required: "Full Name is required.",
            })}
            hasError={Boolean(errors?.fullName?.message)}
            name="fullName"
            type="text"
            placeholder="Full Name"
          />
          <ErrorMessage message={errors?.fullName?.message} />

          <Input
            ref={register({
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            hasError={Boolean(errors?.username?.message)}
            name="username"
            type="text"
            placeholder="Username"
          />
          <ErrorMessage message={errors?.username?.message} />

          <Input
            ref={register({
              required: "Password is required.",
            })}
            hasError={Boolean(errors?.password?.message)}
            name="password"
            type="password"
            placeholder="Password"
          />
          <ErrorMessage message={errors?.password?.message} />

          <SubmitButton
            type="submit"
            value="Sign up"
            disabled={!formState.isValid}
          />
          <Text2>
            By signing up, you agree to our <TextFatLink>Terms</TextFatLink>,{" "}
            <TextFatLink>Data Policy</TextFatLink> and{" "}
            <TextFatLink>Cookies Policy</TextFatLink>.
          </Text2>
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
}

export default SignUp;
