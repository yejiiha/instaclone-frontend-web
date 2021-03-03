import styled from "styled-components";

const Button = styled.input`
  width: 100%;
  margin-top: 15px;
  padding: 9px 6px;
  background-color: ${(props) => props.theme.lightBlue};
  color: white;
  text-align: center;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  box-sizing: border-box;
`;

function SubmitButton(props) {
  return <Button {...props} />;
}

export default SubmitButton;
