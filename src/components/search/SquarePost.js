import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PhotoModalContainer from "../profile/PhotoModalContainer";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
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
  background-size: 290px 290px;
  background-repeat: no-repeat;
  width: 100%;
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
  const [photoModal, setPhotoModal] = useState(false);
  return (
    <>
      <Photo key={id} bg={file} onClick={() => setPhotoModal(!photoModal)}>
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
      <PhotoModalContainer
        id={id}
        photoModal={photoModal}
        setPhotoModal={setPhotoModal}
      />
    </>
  );
}

SquarePost.propTypes = {
  id: PropTypes.number.isRequired,
  file: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
};

export default SquarePost;
