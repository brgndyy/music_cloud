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
  pause_button,
  user_post_play_button_div,
} from "@/app/_styles/music_player.css";
import { RefObject } from "react";
import { myStyle } from "@/app/_styles/vars.css";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import UserPostItemWaveForm from "../WaveForm/UserPostItemWaveForm";
import { MusicPostItemType } from "@/app/_utils/_types/types";
import { GiPauseButton } from "react-icons/gi";
import { useEffect, useState } from "react";

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
  canvasRef: RefObject<HTMLCanvasElement> | null;
  waveform: Float32Array | null;
  src: string;
};

export default function UserPostItem({
  music,
  initialWaveForm,
  selectSongHandler,
  nowPlaying,
  pauseCurrentSongHandler,
  clickCanvasProgressBarHandler,
  isPlaying,
  canvasRef,
  waveform,
  src,
}: UserPostItemType) {
  const { artistName } = music.artistInfo;
  const { id, image, playCount, liked, title, file, createdAt, likesCount } =
    music;

  const [audioFile, setAudioFile] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // window 객체가 존재하면 브라우저 환경으로 판단
    if (typeof window !== "undefined") {
      const newAudioFile = new Audio(src); // const로 선언
      setAudioFile(newAudioFile);
    }

    // 컴포넌트가 언마운트될 때 오디오 객체를 정리
    return () => {
      if (audioFile) {
        audioFile.pause();
        setAudioFile(null);
      }
    };
  }, [src]); // 의존성 배열에서 audioFile 제거

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
            <div className={song_title}>{title}</div>
          </div>
          <div className={created_at_and_likes_container}>
            <div className={created_at}>{createdAt}</div>
            <div className={likes}>{likesCount}</div>
          </div>
        </div>
        <UserPostItemWaveForm
          music={music}
          initialWaveForm={initialWaveForm}
          canvasRef={canvasRef}
          isPlaying={isPlaying}
          clickCanvasProgressBarHandler={clickCanvasProgressBarHandler}
          waveform={waveform}
          audioFile={audioFile}
        />
      </div>
    </div>
  );
}
