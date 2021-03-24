import React from "react";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0 18em 0;
`;

const CameraWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  border: 2px solid ${(props) => props.theme.fontColor};
  border-radius: 50%;
  svg {
    font-size: 38px;
  }
`;

const Text = styled.span`
  margin-top: 20px;
  font-size: 25px;
`;

function ProfilePhotos({ tab, photos }) {
  const location = useLocation();
  return (
    <>
      {tab === 0 && (
        <Grid>
          {photos
            ?.map((photo) => (
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
            ))
            .reverse()}
        </Grid>
      )}
      {tab === 1 && (
        <Wrapper>
          <CameraWrapper>
            <FontAwesomeIcon icon={faCamera} />
          </CameraWrapper>
          <Text>No Photos</Text>
        </Wrapper>
      )}
      {tab === 2 && (
        <Wrapper>
          <CameraWrapper>
            <FontAwesomeIcon icon={faCamera} />
          </CameraWrapper>
          <Text>No Photos</Text>
        </Wrapper>
      )}
    </>
  );
}

export default ProfilePhotos;
