import { useState, useCallback, useEffect } from "react";
import { MusicPostItemType } from "@/app/_utils/_types/types";

type useMusicPlayerType = {
  volumeValue: number;
};

export const useMusicePlayer = ({ volumeValue }: useMusicPlayerType) => {
  const [selectedMusic, setSelectedMusic] = useState<MusicPostItemType | null>(
    null
  );
  const [nowPlaying, setNowPlaying] = useState(false);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [isRepeatActive, setIsRepeatActive] = useState(false);
  const [shuffledList, setShuffledList] = useState<MusicPostItemType[]>([]);
  const [volume, setVolume] = useState<number>(volumeValue);
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState<number | null>(null);
  const [currentPlayingTime, setCurrentPlayingTime] = useState<number>(0);

  // 반복재생 설정 핸들러
  const settingRepeatHandler = () => {
    setIsRepeatActive(!isRepeatActive);
  };

  // progress 바에 버튼 눌렀을때
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!audioFile) {
      return;
    }
    setInitialX(event.clientX);
    setIsDragging(true);
  };

  // progress 바 마우스로 눌렀다가 떼었을때
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const shuffleActiveHandler = () => {
    setIsShuffleActive(!isShuffleActive);
  };

  const shuffleList = useCallback(async () => {
    const nextRandomSong = shuffledList[0];
    // 첫 번째 노래를 목록에서 제거
    shuffledList.splice(0, 1);

    // 모든 노래가 재생되었으면 다시 섞음
    if (shuffledList.length === 0) {
      const shuffled = [...musicData];
      shuffled.sort(() => Math.random() - 0.5);
      setShuffledList(shuffled);
    }
    await setNewAudioFile(nextRandomSong);
  }, [musicData, setNewAudioFile, shuffledList]);

  useEffect(() => {
    // 랜덤 재생이 활성화 되어있을때 무작위로 섞음
    if (isShuffleActive) {
      const shuffled = [...musicData];
      shuffled.sort(() => Math.random() - 0.5);
      setShuffledList(shuffled);
    }
  }, [isShuffleActive, musicData]);

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
};
