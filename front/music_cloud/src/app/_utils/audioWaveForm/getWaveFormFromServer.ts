import { promises as fs } from "fs";
import AudioBuffer from "audio-buffer";
import { AudioContext } from "node-web-audio-api";

async function readFileAsArrayBuffer(filePath: string) {
  const buffer = await fs.readFile(filePath);
  return buffer.buffer as ArrayBuffer;
}

export const getWaveFormFromServer = async (fileUrl: string) => {
  const audioContext = new AudioContext();
  const fileAbsolutePath = `/Users/brgndy/Library/Mobile Documents/com~apple~CloudDocs/Desktop/programming/music_cloud/front/music_cloud/public${fileUrl}`;
  const arrayBuffer = await readFileAsArrayBuffer(fileAbsolutePath);
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const leftChannel = audioBuffer.getChannelData(0);
  const rightChannel =
    audioBuffer.numberOfChannels > 1
      ? audioBuffer.getChannelData(1)
      : leftChannel;

  const samples = 200;
  const blockSize = Math.floor(leftChannel.length / samples);
  let waveform = new Float32Array(samples);

  for (let i = 0; i < samples; i++) {
    let blockStart = i * blockSize;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum += (leftChannel[blockStart + j] + rightChannel[blockStart + j]) / 2;
    }
    waveform[i] = sum / blockSize;
  }

  return waveform;
};
