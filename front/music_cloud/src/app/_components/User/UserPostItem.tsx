"use client";
import {
  user_post_item_container,
  artwork_container,
  artwork_image,
  info_and_canvas_wrapper,
  song_info_container,
  artistName_and_title_container,
  artist_name,
  song_title,
  created_at_and_likes_container,
  created_at,
  likes,
} from "@/app/_styles/user_posts.css";
import {
  play_button,
  user_post_play_button_div,
} from "@/app/_styles/music_player.css";
import { myStyle } from "@/app/_styles/vars.css";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import UserPostItemWaveForm from "../WaveForm/UserPostItemWaveForm";

type UserPostItemType = {
  artistName: string;
  artwork: string;
  playCount: number;
  liked: boolean;
  title: string;
  file: string;
  createdAt: string;
  likesCount: number;
  waveForm: Float32Array;
};

export default function UserPostItem({
  artistName,
  artwork,
  playCount,
  liked,
  title,
  file,
  createdAt,
  likesCount,
  waveForm,
}: UserPostItemType) {
  return (
    <div className={user_post_item_container}>
      <div className={artwork_container}>
        <Image
          src={artwork}
          width={150}
          height={150}
          alt="artwork"
          className={artwork_image}
        />
      </div>
      <div className={info_and_canvas_wrapper}>
        <div className={song_info_container}>
          <div className={`${user_post_play_button_div} ${myStyle}`}>
            {/* <GiPauseButton
                className={pause_button}
                onClick={pauseCurrentSongHandler}
              /> */}

            <FaPlay className={play_button} />
          </div>
          <div className={artistName_and_title_container}>
            <div className={artist_name}>{artistName}</div>
            <div className={song_title}>{title}</div>
          </div>
          <div className={created_at_and_likes_container}>
            <div className={created_at}>{createdAt}</div>
            <div className={likes}>{likesCount}</div>
          </div>
        </div>
        <UserPostItemWaveForm waveForm={waveForm} />
      </div>
    </div>
  );
}
