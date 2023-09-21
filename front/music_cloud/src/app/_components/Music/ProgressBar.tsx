import {
  progress_bar_wrapper,
  progress_bar_container,
  progress_bar_ball,
  progress_bar_percent,
  progress_time_container,
} from "@/app/_styles/progress_bar.css";
import { formatTime } from "@/app/_utils/formatTime";

type ProgressBarType = {
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
};

export default function ProgressBar({
  currentProgressPercent,
  progressDragHandler,
  handleMouseUp,
  handleMouseDown,
  progressBarClickHandler,
  currentPlayingTime,
}: ProgressBarType) {
  const formattedTime = formatTime(currentPlayingTime);
  return (
    <>
      <div className={progress_bar_wrapper}>
        <div
          className={progress_bar_container}
          onMouseMove={progressDragHandler}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseDown={progressBarClickHandler}
        >
          <div
            className={progress_bar_percent}
            style={{
              width: `${currentProgressPercent}%`,
            }}
          ></div>
          <div
            className={progress_time_container}
            style={{
              left: `${currentProgressPercent - 1}%`,
            }}
          >
            {formattedTime}
          </div>
          <div
            className={progress_bar_ball}
            style={{
              left: `${currentProgressPercent}%`,
            }}
            onMouseDown={handleMouseDown}
          ></div>
        </div>
      </div>
    </>
  );
}
