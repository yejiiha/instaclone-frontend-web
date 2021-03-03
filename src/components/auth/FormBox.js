import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 35px 0 20px 0;
  margin-bottom: 10px;
  form {
    width: 100%;
    margin-top: 35px;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

function FormBox({ children }) {
  return <Container>{children}</Container>;
}
export default FormBox;
