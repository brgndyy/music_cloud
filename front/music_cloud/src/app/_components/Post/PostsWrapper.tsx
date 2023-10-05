import PostList from "./PostList";
import { post_wrapper } from "@/app/_styles/music_post.css";

type ArtistInfoType = {
  artistName: string;
  artistFollower: number;
  artistFollowing: number;
  totalTracks: number;
  avatarImage: string;
  socialProfileLinks: {
    instagram?: string;
    twitter?: string;
  };
};

type MusicPostItemType = {
  id: number;
  title: string;
  time: number;
  tagList: string[];
  playCount: number;
  likesCount: number;
  liked: boolean;
  image: string;
  file: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  artistInfo: ArtistInfoType;
};

type MusicPostListType = {
  musicData: MusicPostItemType[];
};

export default function PostsWrapper({ musicData }: MusicPostListType) {
  return (
    <>
      <div className={post_wrapper}>
        <div>트렌딩 이나 최신 섹션 고를수 있는 부분</div>
        <PostList musicData={musicData} />
      </div>
    </>
  );
}
