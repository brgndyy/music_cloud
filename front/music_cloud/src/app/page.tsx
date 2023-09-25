import Banner from "./_components/composables/Banner/Banner";
import { getTrendMusicPosts } from "./_utils/MockData/MockMusicData";
import PostsWrapper from "./_components/Post/PostsWrapper";
import { getVolumeCookieValue } from "./_utils/getVolumeCookieValue";

export default async function Home() {
  const musicData = await getTrendMusicPosts();
  const volumeValue = getVolumeCookieValue();

  return (
    <>
      <Banner />
      <PostsWrapper musicData={musicData} volumeValue={volumeValue} />
    </>
  );
}
