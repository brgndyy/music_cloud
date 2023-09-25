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
  canvasRef: React.RefObject<HTMLCanvasElement>;
  music: MusicPostItemType;
  waveform: Float32Array | null;
  isPlaying: boolean;
  audioFile: HTMLAudioElement | null;
  dataId: number;
};

export default function UserPostItemWaveForm({
  initialWaveForm,
  clickCanvasProgressBarHandler,
  music,
  waveform,
  isPlaying,
  audioFile,
  canvasRef,
  dataId,
}: UserPostITemWaveFormType) {
  const initialCanvasRef: RefObject<HTMLCanvasElement> =
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

  // useEffect(() => {
  //   // 컴포넌트가 마운트될 때 한 번만 실행됩니다.
  //   if (initialCanvasRef.current && initialCanvasRef.current.parentElement) {
  //     const canvas = initialCanvasRef.current;
  //     const WIDTH = initialCanvasRef.current.parentElement.clientWidth;
  //     const HEIGHT = initialCanvasRef.current.parentElement.clientHeight;
  //     const canvasCtx = canvas.getContext("2d");
  //     // 초기에는 currentTimePercent가 0입니다.
  //     drawInitialForm(canvasCtx, initialWaveForm, WIDTH, HEIGHT, 0);
  //   }
  // }, [initialWaveForm]);

  // 초기 렌더링때 캔버스 넓이 설정해주기
  // useEffect(() => {
  //   if (canvasRef.current) {
  //     canvasRef.current.width = canvasRef.current.offsetWidth;
  //   }
  // }, [canvasRef]);

  // // 브라우저 넓이 바뀔때마다 캔버스 사이즈 조절 해주기
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (canvasRef.current && canvasRef.current.parentElement) {
  //       const parent = canvasRef.current.parentElement;
  //       console.log(parent.clientWidth);
  //       canvasRef.current.width = parent.clientWidth;
  //       canvasRef.current.height = parent.clientHeight;
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize(); // 컴포넌트가 마운트될 때 초기 크기 설정

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [canvasRef]);

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
        <canvas
          data-id={dataId}
          onClick={clickCanvasProgressBarHandler}
          ref={canvasRef}
          width={800}
          height={60}
          className={user_post_canvas}
        ></canvas>
      </div>
    </>
  );
}
