import { useState, useCallback, useEffect } from "react";
import {
  MusicPostItemType,
  MusicPostListType,
} from "@/app/_utils/_types/types";

type useMusicPlayerType = {
  musicData: MusicPostItemType[];
};

export const useMusicPlayer = ({ musicData }: useMusicPlayerType) => {
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

  const settingRepeatHandler = () => {
    setIsRepeatActive(!isRepeatActive);
  };

  const setNewAudioFile = useCallback(
    async (music: MusicPostItemType) => {
      // 기존에 존재하던 음악 파일 언마운트 해주기
      if (audioFile) {
        audioFile.pause();

        if (selectedMusic && selectedMusic.id === music.id) {
          // 선택된 곡이 이미 재생 중인 곡이라면, 새로운 오디오 파일을 로드하지 않고
          // 기존 오디오 파일 객체를 반환
          return audioFile;
        }

        setAudioFile(null); // 기존 오디오 객체 해제
        await new Promise((resolve) => setTimeout(resolve, 10)); // 일시적인 딜레이 추가
      }

      const newAudioFile = new Audio(music.file);
      setAudioFile(newAudioFile);
      setNowPlaying(true);
      setSelectedMusic(music);

      // const initializedWaveForm = await initializeWaveForm(music.file);

      // setWaveform(initializedWaveForm);
    },
    [audioFile, selectedMusic]
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

      setNowPlayingId(musicData[nextIndex].id);
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
  }, [audioFile, nextSongPlayHandler, isRepeatActive, selectedMusic, volume]);

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

  const clickProgressBarHandler = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (!audioFile) return;

    const element = event.currentTarget; // 이렇게 하면 progressHandler에서 사용한 element를 얻을 수 있습니다.
    const rect = element.getBoundingClientRect();
    const clientX = event.clientX; // 이렇게 하면 progressHandler에서 사용한 clientX를 얻을 수 있습니다.

    const clickPosition = (clientX - rect.left) / rect.width;
    const newTime = clickPosition * audioFile.duration;
    const percent = clickPosition * 100;

    if (newTime >= 0 && newTime <= audioFile.duration) {
      audioFile.currentTime = newTime;
      setCurrentProgressPercent(percent);
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

  // const selectSongHandler = async (music: MusicPostItemType) => {
  //   setPlayerVisible(true);

  //   console.log(" music : ", music);

  //   if (selectedMusic && selectedMusic.id === music.id) {
  //     // 같은 노래를 클릭한 경우 일시정지
  //     setNowPlaying(!nowPlaying);
  //   } else {
  //     await setNewAudioFile(music);
  //   }
  // };

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

  // 이전 노래 곡 재생
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

  // 현재 노래 재생 버튼
  const playCurrentSongHandler = async (currentMusicId?: number) => {
    console.log("currentMusicId : ", currentMusicId);
    if (audioFile) {
      audioFile.play();
      setNowPlaying(true);
      if (currentMusicId !== undefined) {
        setNowPlayingId(currentMusicId);
      }
    }
  };

  // 일시정지 버튼
  const pauseCurrentSongHandler = (currentMusicId?: number) => {
    console.log(currentMusicId);
    if (audioFile) {
      audioFile.pause();
      setNowPlaying(false);
    }
  };

  return {
    audioFile,
    nowPlaying,
    playerVisible,
    selectedMusic,
    playCurrentSongHandler,
    pauseCurrentSongHandler,
    nextSongPlayHandler,
    prevSongPlayHandler,
    shuffleActiveHandler,
    isShuffleActive,
    volumeHandler,
    volume,
    currentProgressPercent,
    progressDragHandler,
    handleMouseUp,
    handleMouseDown,
    clickProgressBarHandler,
    currentPlayingTime,
    settingRepeatHandler,
    isRepeatActive,
    setCurrentProgressPercent,
    setCurrentPlayingTime,
    setPlayerVisible,
    setNowPlaying,
    setNewAudioFile,
  };
};
