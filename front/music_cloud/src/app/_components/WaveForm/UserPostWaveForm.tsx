import { canvas_container } from "@/app/_styles/user_post_song_header.css";
import { RefObject } from "react";

type UserPostWaveFormType = {
  canvasRef: RefObject<HTMLCanvasElement> | null;
  clickCanvasProgressBarHandler: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
};

export default function UserPostWaveForm({
  canvasRef,
  clickCanvasProgressBarHandler,
}: UserPostWaveFormType) {
  return (
    <>
      <div className={canvas_container}>
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          onClick={clickCanvasProgressBarHandler}
        ></canvas>
      </div>
    </>
  );
}
