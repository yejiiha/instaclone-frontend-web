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
};

export const darkTheme = {
  blue: "#0095f6",
  fontColor: "white",
  bgColor: "#2c2c2c",
  formColor: "#2c2c2c",
  inputColor: "rgb(38, 38, 38)",
  darkModeColor: "#ffe227",
  darkModeBgColor: "#686d76",
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
