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
  const slugName = params.slug[0]
    ? params.slug[0].replace("%40", "").replace("%20", " ")
    : "";
  const songTitle = params.slug[1]
    ? decodeURIComponent(params.slug[1].replace("%40", "@"))
    : "";

  let musicDataFromTitle;
  let gradientColorFromArtwork;
  let selectedMusicData;

  if (songTitle) {
    musicDataFromTitle = getMusicDataFromTitle(slugName, songTitle);

    if (musicDataFromTitle && musicDataFromTitle[0]) {
      const { image } = musicDataFromTitle[0];

      selectedMusicData = musicDataFromTitle[0];
      gradientColorFromArtwork = await getGradient(image);
    }
  }

  const musicData = getArtstMusicsAndInfo(slugName);
  const initialWaveForms = await getMusicWaveForms(slugName);

  if (!musicData || !musicData[0] || !musicData[0].artistInfo) return null; // or some error handling logic

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
