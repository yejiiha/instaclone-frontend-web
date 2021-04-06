import { useMutation } from "@apollo/client";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled, { css, keyframes } from "styled-components";
import useUser from "../../hooks/useUser";
import ErrorMessage from "../auth/ErrorMessage";
import Avatar from "../Avatar";
import { EDIT_PROFILE_MUTATION } from "./accountEditQueries";

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
  &:nth-child(3) {
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

const CopyAlarmShow = css`
  display: block;
  bottom: 0;
`;

const CopyAlarm = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 20px;
  background-color: black;
  color: white;
  display: none;
  transition: all 0.3s ease-out;
  ${({ active }) => (active ? CopyAlarmShow : "")};
`;

function ChangePw() {
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState(false);
  const { data: userData } = useUser();
  const {
    register,
    handleSubmit,
    getValues,
    errors,
    watch,
    formState,
  } = useForm({
    mode: "onChange",
  });

  const password = useRef({});
  password.current = watch("password", "");

  const editProfileUpdate = (cache, result) => {
    const { password } = getValues();
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
        id: `User:${userData?.me?.username}`,
        fields: {
          password(prev) {
            return password;
          },
        },
      });
    }
  };

  useEffect(() => {
    register("password");
  }, [register]);

  const [editProfileMutation, { loading }] = useMutation(
    EDIT_PROFILE_MUTATION,
    {
      update: editProfileUpdate,
    }
  );

  const onValid = (data) => {
    if (loading) {
      return;
    }
    const { password } = data;
    editProfileMutation({
      variables: {
        password,
      },
    });
    setDisplay(true);
    setMessage("Passsword is changed.");
    setTimeout(() => {
      setDisplay(false);
    }, 2000);
  };
  return (
    <>
      <Wrapper>
        <Info>
          <InfoColumn>
            <Avatar lg src={userData?.me?.avatar} />
          </InfoColumn>
          <InfoColumn>
            <InfoUsername>{userData?.me?.username}</InfoUsername>
          </InfoColumn>
        </Info>

        <ChangePwForm onSubmit={handleSubmit(onValid)}>
          <Row>
            <Title>New Password</Title>
            <Content>
              <FirstName
                type="password"
                name="password"
                ref={register({
                  minLength: {
                    value: 5,
                    message: "Password must have at least 5 characters.",
                  },
                })}
              />
            </Content>
          </Row>
          <Row>
            <Title>Confirm New Password</Title>
            <Content>
              <FirstName
                type="password"
                name="confirmPassword"
                ref={register({
                  validate: (value) =>
                    value === password.current ||
                    "Please make sure both passwords match.",
                })}
              />
              <ErrorMessage message={errors?.confirmPassword?.message} />
            </Content>
          </Row>
          <Row>
            <Title></Title>
            <Content>
              <SubmitBtn
                type="submit"
                value={loading ? "Loading..." : "Change Password"}
                disabled={loading || !formState.isValid}
              />
            </Content>
          </Row>
        </ChangePwForm>
      </Wrapper>
      <CopyAlarm active={display}>{message}</CopyAlarm>
    </>
  );
}

export default ChangePw;
