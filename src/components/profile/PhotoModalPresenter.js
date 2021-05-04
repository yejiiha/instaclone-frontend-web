import { useMutation } from "@apollo/client";
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
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";
import { dateConverter } from "../shared";
import ProfileModalComment from "./ProfileModalComment";
import ProfileModalComments from "./ProfileModalComments";
import { TOGGLE_LIKE_MUTATION } from "../feed/FeedQueries";
import { useState } from "react";
import PhotoUtilModal from "../feed/PhotoUtilModal";
import PhotoLikesModal from "../feed/PhotoLikesModal";
import {
  ModalColumn,
  PhotoFile,
  PhotoHeader,
  Column,
  Username,
  PhotoActions,
  PhotoData,
  Content,
  LikeAction,
  PhotoAction,
  Likes,
  Timestamp,
} from "../PostPresenter";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${(props) => props.theme.overlayColor};
  z-index: 1;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  display: flex;
  position: fixed;
  background-color: ${(props) => props.theme.formColor};
  align-items: center;
  margin: auto;
  max-width: 935px;
  height: 600px;
  width: 100%;
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.15);
  z-index: 10;
  cursor: auto;
`;

const Close = styled.button`
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 10px;
  background-color: transparent;
  border: 0;
  font-size: 16px;
  border: none;
  outline: none;
  padding-bottom: 12px;
  padding-top: 12px;
  color: white;
`;

function PhotoModalPresenter({
  id,
  user,
  file,
  caption,
  isLiked,
  likes,
  comments,
  createdAt,
  isMine,
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
  const [photoUtilModal, setPhotoUtilModal] = useState(false);
  const [photoLikesModal, setPhotoLikesModal] = useState(false);
  const history = useHistory();
  const goBack = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <Overlay>
      <Close onClick={goBack}>
        <FontAwesomeIcon icon={faTimes} size="2x" />
      </Close>
      <Modal>
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
              <FontAwesomeIcon
                icon={faEllipsisH}
                onClick={() => setPhotoUtilModal(!photoUtilModal)}
              />
              <PhotoUtilModal
                id={id}
                photoUtilModal={photoUtilModal}
                setPhotoUtilModal={setPhotoUtilModal}
                isMine={isMine}
              />
            </Column>
          </PhotoHeader>
          <PhotoData>
            <Content>
              <ProfileModalComment
                id={id}
                avatar={user.avatar}
                author={user.username}
                caption={caption}
              />
              {comments?.map((comment) => (
                <ProfileModalComment
                  key={comment.id}
                  id={comment.id}
                  avatar={comment.user.avatar}
                  author={comment.user.username}
                  caption={comment.payload}
                  isMine={comment.isMine}
                  createdAt={comment.createAt}
                />
              ))}
            </Content>
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
              <Likes onClick={() => setPhotoLikesModal(!photoLikesModal)}>
                {likes === 1 ? "1 like" : likes === 0 ? null : `${likes} likes`}
                <PhotoLikesModal
                  id={id}
                  photoLikesModal={photoLikesModal}
                  setPhotoLikesModal={setPhotoLikesModal}
                />
              </Likes>
              <Timestamp>{dateConverter(createdAt)}</Timestamp>
            </LikeAction>

            <ProfileModalComments photoId={id} />
          </PhotoData>
        </ModalColumn>
      </Modal>
    </Overlay>
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
};

export default PhotoModalPresenter;
