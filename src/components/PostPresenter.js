import { useMutation } from "@apollo/client";
import styled from "styled-components";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FatText } from "./shared";
import { Link } from "react-router-dom";
import ProfileModalComments from "./profile/ProfileModalComments";
import ProfileModalComment from "./profile/ProfileModalComment";
import Avatar from "./Avatar";
import { TOGGLE_LIKE_MUTATION } from "./feed/FeedQueries";
import { dateConverter } from "./shared";

const Modal = styled.div`
  display: flex;
  position: fixed;
  background-color: ${(props) => props.theme.formColor};
  align-items: center;
  margin: auto;
  max-width: 935px;
  height: 600px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
  cursor: auto;
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
  bottom: 55px;
  right: 0;
  padding: 13px 15px 10px 15px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
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
  font-size: 10px;
  color: ${(props) => props.theme.darkGray};
`;

function PostPresenter({
  id,
  user,
  file,
  caption,
  isLiked,
  likes,
  comments,
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

  return (
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
            <FontAwesomeIcon icon={faEllipsisH} />
          </Column>
        </PhotoHeader>
        <PhotoData>
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
            <Timestamp>{dateConverter(createdAt)}</Timestamp>
          </LikeAction>
          <ProfileModalComments photoId={id} />
        </PhotoData>
      </ModalColumn>
    </Modal>
  );
}

export default PostPresenter;
