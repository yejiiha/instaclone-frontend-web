import styled from "styled-components";

const SAvatar = styled.div`
  width: ${(props) => (props.lg ? "35px" : props.xl ? "60px" : "30px")};
  height: ${(props) => (props.lg ? "35px" : props.xl ? "60px" : "30px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.darkGray};
`;

const Img = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: cover;
`;

function Avatar({ url = "", lg = false, xl = false }) {
  return (
    <SAvatar lg={lg} xl={xl}>
      {url !== "" ? <Img src={url} /> : null}
    </SAvatar>
  );
}

export default Avatar;
