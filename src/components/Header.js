import { useState } from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faPaperPlane,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";
import { Link, withRouter } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import routes from "../routes";
import useUser from "../hooks/useUser";
import Avatar from "./Avatar";
import HeaderModal from "./HeaderModal";
import { useForm } from "react-hook-form";

const SHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.formColor};
  padding: 9px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Column = styled.div``;
const HTitle = styled.h1`
  cursor: pointer;
  font-size: 24px;
  font-family: "Pacifico", cursive;
  margin-right: 10px;
  &:active {
    color: ${(props) => props.theme.darkGray};
  }
`;

const HeaderInput = styled.input`
  min-width: 125px;
  width: 185px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  padding: 5px 10px;
  text-align: center;
  font-size: 14px;
  &:focus {
    text-align: left;
    border-color: rgb(38, 38, 38);
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-left: 18px;
  cursor: pointer;
  svg {
    font-size: 25px;
  }
`;

const LButton = styled.span`
  background-color: ${(props) => props.theme.blue};
  border-radius: 5px;
  padding: 5px 9px;
  color: white;
  font-weight: 600;
  margin-left: 15px;
`;

const SButton = styled(LButton)`
  background-color: ${(props) => props.theme.formColor};
  color: ${(props) => props.theme.blue};
  border: 1px solid ${(props) => props.theme.borderColor};
  font-weight: 600;
`;

function Header({ history }) {
  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    const { search } = getValues();
    history.push(`/search?term=${search}`);
  };
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  const [profileModal, setProfileModal] = useState(false);
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to={routes.home}>
            <HTitle>Jistagram</HTitle>
          </Link>
        </Column>
        <Column>
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <HeaderInput
              ref={register}
              name="search"
              type="text"
              placeholder="Search"
            />
          </form>
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconContainer>
              <Icon>
                <Link to={routes.home}>
                  <FontAwesomeIcon icon={faHome} />
                </Link>
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Icon>
              <Icon>
                <Link to={"/create"}>
                  <FontAwesomeIcon icon={faPlusSquare} />
                </Link>
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
              </Icon>
              <Icon onClick={() => setProfileModal(!profileModal)}>
                <Avatar url={data?.me?.avatar} />
              </Icon>
              <HeaderModal
                profileModal={profileModal}
                setProfileModal={setProfileModal}
                username={data?.me?.username}
              />
            </IconContainer>
          ) : (
            <>
              <Link href={routes.home}>
                <LButton>Log in</LButton>
              </Link>
              <Link href={routes.signup}>
                <SButton>Sign up</SButton>
              </Link>
            </>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}

export default withRouter(Header);
