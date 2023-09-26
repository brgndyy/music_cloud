export const drawInitialForm = (
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
