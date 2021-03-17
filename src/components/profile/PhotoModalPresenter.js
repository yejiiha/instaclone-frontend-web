import { gql, useMutation } from "@apollo/client";
import {
  faBookmark,
  faHeart,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import {
  faTimes,
  faEllipsisH,
  faHeart as SolidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../shared";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const ModalShow = css`
  top: 18%;
`;

const Modal = styled.div`
  display: flex;
  position: fixed;
  top: -250vh;
  background-color: #fff;
  align-items: center;
  margin: auto;
  max-width: 935px;
  height: 600px;
  width: 100%;
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.15);
  z-index: 10;
  cursor: auto;
  ${({ active }) => (active ? ModalShow : "")}
`;

const ModalColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  &:first-child {
    left: 0;
    width: 600px;
    height: 600px;
  }
  &:last-child {
    left: 0;
    width: 335px;
    height: 600px;
  }
`;

const PhotoFile = styled.img`
  max-width: 100%;
  height: 600px;
`;

const PhotoHeader = styled.div`
  padding: 20px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  &:last-child {
    width: 100%;
    right: 0;
    justify-content: flex-end;
    svg {
      cursor: pointer;
    }
  }
`;

const Username = styled(FatText)`
  margin-left: 10px;
  font-size: 13px;
  &:hover {
    text-decoration: underline;
  }
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const Caption = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  margin-left: 8px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`;

const LikeAction = styled.div`
  position: absolute;
  width: 335px;
  bottom: 0;
  right: 0;
  padding: 20px 15px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const PhotoAction = styled.div`
  margin-right: 15px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin: 10px 0;
  display: block;
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.darkGray};
`;

const Close = styled.button`
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 10px;
  background-color: transparent;
  border: 0;
  font-size: 18px;
  border: none;
  outline: none;
  padding-bottom: 12px;
  padding-top: 12px;
  color: white;
`;

const OverlayShow = css`
  display: block;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.55);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: none;
  z-index: 5;
  cursor: auto;
  ${({ active }) => (active ? OverlayShow : "")}
`;

function PhotoModalPresenter({
  id,
  user,
  file,
  caption,
  isLiked,
  likes,
  commentNumber,
  comments,
  isMine,
  createdAt,
  photoModal,
  setPhotoModal,
}) {
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const fragmentId = `Photo:${id}`;
      cache.modify({
        id: fragmentId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  return (
    <>
      <Modal active={photoModal}>
        <ModalColumn>
          <PhotoFile src={file} />
        </ModalColumn>
        <ModalColumn>
          <PhotoHeader>
            <Column>
              <Link to={`/users/${user.username}`}>
                <Avatar url={user.avatar} />
              </Link>
              <Link to={`/users/${user.username}`}>
                <Username>{user.username}</Username>
              </Link>
            </Column>
            <Column>
              <FontAwesomeIcon icon={faEllipsisH} />
            </Column>
          </PhotoHeader>
          <PhotoData>
            <Caption>
              <Link to={`/users/${user.username}`}>
                <Avatar url={user.avatar} />
              </Link>
              <Link to={`/users/${user.username}`}>
                <Username>{user.username}</Username>
              </Link>
              <Text> {caption}</Text>
            </Caption>

            {/* comments */}

            <LikeAction>
              <PhotoActions>
                <div>
                  <PhotoAction onClick={toggleLikeMutation}>
                    <FontAwesomeIcon
                      size="2x"
                      icon={isLiked ? SolidHeart : faHeart}
                      style={{ color: isLiked ? "#ED4956" : "inherit" }}
                    />
                  </PhotoAction>
                  <PhotoAction>
                    <FontAwesomeIcon size="2x" icon={faComment} />
                  </PhotoAction>
                  <PhotoAction>
                    <FontAwesomeIcon size="2x" icon={faPaperPlane} />
                  </PhotoAction>
                </div>
                <div>
                  <FontAwesomeIcon size="2x" icon={faBookmark} />
                </div>
              </PhotoActions>
              <Likes>{likes === 1 ? "1 like" : `${likes} likes`} </Likes>
              <Timestamp>{createdAt}</Timestamp>
            </LikeAction>
          </PhotoData>
        </ModalColumn>
      </Modal>

      <Overlay active={photoModal} onClick={() => setPhotoModal(!photoModal)}>
        <Close>
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </Close>
      </Overlay>
    </>
  );
}

PhotoModalPresenter.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
};

export default PhotoModalPresenter;
