import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 9px 0 7px 10px;
  background-color: ${(props) => props.theme.bgColor};
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  border-radius: 3px;
  box-sizing: border-box;
  margin-top: 7px;
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default Input;
