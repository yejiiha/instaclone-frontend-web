import styled from "styled-components";

const SubmitButton = styled.input`
  width: 100%;
  margin-top: 15px;
  padding: 9px 6px;
  background-color: ${(props) => props.theme.blue};
  color: white;
  text-align: center;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  box-sizing: border-box;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

export default SubmitButton;
