import ProfileHeader from "./ProfileHeader";
import ProfileMenu from "./ProfileMenu";

function ProfileContents({
  seeProfile,
  avatar,
  username,
  totalFollowers,
  totalFollowing,
  totalPhotos,
  firstName,
  lastName,
  bio,
  photos,
  isMe,
  isFollowing,
  unfollowUser,
  followUser,
}) {
  return (
    <div>
      <ProfileHeader
        seeProfile={seeProfile}
        avatar={avatar}
        username={username}
        totalFollowers={totalFollowers}
        totalFollowing={totalFollowing}
        totalPhotos={totalPhotos}
        firstName={firstName}
        lastName={lastName}
        bio={bio}
        unfollowUser={unfollowUser}
        followUser={followUser}
      />
      <ProfileMenu photos={photos} />
    </div>
  );
}

export default ProfileContents;
