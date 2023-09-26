import { getWaveFormFromServer } from "../audioWaveForm/getWaveFormFromServer";

export const MockMusicData = [
  {
    id: 522,
    title: "THE STORY",
    time: 121,
    tagList: [],
    playCount: 3643,
    likesCount: 182,
    liked: false,
    image: "/test_image.jpeg",
    file: "/music/THE STORY.mp3",
    createdAt: "2023-09-16T09:12:34.440Z",
    updatedAt: "2023-09-16T09:12:34.440Z",
    description: "곡에 대한 설명",
    artistInfo: {
      artistName: "BMTJ",
      artistFollower: 260,
      artistFollowing: 52,
      totalTracks: 152,
      avatarImage: "/test_user_image2.jpeg",
      artistDescription: "유저 한줄 소개",
      socialProfileLinks: {
        instagram: "해당 유저 인스타 아아디",
        twitter: "해당 유저 트위터 아이디",
      },
    },
  },
  {
    id: 56,
    title: "LOOK AT ME NOW",
    time: 152,
    tagList: ["wu tang clan", "brockhampton", "nwa"],
    playCount: 231,
    likesCount: 63,
    liked: true,
    image: "/test_image.jpeg",
    file: "/music/ROSALISA.wav",
    createdAt: "2023-09-13T09:12:34.440Z",
    updatedAt: "2023-09-14T09:12:34.440Z",
    description: "LOOK AT ME NOW 란 곡",
    artistInfo: {
      artistName: "BRGNDY",
      artistFollower: 32,
      artistFollowing: 124,
      totalTracks: 35,
      avatarImage: "/test_user_image1.jpeg",
      artistDescription: "유저 한줄 소개",
      socialProfileLinks: {
        instagram: "해당 유저 인스타 아아디",
        twitter: "해당 유저 트위터 아이디",
      },
    },
  },
  {
    id: 23,
    title: "가나다라마바사아자차카타파하",
    time: 197,
    tagList: ["deb never", "tyler the creator", "kendrick lamar", "A$AP ROCKY"],
    playCount: 87664,
    likesCount: 35783,
    liked: true,
    image: "/test_image.jpeg",
    file: "/music/ROSALISA.wav",
    createdAt: "2023-09-16T09:12:34.440Z",
    updatedAt: "2023-09-16T09:12:34.440Z",
    description: "곡에 대한 설명",
    artistInfo: {
      artistName: "BMTJHGDB NGFHFGD",
      artistFollower: 266570,
      artistFollowing: 527765,
      totalTracks: 5675,
      avatarImage: "/test_user_image1.jpeg",
      artistDescription: "유저 한줄 소개",
      socialProfileLinks: {
        instagram: "해당 유저 인스타 아아디",
        twitter: "해당 유저 트위터 아이디",
      },
    },
  },
  {
    id: 20,
    title: "SUMMER IN DECEMBER",
    time: 197,
    tagList: ["deb", "tyler the creator", "kendrick lamar", "A$AP ROCKY"],
    playCount: 8764,
    likesCount: 1783,
    liked: false,
    image: "/test_image.jpeg",
    file: "/music/SUMMER IN DECEMBER.mp3",
    createdAt: "2020-02-16T09:12:34.440Z",
    updatedAt: "2020-02-16T09:12:34.440Z",
    description: "곡에 대한 설명",
    artistInfo: {
      artistName: "BMTJHGDB NGFHFGD",
      artistFollower: 266570,
      artistFollowing: 9860,
      totalTracks: 5675,
      avatarImage: "/test_user_image1.jpeg",
      artistDescription: "유저 한줄 소개",
      socialProfileLinks: {
        instagram: "해당 유저 인스타 아아디",
        twitter: "해당 유저 트위터 아이디",
      },
    },
  },
  {
    id: 4,
    title: "Fly Away",
    time: 157,
    tagList: ["Mac Miller"],
    playCount: 874,
    likesCount: 3573,
    liked: false,
    image: "/test_image.jpeg",
    file: "/music/Fly Away.mp3",
    createdAt: "2023-09-12T09:12:34.440Z",
    updatedAt: "2023-09-12T09:12:34.440Z",
    description: "곡에 대한 설명",
    artistInfo: {
      artistName: "BMTJHGDBgfdFGD",
      artistFollower: 26670,
      artistFollowing: 524321,
      totalTracks: 575,
      avatarImage: "/test_user_image1.jpeg",
      artistDescription: "유저 한줄 소개",
      socialProfileLinks: {
        instagram: "해당 유저 인스타 아아디",
        twitter: "해당 유저 트위터 아이디",
      },
    },
  },
  {
    id: 53,
    title: "AKIRA",
    time: 120,
    tagList: ["BROCKHAMPTON"],
    playCount: 1274,
    likesCount: 33,
    liked: false,
    image: "/akira_image.jpeg",
    file: "/music/AKIRA.wav",
    createdAt: "2022-03-12T09:12:34.440Z",
    updatedAt: "2022-03-12T09:12:34.440Z",
    description: "곡에 대한 설명",
    artistInfo: {
      artistName: "BFMDKVher grds",
      artistFollower: 5270,
      artistFollowing: 522123,
      totalTracks: 75,
      avatarImage: "/test_user_image1.jpeg",
      artistDescription: "유저 한줄 소개",
      socialProfileLinks: {
        instagram: "해당 유저 인스타 아아디",
        twitter: "해당 유저 트위터 아이디",
      },
    },
  },
  {
    id: 87,
    title: "SUMMER IN DECEMBER",
    time: 120,
    tagList: ["FRANK OCEAN", "DVDSX"],
    playCount: 124,
    likesCount: 5233,
    liked: false,
    image: "/image2.jpeg",
    file: "/music/Summer in December.mp3",
    createdAt: "2021-08-13T09:12:34.440Z",
    updatedAt: "2021-08-13T09:12:34.440Z",
    description: "곡에 대한 설명",
    artistInfo: {
      artistName: "Bs",
      artistFollower: 520,
      artistFollowing: 542342,
      totalTracks: 757,
      avatarImage: "/test_user_image1.jpeg",
      artistDescription: "유저 한줄 소개",
      socialProfileLinks: {
        instagram: "해당 유저 인스타 아아디",
        twitter: "해당 유저 트위터 아이디",
      },
    },
  },
  {
    id: 512,
    title: "BEGINNING",
    time: 121,
    tagList: ["HI"],
    playCount: 343,
    likesCount: 1822,
    liked: false,
    image: "/test_image.jpeg",
    file: "/music/THE STORY.mp3",
    createdAt: "2023-09-16T09:12:34.440Z",
    updatedAt: "2023-09-16T09:12:34.440Z",
    description: "곡에 대한 설명",
    artistInfo: {
      artistName: "BMTfdJ",
      artistFollower: 260,
      artistFollowing: 5745652,
      totalTracks: 152,
      avatarImage: "/test_user_image1.jpeg",
      artistDescription: "유저 한줄 소개",
      socialProfileLinks: {
        instagram: "해당 유저 인스타 아아디",
        twitter: "해당 유저 트위터 아이디",
      },
    },
  },
  {
    id: 526,
    title: "LOOK AT ME NOW",
    time: 152,
    tagList: ["wu tang clan", "brockhampton", "nwa"],
    playCount: 231,
    likesCount: 63,
    liked: true,
    image: "/test_image.jpeg",
    file: "/music/ROSALISA.wav",
    createdAt: "2023-09-13T09:12:34.440Z",
    updatedAt: "2023-09-14T09:12:34.440Z",
    description: "LOOK AT ME NOW 란 곡",
    artistInfo: {
      artistName: "BRGNDY",
      artistFollower: 32,
      artistFollowing: 5542342,
      totalTracks: 35,
      avatarImage: "/test_user_image1.jpeg",
      artistDescription: "유저 한줄 소개",
      socialProfileLinks: {
        instagram: "해당 유저 인스타 아아디",
        twitter: "해당 유저 트위터 아이디",
      },
    },
  },
  {
    id: 623,
    title: "가나다라마바사아자차카타파하",
    time: 197,
    tagList: ["deb never", "tyler the creator", "kendrick lamar", "A$AP ROCKY"],
    playCount: 87664,
    likesCount: 35783,
    liked: true,
    image: "/test_image.jpeg",
    file: "/music/THE STORY.mp3",
    createdAt: "2023-09-16T09:12:34.440Z",
    updatedAt: "2023-09-16T09:12:34.440Z",
    description: "곡에 대한 설명",
    artistInfo: {
      artistName: "BMTJHGDB NGFHFGD",
      artistFollower: 266570,
      artistFollowing: 523213,
      totalTracks: 5675,
      avatarImage: "/test_user_image1.jpeg",
      artistDescription: "유저 한줄 소개",
      socialProfileLinks: {
        instagram: "해당 유저 인스타 아아디",
        twitter: "해당 유저 트위터 아이디",
      },
    },
  },
  {
    id: 42,
    title: "Fly Away",
    time: 157,
    tagList: ["Mac Miller"],
    playCount: 874,
    likesCount: 3573,
    liked: false,
    image: "/test_image.jpeg",
    file: "/music/Fly Away.mp3",
    createdAt: "2023-09-12T09:12:34.440Z",
    updatedAt: "2023-09-12T09:12:34.440Z",
    description: "곡에 대한 설명",
    artistInfo: {
      artistName: "BMTJHGDBgfdFGD",
      artistFollower: 26670,
      artistFollowing: 9872,
      totalTracks: 575,
      avatarImage: "/test_user_image1.jpeg",
      artistDescription: "유저 한줄 소개",
      socialProfileLinks: {
        instagram: "해당 유저 인스타 아아디",
        twitter: "해당 유저 트위터 아이디",
      },
    },
  },
  {
    id: 513,
    title: "AKIRA",
    time: 120,
    tagList: ["BROCKHAMPTON"],
    playCount: 1274,
    likesCount: 33,
    liked: false,
    image: "/akira_image.jpeg",
    file: "/music/AKIRA.wav",
    createdAt: "2022-03-12T09:12:34.440Z",
    updatedAt: "2022-03-12T09:12:34.440Z",
    description: "곡에 대한 설명",
    artistInfo: {
      artistName: "BFMDKVher grds",
      artistFollower: 5270,
      artistFollowing: 1252,
      totalTracks: 75,
      avatarImage: "/test_user_image1.jpeg",
      artistDescription: "유저 한줄 소개",
      socialProfileLinks: {
        instagram: "해당 유저 인스타 아아디",
        twitter: "해당 유저 트위터 아이디",
      },
    },
  },
  {
    id: 647,
    title: "SUMMER IN DECEMBER",
    time: 120,
    tagList: ["FRANK OCEAN", "DVDSX"],
    playCount: 124,
    likesCount: 5233,
    liked: false,
    image: "/image2.jpeg",
    file: "/music/Summer in December.mp3",
    createdAt: "2021-08-13T09:12:34.440Z",
    updatedAt: "2021-08-13T09:12:34.440Z",
    description: "곡에 대한 설명",
    artistInfo: {
      artistName: "Bs",
      artistFollower: 520,
      artistFollowing: 5452,
      totalTracks: 757,
      avatarImage: "/test_user_image1.jpeg",
      artistDescription: "유저 한줄 소개",
      socialProfileLinks: {
        instagram: "해당 유저 인스타 아아디",
        twitter: "해당 유저 트위터 아이디",
      },
    },
  },
];

export const getTrendMusicPosts = async () => {
  return MockMusicData;
};

export const getArtstMusicsAndInfo = (artistName: string) => {
  const totalData = MockMusicData.filter(
    (artist) => artist.artistInfo.artistName === artistName
  );

  return totalData;
};

export const getMusicWaveForms = async (artistName: string) => {
  const totalData = MockMusicData.filter(
    (artist) => artist.artistInfo.artistName === artistName
  );

  const musicWaveForms = await Promise.all(
    totalData.map(async (data) => {
      return await getWaveFormFromServer(data.file);
    })
  );

  return musicWaveForms;
};

export const getMusicDataFromTitle = (artistName: string, title: string) => {
  console.log("artistName : ", artistName);
  console.log("title : ", title);
  const totalData = MockMusicData.filter(
    (artist) =>
      artist.artistInfo.artistName === artistName && artist.title === title
  );

  return totalData;
};
// 메인 곡들 관련
// url/songs => 모든 곡들 get // 좋아요 많은수의 섹션, 최신 섹션 별로 GET 요청

// - 각 아티스트 관련 api
// url/:aritst/:songname => 해당 회원이 올린 프로필의 음악 게시글 GET
// url/:aritst/:songname => 해당 회원이 곡 올리기 POST
// url/:aritst/:songname => 해당 회원이 곡 정보 수정 PUT
// url/:aritst/:songame => 해당 업로드했던 곡 삭제
// url/:artist => 해당 회원 프로필 페이지  GET
// url/:artist/likes=> 해당 회원이 좋아요 해놓은 게시글 목록 GET
// url/:artist/follwing=> 해당 회원이 팔로우 하고 있는 회원들 목록 GET
// url/:artist/follwers => 해당 회원을 팔로우 하고 있는 회원들 목록 GET
// url/tags/:tag => 해당 태그에 관련된 게시글들 다 가져오기

// - 댓글 관련 api
// url/:artist/:songname/comments => 해당 곡의 댓글들 GET
// url/:artist/:songname/comments => 해당 곡에 댓글 남기기 POST
// url/:artist/:songname/comments/:id => 해당 곡에 남겼던 댓글 삭제 DELETE
// url/:artist/:songname/comments/:id => 해당 곡에 남겼던 댓글 수정 PUT

// -메세지 관련 api

// 1. 임시저장 기능
