import { useReactiveVar } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";
import Header from "../Header";
import { Content, DarkModeBtn } from "../auth/Layout";
import DM from "../../screens/DM";
import PageTitle from "../PageTitle";

function DmLayout({ children }) {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <>
      <Header />
      <Content>
        <PageTitle title="Inbox | Direct" />
        <DM children={children} />
      </Content>
      <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" />
      </DarkModeBtn>
    </>
  );
}

export default DmLayout;
