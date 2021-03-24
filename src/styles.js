import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  blue: "#0095f6",
  fontColor: "rgb(38, 38, 38)",
  bgColor: "#fafafa",
  formColor: "white",
  inputColor: "rgb(38, 38, 38)",
  darkModeColor: "#ffe227",
  darkModeBgColor: "#374045",
  borderColor: "rgb(219, 219, 219)",
  darkGray: "#8e8e8e",
  hashtagColor: "rgb(0, 55, 107)",
  menuColor: "black",
  overlayColor: "rgba(0, 0, 0, 0.45)",
};

export const darkTheme = {
  blue: "#0095f6",
  fontColor: "white",
  bgColor: "#272121",
  formColor: "#2c2c2c",
  inputColor: "rgb(38, 38, 38)",
  darkModeColor: "#ffe227",
  darkModeBgColor: "#686d76",
  borderColor: "#525252",
  darkGray: "#8e8e8e",
  hashtagColor: "#3282b8",
  menuColor: "white",
};

export const GlobalStyles = createGlobalStyle`
    ${reset};
    * {
       box-sizing: border-box;
    }
    input {
      all: unset;
    }
    body {  
        background-color: ${(props) => props.theme.bgColor};
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        color: ${(props) => props.theme.fontColor};
    }
    a {
      text-decoration: none;
      color: inherit;
    }
`;
