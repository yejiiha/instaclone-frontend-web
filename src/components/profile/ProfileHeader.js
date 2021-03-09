import styled from "styled-components";
import { FatText } from "../shared";

const Header = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  margin-left: 50px;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  margin-right: 150px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const Column = styled.div``;

const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  &:nth-child(2) {
    margin-bottom: 30px;
  }
  &:nth-child(3) {
    margin-bottom: 10px;
  }
`;

const Username = styled.span`
  font-size: 28px;
`;

const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;

const Value = styled(FatText)`
  font-size: 16px;
`;

const Name = styled(FatText)`
  font-size: 17px;
  cursor: auto;
`;

function ProfileHeader({
  avatar,
  username,
  totalFollowers,
  totalFollowing,
  totalPhotos,
  firstName,
  lastName,
  bio,
}) {
  return (
    <Header>
      <Avatar src={avatar} />
      <Column>
        <Row>
          <Username>{username}</Username>
        </Row>
        <Row>
          <List>
            <Item>
              <span>
                <Value>{totalPhotos}</Value> Posts
              </span>
            </Item>
            <Item>
              <span>
                <Value>{totalFollowers}</Value> Followers
              </span>
            </Item>
            <Item>
              <span>
                <Value>{totalFollowing}</Value> Following
              </span>
            </Item>
          </List>
        </Row>
        <Row>
          <Name>
            {firstName}
            {"  "}
            {lastName}
          </Name>
        </Row>
        <Row>{bio}</Row>
      </Column>
    </Header>
  );
}

export default ProfileHeader;
