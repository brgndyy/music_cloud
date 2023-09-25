import { canvas_container } from "@/app/_styles/music_post.css";
import { RefObject } from "react";

type WaveFormType = {
  canvasRef: RefObject<HTMLCanvasElement> | null;
  clickCanvasProgressBarHandler: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void;
};

export default function WaveFormCanvas({
  canvasRef,
  clickCanvasProgressBarHandler,
}: WaveFormType) {
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
