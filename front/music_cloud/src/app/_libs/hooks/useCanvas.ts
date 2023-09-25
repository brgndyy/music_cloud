import { RefObject, useRef, useState, useEffect } from "react";

export const useCanvas = () => {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);
  const [waveform, setWaveform] = useState<Float32Array | null>(null);

  const drawWaveForm = (
    canvasCtx: CanvasRenderingContext2D | null,
    waveform: Float32Array | null, //
    canvasWidth: number, // 캔버스 넓이
    canvasHeight: number, // 캔버스 높이
    currentTimePercent: number // 현재 재생 위치의 퍼센트
  ) => {
    if (waveform && canvasCtx) {
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      const barWidth = 5;
      const gap = 5;
      let x = 0;

      const baseHeight = canvasHeight * 0.2;
      const variability = 0.4;
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

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");
      // canvasRef.current.width = canvasRef.current.offsetWidth;
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;
      //   const currentTimePercent = audioFile.currentTime / audioFile.duration;
    }
  }, [canvasRef, waveform]);

  // 초기 렌더링때 캔버스 넓이 설정해주기
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = canvasRef.current.offsetWidth;
    }
  }, []);

  // 브라우저 넓이 바뀔때마다 캔버스 사이즈 조절 해주기
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 크기 설정

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
};
