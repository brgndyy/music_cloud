import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  music_player_container,
  player_visible,
  player_info,
  track_image,
  track_info,
  player_buttons,
  player_actions,
  image_and_info,
  track_title,
  track_artist,
  repeat_button,
  prev_button,
  play_button_div,
  play_button,
  next_button,
  shuffle_active,
  shuffle_button,
  volume_icon,
  volume_slider_container,
  volume_slider_rail,
  volume_slider_fill_track,
  volume_input,
  pause_button,
} from "@/app/_styles/music_player.css";
import { myStyle } from "@/app/_styles/vars.css";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { BsRepeat, BsRepeat1, BsShuffle } from "react-icons/bs";
import { ImVolumeMedium, ImVolumeLow, ImVolumeMute } from "react-icons/im";
import ProgressBar from "./ProgressBar";

type MusicPlayerType = {
  visible: boolean;
  image?: string;
  title?: string;
  artist?: string;
  nowPlaying: boolean;
  selectedId?: number;
  playCurrentSongHandler: (currentMusicId?: number) => void;
  pauseCurrentSongHandler: (currentMusicId?: number) => void;
  nextSongPlayHandler: (currentMusicId?: number) => void;
  prevSongPlayHandler: (currentMusicId?: number) => void;
  shuffleActiveHandler: () => void;
  isShuffleActive: boolean;
  volumeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  volume: number;
  currentProgressPercent: number;
  progressDragHandler: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleMouseUp: () => void;
  handleMouseDown: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  progressBarClickHandler: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  currentPlayingTime: number;
  settingRepeatHandler: () => void;
  isRepeatActive: boolean;
};

export default function MusicPlayer({
  visible,
  image,
  title,
  artist,
  nowPlaying,
  selectedId,
  playCurrentSongHandler,
  pauseCurrentSongHandler,
  nextSongPlayHandler,
  prevSongPlayHandler,
  shuffleActiveHandler,
  isShuffleActive,
  volumeHandler,
  volume,
  currentProgressPercent,
  progressDragHandler,
  handleMouseUp,
  handleMouseDown,
  progressBarClickHandler,
  currentPlayingTime,
  settingRepeatHandler,
  isRepeatActive,
}: MusicPlayerType) {
  return (
    <>
      <div
        className={`${music_player_container} ${myStyle} ${
          visible ? player_visible : ""
        }`}
      >
        <ProgressBar
          progressBarClickHandler={progressBarClickHandler}
          currentProgressPercent={currentProgressPercent}
          progressDragHandler={progressDragHandler}
          handleMouseUp={handleMouseUp}
          handleMouseDown={handleMouseDown}
          currentPlayingTime={currentPlayingTime}
        />
        <div className={player_info}>
          <div className={image_and_info}>
            <Image
              src={image ? image : ""}
              alt="tractk_image"
              width={35}
              height={35}
              className={track_image}
            />
            <div className={track_info}>
              <Link href={`/@${artist}/${title}`} className={track_title}>
                {title}
              </Link>
              <Link href={`/@${artist}`} className={track_artist}>
                {artist}
              </Link>
            </div>
          </div>
        </div>
        <div className={player_buttons}>
          {isRepeatActive ? (
            <BsRepeat1
              className={repeat_button}
              onClick={settingRepeatHandler}
            />
          ) : (
            <BsRepeat
              className={repeat_button}
              onClick={settingRepeatHandler}
            />
          )}

          <MdSkipPrevious
            className={prev_button}
            onClick={() => prevSongPlayHandler(selectedId)}
          />
          <div className={play_button_div}>
            {nowPlaying ? (
              <GiPauseButton
                className={pause_button}
                onClick={() => pauseCurrentSongHandler(selectedId)}
              />
            ) : (
              <FaPlay
                className={play_button}
                onClick={() => playCurrentSongHandler(selectedId)}
              />
            )}
          </div>

          <MdSkipNext
            className={next_button}
            onClick={() => nextSongPlayHandler(selectedId)}
          />
          <BsShuffle
            className={`${shuffle_button} ${
              isShuffleActive ? shuffle_active : ""
            }`}
            onClick={shuffleActiveHandler}
          />
        </div>
        <div className={player_actions}>
          <div className={volume_icon}>
            {volume === 0 ? (
              <ImVolumeMute />
            ) : volume < 50 ? (
              <ImVolumeLow />
            ) : (
              <ImVolumeMedium />
            )}
          </div>
          <div className={volume_slider_container}>
            <div className={volume_slider_rail}></div>
            <div
              className={volume_slider_fill_track}
              style={{
                width: `${volume}%`,
              }}
            ></div>

            <input
              type={"range"}
              className={volume_input}
              min={0}
              max={100}
              value={volume}
              onChange={volumeHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
}
