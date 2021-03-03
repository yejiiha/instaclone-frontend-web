import styled from "styled-components";

const SInput = styled.input`
  width: 100%;
  padding: 9px 0 7px 10px;
  background-color: ${(props) => props.theme.bgColor};
  border: 0.5px solid ${(props) => props.theme.borderColor};
  border-radius: 3px;
  box-sizing: border-box;
  margin-top: 7px;
`;

function Input(props) {
  return <SInput {...props} />;
}

export default Input;
