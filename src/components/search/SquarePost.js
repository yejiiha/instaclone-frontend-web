import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

const Overlay = styled.div`
  background-color: ${(props) => props.theme.overlayColor};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  svg {
    fill: white;
  }
`;

const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  max-height: 290px;
  height: 100%;
  position: relative;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 10px;
  svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;

function SquarePost({ id, file, likes, commentNumber }) {
  return (
    <Photo key={id} bg={file}>
      <Overlay>
        <Icons>
          <Icon>
            <FontAwesomeIcon icon={faHeart} />
            {likes}
          </Icon>
          <Icon>
            <FontAwesomeIcon icon={faComment} />
            {commentNumber}
          </Icon>
        </Icons>
      </Overlay>
    </Photo>
  );
}

SquarePost.propTypes = {
  id: PropTypes.number.isRequired,
  file: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
};

export default SquarePost;
