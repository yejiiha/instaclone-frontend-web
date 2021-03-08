import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;

const SLoader = styled.div`
  animation: ${Animation} 1s linear infinite;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
`;

function Loader() {
  return (
    <SLoader>
      <FontAwesomeIcon icon={faInstagram} size="3x" />
    </SLoader>
  );
}

export default Loader;
