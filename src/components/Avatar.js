import styled from "styled-components";

const SAvatar = styled.div`
  width: 27px;
  height: 27px;
  border-radius: 15px;
  background-color: #2c2c2c;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.darkGray};
`;

const Img = styled.img`
  max-width: 100%;
  width: 27px;
  height: 27px;
`;

function Avatar({ url = "" }) {
  return <SAvatar>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
}

export default Avatar;
