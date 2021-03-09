import { useState } from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import routes from "../routes";
import useUser from "../hooks/useUser";
import Avatar from "./Avatar";
import ProfileModal from "./ProfileModal";

const SHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.formColor};
  padding: 13px 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  &:active {
    color: ${(props) => props.theme.darkGray};
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-left: 18px;
  cursor: pointer;
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
  font-weight: 600;
`;

function Header() {
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
          <ProfileModal
            profileModal={profileModal}
            username={data?.me?.username}
          />
          {isLoggedIn ? (
            <IconContainer>
              <Link to={routes.home}>
                <Icon>
                  <FontAwesomeIcon icon={faHome} size="2x" />
                </Icon>
              </Link>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="2x" />
              </Icon>
              <Icon onClick={() => setProfileModal(!profileModal)}>
                <Avatar url={data?.me?.avatar} />
              </Icon>
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

export default Header;
