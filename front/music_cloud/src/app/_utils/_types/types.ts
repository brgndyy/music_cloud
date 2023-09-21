export type ArtistInfoType = {
  artistName: string;
  artistFollower: number;
  totalTracks: number;
  avatarImage: string;
  socialProfileLinks: {
    instagram?: string;
    twitter?: string;
  };
};

export type MusicPostItemType = {
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

export type MusicPostListType = {
  musicData: MusicPostItemType[];
};
