import { useParams } from "react-router";

function Room() {
  const { id } = useParams();
  return <h1>chat room {id}</h1>;
}

export default Room;
