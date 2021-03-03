import styled from "styled-components";

const SSeparator = styled.div`
  width: 100%;
  margin: 25px 0 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: #dbdbdb;
  }
  span {
    font-size: 13px;
    margin: 0 18px;
    font-weight: 600;
    color: ${(props) => props.theme.darkGray};
  }
`;

function Separator() {
  return (
    <SSeparator>
      <div></div>
      <span>OR</span>
      <div></div>
    </SSeparator>
  );
}

export default Separator;
