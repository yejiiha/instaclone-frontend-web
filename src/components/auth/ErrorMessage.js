import styled from "styled-components";

const SErrorMessage = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0 5px 0;
`;

function ErrorMessage({ message }) {
  return message === "" || !message ? null : (
    <SErrorMessage>{message}</SErrorMessage>
  );
}

export default ErrorMessage;
