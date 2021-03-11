import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { FatText } from "../shared";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
`;

const CLink = styled(Link)`
  margin-top: 10px;
`;

function UserCard({ id, avatar, username, isFollowing, isMe }) {
  return (
    <Card>
      <Avatar xl url={avatar} />
      <CLink to={`/users/${username}`}>
        <FatText>{username}</FatText>
      </CLink>
      {/* {!isMe && <FollowButton id={id} isFollowing={isFollowing} />} */}
    </Card>
  );
}

UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isMe: PropTypes.bool.isRequired,
};

export default UserCard;
