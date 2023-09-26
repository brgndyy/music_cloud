import React from "react";
import {
  user_post_canvas,
  user_post_canvas_card,
} from "@/app/_styles/music_post.css";
import { MusicPostItemType } from "@/app/_utils/_types/types";

type UserPostITemWaveFormType = {
  initialWaveForm: Float32Array | null;
  clickCanvasProgressBarHandler: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  music: MusicPostItemType;
  waveform: Float32Array | null;
  isPlaying: boolean;

  dataId: number;
};

export default function UserPostItemWaveForm({
  clickCanvasProgressBarHandler,
  canvasRef,
  dataId,
}: UserPostITemWaveFormType) {
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
