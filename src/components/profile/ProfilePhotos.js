import styled from "styled-components";
import SquarePost from "../search/SquarePost";

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 20px;
`;

const Text = styled.span``;

function ProfilePhotos({ tab, photos }) {
  return (
    <>
      {tab === "posts" && (
        <Grid>
          {photos
            ?.map((photo) => (
              <SquarePost
                key={photo.id}
                id={photo.id}
                file={photo.file}
                likes={photo.likes}
                commentNumber={photo.commentNumber}
              />
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
