import {
  canvas_container,
  post_song_canvas,
} from "@/app/_styles/user_post_song_header.css";
import { RefObject } from "react";

type UserPostWaveFormType = {
  canvasRef: RefObject<HTMLCanvasElement> | null;
  clickCanvasProgressBarHandler: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
  dataId: number;
};

export default function UserPostWaveForm({
  canvasRef,
  clickCanvasProgressBarHandler,
  dataId,
}: UserPostWaveFormType) {
  return (
    <>
      <div className={canvas_container}>
        <canvas
          data-id={dataId}
          ref={canvasRef}
          width={300}
          height={200}
          onClick={clickCanvasProgressBarHandler}
          className={post_song_canvas}
        ></canvas>
      </div>
    </>
  );
}
