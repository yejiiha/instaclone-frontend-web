import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 20px;
`;

const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: 290px 290px;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  opacity: 0;
  transition: opacity 0.2s linear;
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

const Text = styled.span``;

function ProfilePhotos({ tab, photos }) {
  return (
    <>
      {tab === "posts" && (
        <Grid>
          {photos
            ?.map((photo) => (
              <Photo key={photo.id} bg={photo.file}>
                <Icons>
                  <Icon>
                    <FontAwesomeIcon icon={faHeart} />
                    {photo.likes}
                  </Icon>
                  <Icon>
                    <FontAwesomeIcon icon={faComment} />
                    {photo.commentNumber}
                  </Icon>
                </Icons>
              </Photo>
            ))
            .reverse()}
        </Grid>
      )}
      {tab === "saved" && <Text>Saved</Text>}
      {tab === "tagged" && <Text>Tagged</Text>}
    </>
  );
}

export default ProfilePhotos;
