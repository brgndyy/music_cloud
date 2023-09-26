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
  playCount_and_comment_container,
  playCountNum,
  comment,
  play_icon,
  comment_icon,
} from "@/app/_styles/user_posts.css";
import {
  play_button,
  pause_button,
  user_post_play_button_div,
} from "@/app/_styles/music_player.css";
import { RefObject, useRef } from "react";
import { myStyle } from "@/app/_styles/vars.css";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import UserPostItemWaveForm from "../WaveForm/UserPostItemWaveForm";
import { MusicPostItemType } from "@/app/_utils/_types/types";
import { GiPauseButton } from "react-icons/gi";
import { useEffect, useState } from "react";
import { getFormattedDate } from "@/app/_utils/getFormattedDate";
import Link from "next/link";
import {BiSolidComment} from 'react-icons/bi'

type UserPostItemType = {
  initialWaveForm: Float32Array;
  music: MusicPostItemType;
  selectSongHandler: (music: MusicPostItemType) => void;
  nowPlaying: boolean;
  pauseCurrentSongHandler: (musicId?: number) => void;
  clickCanvasProgressBarHandler: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
  isPlaying: boolean;
  waveform: Float32Array | null;
  src: string;
  registerCanvasRef: (id: number, ref: HTMLCanvasElement) => void;
  dataId: number;
};

export default function UserPostItem({
  music,
  initialWaveForm,
  selectSongHandler,
  nowPlaying,
  pauseCurrentSongHandler,
  clickCanvasProgressBarHandler,
  isPlaying,
  dataId,
  waveform,
  src,
  registerCanvasRef,
}: UserPostItemType) {
  const { artistName } = music.artistInfo;
  const { id, image, playCount, liked, title, file, createdAt, likesCount } =
    music;
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      registerCanvasRef(music.id, canvasRef.current);
    }
  }, [registerCanvasRef, music.id]);

  const formattedDate = getFormattedDate(createdAt);

  return (
    <div className={user_post_item_container}>
      <div className={artwork_container}>
        <Image
          src={image}
          width={150}
          height={150}
          alt="artwork"
          className={artwork_image}
        />
      </div>
      <div className={info_and_canvas_wrapper}>
        <div className={song_info_container}>
          <div className={`${user_post_play_button_div} ${myStyle}`}>
            {nowPlaying && isPlaying ? (
              <GiPauseButton
                className={pause_button}
                onClick={() => pauseCurrentSongHandler(id)}
              />
            ) : (
              <FaPlay
                className={play_button}
                onClick={() => selectSongHandler(music)}
              />
            )}
          </div>
          <div className={artistName_and_title_container}>
            <div className={artist_name}>{artistName}</div>
            <Link
              href={`/@${artistName}/${title}`}
              className={`${song_title} ${myStyle}`}
            >
              {title}
            </Link>
          </div>
          <div className={created_at_and_likes_container}>
            <div className={`${created_at} ${myStyle}`}>{formattedDate}</div>
            <div className={`${likes} ${myStyle}`}>{likesCount}</div>
          </div>
        </div>
        <UserPostItemWaveForm
          music={music}
          initialWaveForm={initialWaveForm}
          isPlaying={isPlaying}
          clickCanvasProgressBarHandler={clickCanvasProgressBarHandler}
          waveform={waveform}
          canvasRef={canvasRef}
          dataId={dataId}
        />
        <div className={`${playCount_and_comment_container} ${myStyle}`}>
          <div className = {playCountNum}>
          <FaPlay className ={play_icon} /> {playCount}
            </div>
              <div className={comment}>
                <BiSolidComment className = {comment_icon}/>
                10
              </div>
        </div>
      </div>
    </div>
  );
}
