import { getArtstMusicsAndInfo } from "../_utils/MockData/MockMusicData";
import UserPosts from "../_components/User/UserPosts";
import UserProfileHeader from "../_components/User/UserProfileHeader";
import { getGradient } from "../_utils/getGradient";
import UserProfileCard from "../_components/composables/Card/UserProfileCard";
import {
  getMusicWaveForms,
  getMusicDataFromTitle,
} from "../_utils/MockData/MockMusicData";
import UserPostSongHeader from "../_components/User/UserPostSongHeader";

export default async function ProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const slugName = params.slug[0].replace("%40", "").replace("%20", " ");
  const songTitle = decodeURIComponent(params.slug[1].replace("%40", "@"));
  let musicDataFromTitle;
  let gradientColorFromArtwork;
  let selectedMusicData;

  // 노래 제목까지 그대로 있는 페이지로 접속했을때
  if (songTitle) {
    musicDataFromTitle = getMusicDataFromTitle(slugName, songTitle);

    const { image } = musicDataFromTitle[0];

    selectedMusicData = musicDataFromTitle[0];
    gradientColorFromArtwork = await getGradient(image);
  }

  // 그냥 개인 회원 프로필 페이지만 접속했을때
  const musicData = getArtstMusicsAndInfo(slugName);
  const initialWaveForms = await getMusicWaveForms(slugName);
  const { artistName, avatarImage, artistDescription } =
    musicData[0].artistInfo;
  const gradientColorFromAvatarImage = await getGradient(avatarImage);

  return (
    <>
      {selectedMusicData && gradientColorFromArtwork ? (
        <UserPostSongHeader
          gradientColor={gradientColorFromArtwork}
          selectedMusicData={selectedMusicData}
          musicData={musicData}
        />
      ) : (
        <>
          <UserProfileHeader
            artistName={artistName}
            avatarImage={avatarImage}
            gradientColor={gradientColorFromAvatarImage}
            artistDescription={artistDescription}
          />
          <UserProfileCard>
            <UserPosts
              musicData={musicData}
              initialWaveForms={initialWaveForms}
            />
          </UserProfileCard>
        </>
      )}
    </>
  );
}
