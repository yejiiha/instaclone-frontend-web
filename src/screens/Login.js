import { gql, useMutation } from "@apollo/client";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import ErrorMessage from "../components/auth/ErrorMessage";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import SubmitButton from "../components/auth/SubmitButton";
import Title from "../components/auth/Title";
import PageTitle from "../components/PageTitle";
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

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("loginResult", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };
  const clearLoginError = () => {
    clearErrors("loginResult");
  };

  return (
    <AuthLayout>
      <PageTitle title="Log in" />
      <FormBox>
        <Title />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            onChange={clearLoginError}
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
            onChange={clearLoginError}
            hasError={Boolean(errors?.password?.message)}
            name="password"
            type="password"
            placeholder="Password"
          />
          <ErrorMessage message={errors?.password?.message} />
          <SubmitButton
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          <ErrorMessage message={errors?.loginResult?.message} />
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
