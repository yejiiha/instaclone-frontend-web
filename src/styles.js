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
  shadowColor: "rgba(0, 0, 0, 0.07)",
  lightGray: "#EFEFEF",
  mobileS: `(max-width: 540px)`,
  mobileM: `(max-width: 735px)`,
  tabletS: `(max-width: 1000px)`,
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
  overlayColor: "rgba(66, 70, 66, 0.5)",
  shadowColor: "rgba(187,187, 187, 0.07)",
  lightGray: "#EFEFEF",
  mobileS: `(max-width: 540px)`,
  mobileM: `(max-width: 735px)`,
  tabletS: `(max-width: 1000px)`,
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
    &::-webkit-scrollbar {
      border-bottom-right-radius: 12px;
      width: 15px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 12px;
      background: ${(props) => props.theme.borderColor};
      &:active{
        background: ${(props) => props.theme.darkGray};
      }
    }
`;
