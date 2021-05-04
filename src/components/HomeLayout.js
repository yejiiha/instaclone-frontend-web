import { useReactiveVar } from "@apollo/client";
import styled, { keyframes } from "styled-components";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";
import Header from "./Header";

export const Content = styled.main`
  margin: 0 auto;
  margin-top: 95px;
  max-width: 930px;
  width: 100%;
  min-height: 76vh;
`;

const Float = keyframes`
  0% {
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
    
  }
  50% {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
  }
  100% {
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
  }
`;

export const DarkModeBtn = styled.button`
  position: fixed;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border: none;
  --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  box-shadow: ${(props) => props.theme.shadowColor} 0px 1px 1px,
    ${(props) => props.theme.shadowColor} 0px 2px 2px,
    ${(props) => props.theme.shadowColor} 0px 4px 4px,
    ${(props) => props.theme.shadowColor} 0px 8px 8px,
    ${(props) => props.theme.shadowColor} 0px 16px 16px;
  color: ${(props) => props.theme.darkModeColor};
  background-color: ${(props) => props.theme.darkModeBgColor};
  &:focus {
    border: none;
    outline: none;
  }
  &:hover {
    animation: ${Float} 1s infinite linear;
  }
`;

function HomeLayout({ children }) {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" />
      </DarkModeBtn>
    </>
  );
}

export default HomeLayout;
