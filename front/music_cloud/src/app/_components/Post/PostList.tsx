"use client";
import PostItem from "./PostItem";
import {
  music_posts_ul_container,
  canvas_container,
} from "@/app/_styles/music_post.css";
import { useState, useEffect, useCallback, useRef, RefObject } from "react";
import MusicPlayer from "../Music/MusicPlayer";
import { MusicPostItemType } from "@/app/_utils/_types/types";
import HeadingPost from "./HeadingPost";
import WaveFormCanvas from "../WaveForm/WaveFormCanvas";
import { useMusicPlayer } from "@/app/_libs/hooks/useMusicPlayer";

type PostListType = {
  musicData: MusicPostItemType[];
};

export default function PostList({ musicData }: PostListType) {
  const {
    nowPlaying,
    audioFile,
    playerVisible,
    selectedMusic,
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
    clickProgressBarHandler,
    currentPlayingTime,
    settingRepeatHandler,
    setCurrentProgressPercent,
    setCurrentPlayingTime,
    setPlayerVisible,
    setNowPlaying,
    setNewAudioFile,
    isRepeatActive,
  } = useMusicPlayer({ musicData });

  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);
  const [waveform, setWaveform] = useState<Float32Array | null>(null);

  const drawWaveForm = (
    canvasCtx: CanvasRenderingContext2D | null,
    waveform: Float32Array | null, //
    canvasWidth: number, // 캔버스 넓이
    canvasHeight: number, // 캔버스 높이
    barWidth: number, // 막대 넓이
    gap: number, // 막대 사이 간격
    baseHeightRatio: number, // 막대 기본 높이
    variability: number, // 막대 높낮이 차이
    currentTimePercent: number // 현재 재생 위치의 퍼센트
  ) => {
    if (waveform && canvasCtx) {
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      let x = 0;

      const baseHeight = canvasHeight * baseHeightRatio;
      const maxAmplitude = Math.max(...waveform);

      const currentX = currentTimePercent * canvasWidth; // 현재 재생 범위

      for (let i = 0; i < waveform.length; i++) {
        const variation =
          baseHeight * variability * (waveform[i] / maxAmplitude);
        const barHeight = baseHeight + variation;
        const topBarStartY = canvasHeight / 2 - barHeight;

        // 현재 재생 위치보다 왼쪽에 있는 막대의 색상을 변경
        if (x < currentX) {
          canvasCtx.fillStyle = "rgb(0, 128, 255)"; // 재생된 부분의 색상 (예: 파란색)
        } else {
          canvasCtx.fillStyle = "rgb(92, 92, 92)"; // 아직 재생되지 않은 부분의 색상
        }

        canvasCtx.fillRect(x, topBarStartY, barWidth, barHeight);
        canvasCtx.fillStyle =
          x < currentX ? "rgba(0, 128, 255, 0.7)" : "rgba(92, 92, 92, 0.7)"; // 아래쪽 대칭 부분의 투명도 조절
        canvasCtx.fillRect(x, canvasHeight / 2, barWidth, barHeight * 0.5);

        x += barWidth + gap;
      }
    }
  };

  const initializeWaveForm = async (fileUrl: string, samples: number) => {
    try {
      const audioContext = new AudioContext();
      const res = await fetch(`${fileUrl}`);

      const data = await res.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(data);

      const leftChannel = audioBuffer.getChannelData(0);
      const rightChannel =
        audioBuffer.numberOfChannels > 1
          ? audioBuffer.getChannelData(1)
          : leftChannel;

      // const samples = 200; // 원하는 샘플 수 많아질수록 오디오 막대들이 빽빽해짐
      const blockSize = Math.floor(leftChannel.length / samples);
      let waveform = new Float32Array(samples);

      for (let i = 0; i < samples; i++) {
        let blockStart = i * blockSize;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum +=
            (leftChannel[blockStart + j] + rightChannel[blockStart + j]) / 2;
        }
        waveform[i] = sum / blockSize;
      }

      return waveform;
    } catch (err) {
      console.error("WaveForm 생성 중 오류가 발생했어요 ! ", err);
      return null;
    }
  };

  useEffect(() => {
    if (audioFile) {
      // 쿠키에 있던 볼륨 값 들고와서 오디오 자체 볼륨 설정해주기
      const normalizedVolume = volume / 100;
      audioFile.volume = normalizedVolume;

      // 오디오 파일의 재생 시간이 변경될 때마다 호출될 핸들러
      const handleTimeUpdate = () => {
        const currentTimeInSeconds = Math.floor(audioFile.currentTime);

        const percent = (audioFile.currentTime / audioFile.duration) * 100;
        setCurrentProgressPercent(percent);
        setCurrentPlayingTime(currentTimeInSeconds);

        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const canvasCtx = canvas.getContext("2d");
          const WIDTH = canvas.width;
          const HEIGHT = canvas.height;
          const currentTimePercent = audioFile.currentTime / audioFile.duration;

          drawWaveForm(
            canvasCtx,
            waveform,
            WIDTH,
            HEIGHT,
            5,
            5,
            0.2,
            0.4,
            currentTimePercent
          );
        }
      };

      const handleAudioEnded = () => {
        if (isRepeatActive) {
          // 현재 노래를 처음부터 다시 재생
          if (audioFile) {
            audioFile.currentTime = 0; // 노래의 현재 시간을 0초로 설정
            audioFile.play(); // 노래 재생
          }
        } else {
          // 다음 노래로 넘어감
          if (selectedMusic) {
            nextSongPlayHandler(selectedMusic.id);
          }
        }
      };

      audioFile.addEventListener("timeupdate", handleTimeUpdate);
      audioFile.addEventListener("ended", handleAudioEnded);

      // useEffect의 정리 함수에서 이벤트 리스너를 제거
      return () => {
        audioFile.removeEventListener("timeupdate", handleTimeUpdate);
        audioFile.removeEventListener("ended", handleAudioEnded);
      };
    }
  }, [
    audioFile,
    selectedMusic,
    nextSongPlayHandler,
    volume,
    isRepeatActive,
    waveform,
    setCurrentPlayingTime,
    setCurrentProgressPercent,
  ]);

  // 첫 렌더링시 그려주기

  useEffect(() => {
    const drawInitialWaveForm = async () => {
      const firstMusicData = musicData[0];

      const initializedWaveForm = await initializeWaveForm(
        firstMusicData.file,
        200
      );

      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext("2d");
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        drawWaveForm(
          canvasCtx,
          initializedWaveForm,
          WIDTH,
          HEIGHT,
          5,
          5,
          0.2,
          0.4,
          0
        );
      }
    };

    drawInitialWaveForm();
  }, [audioFile, musicData]);

  const selectSongHandler = async (music: MusicPostItemType) => {
    setPlayerVisible(true);

    const initializedWaveForm = await initializeWaveForm(music.file, 200);

    setWaveform(initializedWaveForm);

    if (selectedMusic && selectedMusic.id === music.id) {
      // 같은 노래를 클릭한 경우 일시정지
      setNowPlaying(!nowPlaying);
    } else {
      await setNewAudioFile(music);
    }
  };

  return (
    <>
      <WaveFormCanvas
        canvasRef={canvasRef}
        clickCanvasProgressBarHandler={clickProgressBarHandler}
      />

      <HeadingPost />
      <ul className={music_posts_ul_container}>
        {musicData.map((music) => {
          return (
            <PostItem
              key={music.id}
              selectSongHandler={selectSongHandler}
              music={music}
            />
          );
        })}
      </ul>
      <MusicPlayer
        nowPlaying={nowPlaying}
        visible={playerVisible}
        selectedId={selectedMusic?.id}
        image={selectedMusic?.image}
        title={selectedMusic?.title}
        artist={selectedMusic?.artistInfo.artistName}
        playCurrentSongHandler={playCurrentSongHandler}
        pauseCurrentSongHandler={pauseCurrentSongHandler}
        nextSongPlayHandler={nextSongPlayHandler}
        prevSongPlayHandler={prevSongPlayHandler}
        shuffleActiveHandler={shuffleActiveHandler}
        isShuffleActive={isShuffleActive}
        volumeHandler={volumeHandler}
        volume={volume}
        currentProgressPercent={currentProgressPercent}
        progressDragHandler={progressDragHandler}
        handleMouseUp={handleMouseUp}
        handleMouseDown={handleMouseDown}
        progressBarClickHandler={clickProgressBarHandler}
        currentPlayingTime={currentPlayingTime}
        settingRepeatHandler={settingRepeatHandler}
        isRepeatActive={isRepeatActive}
      />
    </>
  );
}
