import React from "react";
import { useRef, useEffect } from "react";
import {
  user_post_canvas_container,
  user_post_initial_canvas,
  user_post_canvas,
  user_post_canvas_card,
} from "@/app/_styles/music_post.css";
import { RefObject } from "react";

import { MusicPostItemType } from "@/app/_utils/_types/types";
import { useState } from "react";

type UserPostITemWaveFormType = {
  initialWaveForm: Float32Array | null;
  clickCanvasProgressBarHandler: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
  canvasRef: RefObject<HTMLCanvasElement> | null;
  music: MusicPostItemType;
  waveform: Float32Array | null;
  isPlaying: boolean;
  audioFile: HTMLAudioElement | null;
};

export default function UserPostItemWaveForm({
  initialWaveForm,
  clickCanvasProgressBarHandler,
  music,
  waveform,
  isPlaying,
  audioFile,
}: UserPostITemWaveFormType) {
  const initialCanvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  const drawInitialForm = (
    canvasCtx: CanvasRenderingContext2D | null,
    waveform: Float32Array | null,
    canvasWidth: number,
    canvasHeight: number,
    currentTimePercent: number // <- 여기에 새 매개변수를 추가합니다.
  ) => {
    if (waveform && canvasCtx) {
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      const barWidth = 3;
      const gap = 3;
      let x = 0;

      const maxAmplitude = Math.max(...waveform);
      const baseHeight = canvasHeight / 2;

      const currentX = currentTimePercent * canvasWidth; // 현재 재생 위치를 계산

      for (let i = 0; i < waveform.length; i++) {
        const variation = baseHeight * (waveform[i] / maxAmplitude);
        const barHeight = baseHeight + variation;
        const topBarStartY = (canvasHeight - barHeight) / 2;

        if (x < currentX) {
          canvasCtx.fillStyle = "rgb(0, 128, 255)"; // 재생된 부분의 색상 (예: 파란색)
        } else {
          canvasCtx.fillStyle = "rgb(92, 92, 92)"; // 아직 재생되지 않은 부분의 색상
        }

        canvasCtx.fillRect(x, topBarStartY, barWidth, barHeight);
        x += barWidth + gap;
      }
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행됩니다.
    if (initialCanvasRef.current && initialCanvasRef.current.parentElement) {
      const canvas = initialCanvasRef.current;
      const WIDTH = initialCanvasRef.current.parentElement.clientWidth;
      const HEIGHT = initialCanvasRef.current.parentElement.clientHeight;
      const canvasCtx = canvas.getContext("2d");
      // 초기에는 currentTimePercent가 0입니다.
      drawInitialForm(canvasCtx, initialWaveForm, WIDTH, HEIGHT, 0);
    }
  }, [initialWaveForm]);

  useEffect(() => {
    if (audioFile && audioFile instanceof HTMLAudioElement) {
      console.log(audioFile); // audioFile 객체 확인
      console.log("audioFile.duration : ", audioFile.duration);

      const handleTimeUpdate = () => {
        if (canvasRef.current && canvasRef.current.parentElement) {
          const canvas = canvasRef.current;
          const WIDTH = canvasRef.current.parentElement.clientWidth;
          const HEIGHT = canvasRef.current.parentElement.clientHeight;
          const canvasCtx = canvas.getContext("2d");
          const currentTimePercent = audioFile.currentTime / audioFile.duration;
          console.log("currentTimePercent : ", currentTimePercent);
          // 노래가 재생될 때마다 색상이 덧입혀집니다.
          drawInitialForm(
            canvasCtx,
            initialWaveForm,
            WIDTH,
            HEIGHT,
            currentTimePercent
          );
        }
      };

      audioFile.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audioFile.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [audioFile, initialWaveForm]);

  useEffect(() => {
    if (audioFile && isPlaying) {
      console.log("audioFile is set:", audioFile); // 인스턴스 확인
      audioFile.play(); // 선택된 곡에 대한 Audio 재생

      const handleTimeUpdate = () => {
        console.log("timeupdate event fired"); // 이벤트 리스너 체크
        // ...
      };

      audioFile.addEventListener("timeupdate", handleTimeUpdate);
      console.log("Event listener added"); // 이벤트 리스너 체크

      return () =>
        audioFile.removeEventListener("timeupdate", handleTimeUpdate);
    } else if (audioFile) {
      audioFile.pause(); // 선택되지 않은 다른 곡에 대한 Audio 일시정지
    }
  }, [audioFile, isPlaying]);

  // useEffect(() => {
  //   if (!isPlaying && canvasRef.current) {
  //     const canvas = canvasRef.current;
  //     const canvasCtx = canvas.getContext("2d");
  //     if (canvasCtx) {
  //       const canvasCtx = canvas.getContext("2d");
  //       const WIDTH = canvas.width;
  //       const HEIGHT = canvas.height;
  //       drawInitialForm(canvasCtx, initialWaveForm, WIDTH, HEIGHT);
  //     }
  //   }
  // }, [isPlaying, music.id]);

  return (
    <>
      <div className={user_post_canvas_card}>
        <div className={user_post_canvas_container}>
          <canvas
            onClick={clickCanvasProgressBarHandler}
            ref={initialCanvasRef}
            width={800}
            height={60}
            className={user_post_initial_canvas}
          ></canvas>
          <canvas
            onClick={clickCanvasProgressBarHandler}
            ref={canvasRef}
            width={800}
            height={60}
            className={user_post_initial_canvas}
          ></canvas>
        </div>
      </div>
    </>
  );
}
