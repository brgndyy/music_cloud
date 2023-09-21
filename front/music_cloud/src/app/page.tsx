import Banner from "./_components/composables/Banner/Banner";
import { getTrendMusicPosts } from "./_utils/MockData/MockMusicData";
import PostList from "./_components/Post/PostList";
import PostsWrapper from "./_components/Post/PostsWrapper";
import { cookies } from "next/headers";

export default async function Home() {
  const musicData = await getTrendMusicPosts();
  const cookiesStore = cookies();
  const volumeValue = Number(cookiesStore.get("volume")?.value) || 100;

  return (
    <>
      <Banner />
      <PostsWrapper musicData={musicData} volumeValue={volumeValue} />
    </>
  );
}
