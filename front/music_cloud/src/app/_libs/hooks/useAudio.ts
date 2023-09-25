import { useState, useCallback } from "react";
import { MusicPostItemType } from "@/app/_utils/_types/types";

export const useAudio = () => {
  const [playerVisible, setPlayerVisible] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState<MusicPostItemType | null>(
    null
  );
  const [nowPlaying, setNowPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState<HTMLAudioElement | null>(null);

  const selectSongHandler = async (music: MusicPostItemType) => {
    setPlayerVisible(true);

    if (selectedMusic && selectedMusic.id === music.id) {
      // 같은 노래를 클릭한 경우 일시정지
      setNowPlaying(!nowPlaying);
    } else {
      await setNewAudioFile(music);
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
      //   const initializedWaveForm = await initializeWaveForm(music.file);

      //   setWaveform(initializedWaveForm);
    },
    [audioFile]
  );
};
