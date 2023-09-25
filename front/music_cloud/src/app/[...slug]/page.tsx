import { getArtstMusicsAndInfo } from "../_utils/MockData/MockMusicData";
import UserPosts from "../_components/User/UserPosts";
import UserProfileHeader from "../_components/User/UserProfileHeader";
import { getGradient } from "../_utils/getGradient";
import UserProfileCard from "../_components/composables/Card/UserProfileCard";
import { getMusicWaveForms } from "../_utils/MockData/MockMusicData";
import { getVolumeCookieValue } from "../_utils/getVolumeCookieValue";

export default async function ProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const slugName = params.slug[0].replace("%40", "").replace("%20", " ");
  const songTitle = params.slug[1];

  const musicData = getArtstMusicsAndInfo(slugName);
  const musicWaveForms = await getMusicWaveForms(slugName);
  const { artistName, avatarImage, artistDescription } =
    musicData[0].artistInfo;
  const gradientColor = await getGradient(avatarImage);
  const volumeValue = getVolumeCookieValue();
  console.log("musicData : ", musicData);

  return (
    <>
      <UserProfileHeader
        artistName={artistName}
        avatarImage={avatarImage}
        gradientColor={gradientColor}
        artistDescription={artistDescription}
      />
      <UserProfileCard>
        <UserPosts
          musicData={musicData}
          musicWaveForms={musicWaveForms}
          volumeValue={volumeValue}
        />
      </UserProfileCard>
    </>
  );
}
