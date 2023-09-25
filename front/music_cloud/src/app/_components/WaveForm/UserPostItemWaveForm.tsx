import React from "react";
import { useRef, useEffect } from "react";
import {
  user_post_canvas_container,
  user_post_canvas,
  user_post_canvas_card,
} from "@/app/_styles/music_post.css";
import { RefObject } from "react";
import { drawInitialForm } from "@/app/_utils/drawInitialForm";

type UserPostITemWaveFormType = {
  waveForm: Float32Array;
};

export default function UserPostItemWaveForm({
  waveForm,
}: UserPostITemWaveFormType) {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      const canvas = canvasRef.current;
      // 상위 div의 넓이를 가져오기
      const WIDTH = canvasRef.current.parentElement.clientWidth;
      const HEIGHT = canvasRef.current.parentElement.clientHeight;

      canvas.width = WIDTH;
      canvas.height = HEIGHT;

      const canvasCtx = canvas.getContext("2d");
      drawInitialForm(canvasCtx, waveForm, WIDTH, HEIGHT);
    }
  }, [waveForm]);

  return (
    <>
      <div className={user_post_canvas_card}>
        <div className={user_post_canvas_container}>
          <canvas
            ref={canvasRef}
            width={800}
            height={60}
            className={user_post_canvas}
          ></canvas>
        </div>
      </div>
    </>
  );
}
