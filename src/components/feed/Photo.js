import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisH,
  faHeart as SolidHeart,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FatText } from "../shared";
import Avatar from "../Avatar";
import Comments from "./Comments";
import PhotoUtilModal from "./PhotoUtilModal";
import { TOGGLE_LIKE_MUTATION } from "./FeedQueries";
import PhotoLikesModal from "./PhotoLikesModal";

const PhotoContainer = styled.div`
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const PhotoFile = styled.img`
  max-width: 100%;
  min-height: 600px;
`;

const PhotoData = styled.div`
  padding: 15px 0;
`;

const PhotoActions = styled.div`
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`;

const PhotoActionsColumn = styled.div`
  svg {
    font-size: 25px;
    cursor: pointer;
  }
`;

const PhotoAction = styled.div`
  margin-right: 15px;
  cursor: pointer;
  svg {
    font-size: 25px;
  }
`;

const Likes = styled(FatText)`
  padding: 0 15px;
  margin-top: 10px;
  display: block;
  &:active {
    color: ${(props) => props.theme.darkGray};
  }
`;

function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
  isMine,
  createdAt,
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
  return (
    <PhotoContainer key={id}>
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
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <PhotoActionsColumn>
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
          </PhotoActionsColumn>
          <PhotoActionsColumn>
            <FontAwesomeIcon size="2x" icon={faBookmark} />
          </PhotoActionsColumn>
        </PhotoActions>
        <Likes onClick={() => setPhotoLikesModal(!photoLikesModal)}>
          {likes === 1 ? "1 like" : likes === 0 ? null : `${likes} likes`}
          <PhotoLikesModal
            id={id}
            photoLikesModal={photoLikesModal}
            setPhotoLikesModal={setPhotoLikesModal}
          />
        </Likes>
        <Comments
          photoId={id}
          avatar={user.avatar}
          author={user.username}
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
          createdAt={createdAt}
        />
      </PhotoData>
    </PhotoContainer>
  );
}

Photo.propTypes = {
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

export default Photo;
