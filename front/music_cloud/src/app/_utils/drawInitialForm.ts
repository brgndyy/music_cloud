export const drawInitialForm = (
  canvasCtx: CanvasRenderingContext2D | null,
  waveform: Float32Array | null,
  canvasWidth: number,
  canvasHeight: number
) => {
  if (waveform && canvasCtx) {
    canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    const barWidth = 3;
    const gap = 3;
    let x = 0;

    const maxAmplitude = Math.max(...waveform);
    const baseHeight = canvasHeight / 2;

    for (let i = 0; i < waveform.length; i++) {
      const variation = baseHeight * (waveform[i] / maxAmplitude);
      const barHeight = baseHeight + variation;
      const topBarStartY = (canvasHeight - barHeight) / 2;

      canvasCtx.fillRect(x, topBarStartY, barWidth, barHeight);

      x += barWidth + gap;
    }
  }
};
