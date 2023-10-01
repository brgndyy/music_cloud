"use client";

import { UserMusicPostsType } from "@/app/_utils/_types/types";
import { user_posts_container } from "@/app/_styles/user_posts.css";
import UserPostItem from "./UserPostItem";
import { useState, useEffect, useCallback, useRef, RefObject } from "react";
import { MusicPostItemType } from "@/app/_utils/_types/types";
import MusicPlayer from "../Music/MusicPlayer";
import { initializeWaveForm } from "@/app/_utils/audioWaveForm/initializeWaveForm";

export default function UserPosts({
  musicData,
  initialWaveForms,
}: UserMusicPostsType) {
  const [playerVisible, setPlayerVisible] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState<MusicPostItemType | null>(
    null
  );
  const [nowPlaying, setNowPlaying] = useState(false);
  const [nowPlayingId, setNowPlayingId] = useState<number | undefined>(
    undefined
  );
  const [audioFile, setAudioFile] = useState<HTMLAudioElement | null>(null);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [isRepeatActive, setIsRepeatActive] = useState(false);
  const [shuffledList, setShuffledList] = useState<MusicPostItemType[]>([]);
  const [volume, setVolume] = useState<number>(0);
  const [currentProgressPercent, setCurrentProgressPercent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState<number | null>(null);
  const [currentPlayingTime, setCurrentPlayingTime] = useState<number>(0);
  const [canvasRefs, setCanvasRefs] = useState<
    Record<number, HTMLCanvasElement | null>
  >({});

  const registerCanvasRef = useCallback(
    (id: number, ref: HTMLCanvasElement) => {
      setCanvasRefs((refs) => ({
        ...refs,
        [id]: ref,
      }));
    },
    []
  );
  const [waveform, setWaveform] = useState<Float32Array | null>(null);

  const settingRepeatHandler = () => {
    setIsRepeatActive(!isRepeatActive);
  };

  const drawInitialForm = (
    canvasCtx: CanvasRenderingContext2D | null,
    waveform: Float32Array | null,
    canvasWidth: number,
    canvasHeight: number,
    currentTimePercent: number
  ) => {
    if (waveform && canvasCtx) {
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      const barWidth = 2;
      const gap = 2;
      let x = 0;

      const baseHeight = canvasHeight * 0.4;
      const variability = 0.8;
      const maxAmplitude = Math.max(...waveform);

      const currentX = currentTimePercent * canvasWidth; // 현재 재생 범위

      for (let i = 0; i < waveform.length; i++) {
        const variation =
          baseHeight * variability * (waveform[i] / maxAmplitude);
        const barHeight = baseHeight + variation;
        const topBarStartY = canvasHeight / 2 - barHeight;

        // 현재 재생 위치보다 왼쪽에 있는 막대의 색상을 변경
        if (x < currentX) {
          canvasCtx.fillStyle = "rgb(0, 128, 255)"; // 재생된 부분의 색상
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

  const resetCanvas = useCallback(
    async (selectedMusic: MusicPostItemType) => {
      const currentCanvasRef = canvasRefs[selectedMusic.id];
      if (currentCanvasRef && currentCanvasRef.parentElement) {
        const canvas = currentCanvasRef;
        const WIDTH = currentCanvasRef.parentElement.clientWidth;
        const HEIGHT = currentCanvasRef.parentElement.clientHeight;
        const canvasCtx = canvas.getContext("2d");

        const index = Object.keys(canvasRefs).indexOf(
          selectedMusic.id.toString()
        );
        if (index !== -1 && initialWaveForms[index]) {
          drawInitialForm(canvasCtx, initialWaveForms[index], WIDTH, HEIGHT, 0);
        }
      }
    },
    [canvasRefs, initialWaveForms]
  );

  const setNewAudioFile = useCallback(
    async (music: MusicPostItemType) => {
      // 기존에 존재하던 음악 파일 언마운트 해주기
      if (audioFile && selectedMusic) {
        audioFile.pause();

        if (selectedMusic && selectedMusic.id === music.id) {
          // 선택된 곡이 이미 재생 중인 곡이라면, 새로운 오디오 파일을 로드하지 않고
          // 기존 오디오 파일 객체를 반환
          return audioFile;
        }

        // 기존에 재생되고 있는 노래의 캔버스를 초기화함
        await resetCanvas(selectedMusic);

        setAudioFile(null); // 기존 오디오 객체 해제
        await new Promise((resolve) => setTimeout(resolve, 10)); // 일시적인 딜레이 추가
      }

      // 새로운 오디오 객체를 생성하고 설정함
      const newAudioFile = new Audio(music.file);

      setAudioFile(newAudioFile);
      setNowPlaying(true);
      setSelectedMusic(music);
      return newAudioFile; // 생성된 오디오 파일 객체를 반환
    },
    [audioFile, selectedMusic, resetCanvas]
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
    if (audioFile && selectedMusic) {
      // 쿠키에 있던 볼륨 값 들고와서 오디오 자체 볼륨 설정해주기
      const normalizedVolume = volume / 100;
      audioFile.volume = normalizedVolume;

      // 오디오 파일의 재생 시간이 변경될 때마다 호출될 핸들러
      const handleTimeUpdate = () => {
        const currentTimeInSeconds = Math.floor(audioFile.currentTime);

        const percent = (audioFile.currentTime / audioFile.duration) * 100;
        setCurrentProgressPercent(percent);
        setCurrentPlayingTime(currentTimeInSeconds);

        if (selectedMusic) {
          const id = selectedMusic.id;
          const canvasRef = canvasRefs[id];
          const index = Object.keys(canvasRefs).indexOf(id.toString()); // 키는 문자열이므로 id를 문자열로 변환

          if (canvasRef && canvasRef.parentElement && index !== -1) {
            const canvas = canvasRef;
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;
            const canvasCtx = canvas.getContext("2d");
            const currentTimePercent =
              audioFile.currentTime / audioFile.duration;

            const initialWaveForm = initialWaveForms[index]; // 이미 파형을 미리 그려준곳에서 index에 맞춰서 파형 가져옴

            if (canvasCtx && initialWaveForm)
              drawInitialForm(
                canvasCtx,
                initialWaveForm,
                WIDTH,
                HEIGHT,
                currentTimePercent
              );
          }
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
    canvasRefs,
    initialWaveForms,
  ]);

  // 렌더링 될때 기본 파형 그려주기
  useEffect(() => {
    Object.keys(canvasRefs).forEach((key, index) => {
      const numKey = Number(key);
      const ref = canvasRefs[numKey];
      if (ref && ref.parentElement) {
        const canvas = ref;
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        const canvasCtx = canvas.getContext("2d");

        const initialWaveForm = initialWaveForms[index];

        drawInitialForm(canvasCtx, initialWaveForm, WIDTH, HEIGHT, 0);
      }
    });
  }, [initialWaveForms, canvasRefs]);

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
    if (!audioFile || !element) return;

    const rect = element.getBoundingClientRect();

    const clickPosition = (clientX - rect.left) / rect.width;
    const newTime = clickPosition * audioFile.duration;
    const percent = clickPosition * 100;

    if (newTime >= 0 && newTime <= audioFile.duration) {
      audioFile.currentTime = newTime;
      setCurrentProgressPercent(percent);
    }

    return newTime;
  };

  const selectSongHandler = async (music: MusicPostItemType) => {
    setPlayerVisible(true);
    if (nowPlayingId && nowPlayingId !== music.id) {
      if (audioFile) {
        audioFile.pause(); // 현재 재생 중인 오디오를 멈춤
      }
      setNowPlaying(false); // 현재 재생 중인 상태를 false로 설정
      await setNewAudioFile(music); // 새로운 오디오를 설정
    } else if (audioFile) {
      if (audioFile.paused) {
        audioFile.play(); // 만약 오디오가 일시정지 상태라면 재생
      } else {
        audioFile.pause(); // 만약 오디오가 재생 중이라면 일시정지
      }
      setNowPlaying(!audioFile.paused); // 현재 재생 중인 상태를 업데이트
    } else {
      await setNewAudioFile(music); // 오디오 파일이 없다면 새로운 오디오를 설정
    }

    if (music.id !== undefined) {
      setNowPlayingId(music.id); // 재생 중인 노래의 ID를 저장
    }
  };

  const clickProgressBarDivHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    progressHandler(event.clientX, event.currentTarget);
  };

  const clickCanvasProgressBarHandler = async (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = event.currentTarget;
    const musicId = canvas.dataset.id;

    if (musicId) {
      const selectedMusic = musicData.find(
        (music) => music.id === parseInt(musicId)
      );

      if (selectedMusic) {
        setPlayerVisible(true);
        const activeAudioFile = await setNewAudioFile(selectedMusic);
        setNowPlayingId(selectedMusic.id);

        if (canvas) {
          // canvas가 존재하는 경우에만 progressHandler 호출
          const clickedTime = progressHandler(event.clientX, canvas);
          if (Number.isFinite(clickedTime) && activeAudioFile) {
            activeAudioFile.currentTime = Number(clickedTime);
            if (activeAudioFile.paused) {
              activeAudioFile.play();
            }
          }
        }
      }
    }
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

  // 초기 렌더링시 볼륨 값 가져오기
  useEffect(() => {
    const fetchVolume = async () => {
      const response = await fetch("/api/volume");
      const { volume } = await response.json();

      setVolume(volume);
    };

    fetchVolume();
  }, []);

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
      if (nowPlaying && selectedMusic) {
        setNowPlayingId(selectedMusic.id);

        audioFile
          .play()
          .catch((error) =>
            console.error("음악파일 재생중 에러가 발생했어요!:", error)
          );
      } else {
        audioFile.pause();
      }
    }
  }, [nowPlaying, audioFile, selectedMusic]);

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

  const playCurrentSongHandler = (currentMusicId?: number) => {
    if (audioFile) {
      audioFile.play();
      setNowPlaying(true);
      if (currentMusicId !== undefined) {
        setNowPlayingId(currentMusicId);
      }
    }
  };

  const pauseCurrentSongHandler = (currentMusicId?: number) => {
    if (audioFile) {
      audioFile.pause();
      setNowPlaying(false);
    }
  };

  // useEffect(() => {
  //   Object.values(canvasRefs).forEach((canvas) => {
  //     if (canvas) {

  return (
    <>
      <div className={user_posts_container}>
        {musicData.map((music, index) => {
          const isPlaying = nowPlayingId === music.id;
          return (
            <UserPostItem
              key={music.id}
              music={music}
              selectSongHandler={selectSongHandler}
              initialWaveForm={initialWaveForms[index]}
              nowPlaying={nowPlaying}
              isPlaying={isPlaying}
              pauseCurrentSongHandler={pauseCurrentSongHandler}
              clickCanvasProgressBarHandler={clickCanvasProgressBarHandler}
              waveform={waveform}
              src={music.file}
              registerCanvasRef={registerCanvasRef}
              dataId={music.id}
            />
          );
        })}
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
      </div>
    </>
  );
}
