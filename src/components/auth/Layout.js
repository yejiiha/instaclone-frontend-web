import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";
import Footer from "../Footer";
import Header from "../Header";

const Content = styled.main`
  margin: 0 auto;
  margin-top: 95px;
  max-width: 930px;
  width: 100%;
`;

const DarkModeBtn = styled.button`
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
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  color: ${(props) => props.theme.darkModeColor};
  background-color: ${(props) => props.theme.darkModeBgColor};

  &:focus {
    border: none;
    outline: none;
  }
`;

function Layout({ children }) {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" />
      </DarkModeBtn>
      <Footer />
    </>
  );
}

export default Layout;
