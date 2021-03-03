import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  lightBlue: "#b2dffc",
  blue: "#0095f6",
  bgColor: "#fafafa",
  borderColor: "rgb(219, 219, 219)",
  darkGray: "#8e8e8e",
};

export const darkTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
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
        color: rgb(38,38,38);
    }
    a {
      text-decoration: none;
    }
`;
