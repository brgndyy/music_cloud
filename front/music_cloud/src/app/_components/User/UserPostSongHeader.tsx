"use client";

import { MusicPostItemType } from "@/app/_utils/_types/types";
import {
  post_song_header_container,
  music_info_container,
  play_icon,
  artwork_image_container,
  artwork_image,
} from "@/app/_styles/user_post_song_header.css";
import {
  user_post_play_button_div,
  play_button,
} from "@/app/_styles/music_player.css";
import { myStyle } from "@/app/_styles/vars.css";

import Image from "next/image";
import { FaPlay } from "react-icons/fa";

type UserPostSongHeaderType = {
  gradientColor: string;
  musicData: MusicPostItemType;
};

export default function UserPostSongHeader({
  gradientColor,
  musicData,
}: UserPostSongHeaderType) {
  const { id, image, title, createdAt, file, likesCount, playCount, tagList } =
    musicData;
  return (
    <div
      className={post_song_header_container}
      style={{
        background: gradientColor,
      }}
    >
      <div className={music_info_container}>
        <div className={`${user_post_play_button_div} ${myStyle}`}>
          <FaPlay className={play_button} />
        </div>
      </div>
      <div className={artwork_image_container}>
        <Image
          src={image}
          width={250}
          height={250}
          alt="artwork"
          className={artwork_image}
        />
      </div>
    </div>
  );
}
