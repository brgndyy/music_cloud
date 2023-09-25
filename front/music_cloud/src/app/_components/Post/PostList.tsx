"use client";
import PostItem from "./PostItem";
import {
  music_posts_ul_container,
  canvas_container,
} from "@/app/_styles/music_post.css";
import { useState, useEffect, useCallback, useRef, RefObject } from "react";
import MusicPlayer from "../Music/MusicPlayer";
import { MusicPostItemType } from "@/app/_utils/_types/types";
import HeadingPost from "./HeadingPost";
import WaveFormCanvas from "../WaveForm/WaveFormCanvas";

type PostListType = {
  musicData: MusicPostItemType[];
  volumeValue: number;
};

export default function PostList({ musicData, volumeValue }: PostListType) {
  const [playerVisible, setPlayerVisible] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState<MusicPostItemType | null>(
    null
  );
  const [nowPlaying, setNowPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState<HTMLAudioElement | null>(null);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [isRepeatActive, setIsRepeatActive] = useState(false);
  const [shuffledList, setShuffledList] = useState<MusicPostItemType[]>([]);
  const [volume, setVolume] = useState<number>(volumeValue);
  const [currentProgressPercent, setCurrentProgressPercent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState<number | null>(null);
  const [currentPlayingTime, setCurrentPlayingTime] = useState<number>(0);
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);
  const [waveform, setWaveform] = useState<Float32Array | null>(null);

  const settingRepeatHandler = () => {
    setIsRepeatActive(!isRepeatActive);
  };

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

  const initializeWaveForm = async (fileUrl: string) => {
    try {
      const audioContext = new AudioContext();
      const res = await fetch(`${fileUrl}`);

      const data = await res.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(data);

      const leftChannel = audioBuffer.getChannelData(0);
      const rightChannel =
        audioBuffer.numberOfChannels > 1
          ? audioBuffer.getChannelData(1)
          : leftChannel;

      const samples = 200; // 원하는 샘플 수 많아질수록 오디오 막대들이 빽빽해짐
      const blockSize = Math.floor(leftChannel.length / samples);
      let waveform = new Float32Array(samples);

      for (let i = 0; i < samples; i++) {
        let blockStart = i * blockSize;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum +=
            (leftChannel[blockStart + j] + rightChannel[blockStart + j]) / 2;
        }
        waveform[i] = sum / blockSize;
      }

      return waveform;
    } catch (err) {
      console.error("WaveForm 생성 중 오류가 발생했어요 ! ", err);
      return null;
    }
  };

  const setNewAudioFile = useCallback(
    async (music: MusicPostItemType) => {
      // 기존에 존재하던 음악 파일 언마운트 해주기
      if (audioFile) {
        audioFile.pause();
        setAudioFile(null); // 기존 오디오 객체 해제
        await new Promise((resolve) => setTimeout(resolve, 10)); // 일시적인 딜레이 추가
      }

      const newAudioFile = new Audio(music.file);
      setAudioFile(newAudioFile);
      setNowPlaying(true);
      setSelectedMusic(music);
      const initializedWaveForm = await initializeWaveForm(music.file);

      setWaveform(initializedWaveForm);
    },
    [audioFile]
  );

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!audioFile) {
      return;
    }
    setInitialX(event.clientX);
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const shuffleList = useCallback(async () => {
    const nextRandomSong = shuffledList[0];
    shuffledList.splice(0, 1); // 첫 번째 노래를 목록에서 제거
    if (shuffledList.length === 0) {
      // 모든 노래가 재생되었으면 다시 섞음
      const shuffled = [...musicData];
      shuffled.sort(() => Math.random() - 0.5);
      setShuffledList(shuffled);
    }
    await setNewAudioFile(nextRandomSong);
  }, [musicData, setNewAudioFile, shuffledList]);

  const nextSongPlayHandler = useCallback(
    async (currentMusicId?: number) => {
      if (typeof currentMusicId === "undefined") {
        return;
      }

      if (isShuffleActive) {
        await shuffleList();
        return;
      }

      const currentIndex = musicData.findIndex(
        (music) => music.id === currentMusicId
      );

      const nextIndex = (currentIndex + 1) % musicData.length;

      await setNewAudioFile(musicData[nextIndex]);
    },
    [isShuffleActive, musicData, shuffleList, setNewAudioFile]
  );

  useEffect(() => {
    if (audioFile) {
      // 쿠키에 있던 볼륨 값 들고와서 오디오 자체 볼륨 설정해주기
      const normalizedVolume = volume / 100;
      audioFile.volume = normalizedVolume;

      // 오디오 파일의 재생 시간이 변경될 때마다 호출될 핸들러
      const handleTimeUpdate = () => {
        const currentTimeInSeconds = Math.floor(audioFile.currentTime);

        const percent = (audioFile.currentTime / audioFile.duration) * 100;
        setCurrentProgressPercent(percent);
        setCurrentPlayingTime(currentTimeInSeconds);

        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const canvasCtx = canvas.getContext("2d");
          const WIDTH = canvas.width;
          const HEIGHT = canvas.height;
          const currentTimePercent = audioFile.currentTime / audioFile.duration;

          drawWaveForm(canvasCtx, waveform, WIDTH, HEIGHT, currentTimePercent);
        }
      };

      const handleAudioEnded = () => {
        if (isRepeatActive) {
          // 현재 노래를 처음부터 다시 재생
          if (audioFile) {
            audioFile.currentTime = 0; // 노래의 현재 시간을 0초로 설정
            audioFile.play(); // 노래 재생
          }
        } else {
          // 다음 노래로 넘어감
          if (selectedMusic) {
            nextSongPlayHandler(selectedMusic.id);
          }
        }
      };

      audioFile.addEventListener("timeupdate", handleTimeUpdate);
      audioFile.addEventListener("ended", handleAudioEnded);

      // useEffect의 정리 함수에서 이벤트 리스너를 제거
      return () => {
        audioFile.removeEventListener("timeupdate", handleTimeUpdate);
        audioFile.removeEventListener("ended", handleAudioEnded);
      };
    }
  }, [
    audioFile,
    selectedMusic,
    nextSongPlayHandler,
    volume,
    isRepeatActive,
    waveform,
  ]);

  // 첫 렌더링시 그려주기

  useEffect(() => {
    const drawInitialWaveForm = async () => {
      const firstMusicData = musicData[0];

      const initializedWaveForm = await initializeWaveForm(firstMusicData.file);

      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext("2d");
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height

        drawWaveForm(canvasCtx, initializedWaveForm, WIDTH, HEIGHT, 0);
      }
    };

    drawInitialWaveForm();
  }, [audioFile, musicData]);

  const progressDragHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!isDragging || !initialX || !audioFile) return;

    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const dragChange = event.clientX - initialX;

    const sensitivity = 0.5;
    const normalizedDragChange = dragChange * sensitivity;

    const dragPercent = normalizedDragChange / rect.width;
    const newTime = audioFile.currentTime + dragPercent * audioFile.duration;
    const percent = (newTime / audioFile.duration) * 100;

    if (newTime >= 0 && newTime <= audioFile.duration) {
      audioFile.currentTime = newTime;
      setCurrentProgressPercent(percent);
    }

    setInitialX(event.clientX);
  };

  const progressHandler = (clientX: number, element: HTMLElement | Element) => {
    if (!audioFile) return;

    const rect = element.getBoundingClientRect();

    const clickPosition = (clientX - rect.left) / rect.width;
    const newTime = clickPosition * audioFile.duration;
    const percent = clickPosition * 100;

    if (newTime >= 0 && newTime <= audioFile.duration) {
      audioFile.currentTime = newTime;
      setCurrentProgressPercent(percent);
    }
  };

  const clickProgressBarDivHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    progressHandler(event.clientX, event.currentTarget);
  };

  const clickCanvasProgressBarHandler = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    progressHandler(event.clientX, event.currentTarget);
  };

  const volumeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    const normalizedVolume = newVolume / 100;
    if (audioFile) {
      audioFile.volume = normalizedVolume;
    }
    setVolume(newVolume);

    await fetch("/api/volume", {
      method: "POST",
      body: JSON.stringify({
        volume: newVolume,
      }),
    });
  };

  const shuffleActiveHandler = () => {
    setIsShuffleActive(!isShuffleActive);
  };

  useEffect(() => {
    // 랜덤 재생이 활성화 되어있을때 무작위로 섞음
    if (isShuffleActive) {
      const shuffled = [...musicData];
      shuffled.sort(() => Math.random() - 0.5);
      setShuffledList(shuffled);
    }
  }, [isShuffleActive, musicData]);

  const selectSongHandler = async (music: MusicPostItemType) => {
    setPlayerVisible(true);

    if (selectedMusic && selectedMusic.id === music.id) {
      // 같은 노래를 클릭한 경우 일시정지
      setNowPlaying(!nowPlaying);
    } else {
      await setNewAudioFile(music);
    }
  };

  // 컴포넌트가 언마운트될 때 Audio 객체 해제
  useEffect(() => {
    return () => {
      if (audioFile) {
        audioFile.pause();
        setAudioFile(null);
      }
    };
  }, [audioFile]);

  useEffect(() => {
    if (audioFile) {
      if (nowPlaying) {
        audioFile
          .play()
          .catch((error) =>
            console.error("음악파일 재생중 에러가 발생했어요!:", error)
          );
      } else {
        audioFile.pause();
      }
    }
  }, [nowPlaying, audioFile]);

  const prevSongPlayHandler = async (currentMusicId?: number) => {
    if (typeof currentMusicId === "undefined") {
      return;
    }

    if (isShuffleActive) {
      await shuffleList();
      return;
    }

    const currentIndex = musicData.findIndex(
      (music) => music.id === currentMusicId
    );

    let prevIndex = currentIndex - 1;

    if (prevIndex < 0) {
      prevIndex = musicData.length - 1;
    }

    await setNewAudioFile(musicData[prevIndex]);
  };

  const playCurrentSongHandler = () => {
    if (audioFile) {
      audioFile.play();
      setNowPlaying(true);
    }
  };

  const pauseCurrentSongHandler = () => {
    if (audioFile) {
      audioFile.pause();
      setNowPlaying(false);
    }
  };

  // 초기 렌더링때 캔버스 넓이 설정해주기
  // useEffect(() => {
  //   if (canvasRef.current) {
  //     canvasRef.current.width = canvasRef.current.offsetWidth;
  //   }
  // }, []);

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

  return (
    <>
      <WaveFormCanvas
        canvasRef={canvasRef}
        clickCanvasProgressBarHandler={clickCanvasProgressBarHandler}
      />

      <HeadingPost />
      <ul className={music_posts_ul_container}>
        {musicData.map((music) => {
          return (
            <PostItem
              key={music.id}
              selectSongHandler={selectSongHandler}
              music={music}
            />
          );
        })}
      </ul>
      <MusicPlayer
        nowPlaying={nowPlaying}
        visible={playerVisible}
        selectedId={selectedMusic?.id}
        image={selectedMusic?.image}
        title={selectedMusic?.title}
        artist={selectedMusic?.artistInfo.artistName}
        playCurrentSongHandler={playCurrentSongHandler}
        pauseCurrentSongHandler={pauseCurrentSongHandler}
        nextSongPlayHandler={nextSongPlayHandler}
        prevSongPlayHandler={prevSongPlayHandler}
        shuffleActiveHandler={shuffleActiveHandler}
        isShuffleActive={isShuffleActive}
        volumeHandler={volumeHandler}
        volume={volume}
        currentProgressPercent={currentProgressPercent}
        progressDragHandler={progressDragHandler}
        handleMouseUp={handleMouseUp}
        handleMouseDown={handleMouseDown}
        progressBarClickHandler={clickProgressBarDivHandler}
        currentPlayingTime={currentPlayingTime}
        settingRepeatHandler={settingRepeatHandler}
        isRepeatActive={isRepeatActive}
      />
    </>
  );
}
