import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SquarePost from "../search/SquarePost";

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 20px;
`;

function ProfilePhotos({ photos }) {
  const location = useLocation();
  return (
    <Grid>
      {photos?.map((photo) => (
        <Link
          key={photo.id}
          to={{
            pathname: `/posts/${photo.id}`,
            state: { background: location },
          }}
        >
          <SquarePost
            key={photo.id}
            id={photo.id}
            file={photo.file}
            likes={photo.likes}
            commentNumber={photo.commentNumber}
          />
        </Link>
      ))}
    </Grid>
  );
}

export default ProfilePhotos;
