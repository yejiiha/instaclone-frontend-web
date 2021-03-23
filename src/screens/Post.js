import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import PostPresenter from "../components/PostPresenter";
import { SEE_PHOTO_QUERY } from "../components/profile/ProfileQueries";

function Post() {
  const { id } = useParams();
  const { data } = useQuery(SEE_PHOTO_QUERY, { variables: { id: Number(id) } });

  return (
    <>
      {data && data?.seePhoto && (
        <PostPresenter
          key={data.seePhoto.id}
          id={data.seePhoto.id}
          user={data.seePhoto.user}
          file={data.seePhoto.file}
          caption={data.seePhoto.caption}
          isLiked={data.seePhoto.isLiked}
          likes={data.seePhoto.likes}
          comments={data.seePhoto.comments}
          createdAt={data.seePhoto.createdAt}
        />
      )}
    </>
  );
}

export default Post;
