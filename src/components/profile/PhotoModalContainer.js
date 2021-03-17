import { useQuery } from "@apollo/client";
import { SEE_PHOTO_QUERY } from "./ProfileQueries";
import PhotoModalPresenter from "./PhotoModalPresenter";

function PhotoModal({ id, photoModal, setPhotoModal }) {
  const { data } = useQuery(SEE_PHOTO_QUERY, { variables: { id } });
  return (
    <>
      {data && data?.seePhoto && (
        <PhotoModalPresenter
          key={data.seePhoto.id}
          id={data.seePhoto.id}
          user={data.seePhoto.user}
          file={data.seePhoto.file}
          caption={data.seePhoto.caption}
          isLiked={data.seePhoto.isLiked}
          likes={data.seePhoto.likes}
          commentNumber={data.seePhoto.commentNumber}
          comments={data.seePhoto.comments}
          createdAt={data.seePhoto.createdAt}
          isMine={data.seePhoto.isMine}
          photoModal={photoModal}
          setPhotoModal={setPhotoModal}
        />
      )}
    </>
  );
}

export default PhotoModal;
