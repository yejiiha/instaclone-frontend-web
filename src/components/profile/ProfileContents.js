import ProfileHeader from "./ProfileHeader";
import ProfileMenu from "./ProfileMenu";

function ProfileContents({
  avatar,
  username,
  totalFollowers,
  totalFollowing,
  firstName,
  lastName,
  bio,
  photos,
  isMe,
  isFollowing,
}) {
  return (
    <div>
      <ProfileHeader
        avatar={avatar}
        username={username}
        totalFollowers={totalFollowers}
        totalFollowing={totalFollowing}
        firstName={firstName}
        lastName={lastName}
        bio={bio}
      />
      <ProfileMenu photos={photos} />
    </div>
  );
}

export default ProfileContents;
