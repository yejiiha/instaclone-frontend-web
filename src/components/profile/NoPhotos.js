import styled from "styled-components";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0 18em 0;
`;

const CameraWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  border: 2px solid ${(props) => props.theme.fontColor};
  border-radius: 50%;
  svg {
    font-size: 38px;
  }
`;

const Text = styled.span`
  margin-top: 20px;
  font-size: 25px;
`;

function NoPhotos() {
  return (
    <Wrapper>
      <CameraWrapper>
        <FontAwesomeIcon icon={faCamera} />
      </CameraWrapper>
      <Text>No Photos</Text>
    </Wrapper>
  );
}

export default NoPhotos;
