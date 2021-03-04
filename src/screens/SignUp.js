import { gql, useMutation } from "@apollo/client";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const history = useHistory();
  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home);
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
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
              required: "First Name is required.",
            })}
            hasError={Boolean(errors?.firstName?.message)}
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          <ErrorMessage message={errors?.firstName?.message} />

          <Input
            ref={register}
            hasError={Boolean(errors?.lastName?.message)}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
          <ErrorMessage message={errors?.lastName?.message} />

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
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
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
