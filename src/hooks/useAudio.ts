import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { soundSynth } from '../utils/soundSynth';

const SOUND_STORAGE_KEY = 'dev_wordle_sound_enabled_v1';

export function useAudio() {
  const [soundEnabled, setSoundEnabled] = useLocalStorage<boolean>(SOUND_STORAGE_KEY, true);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, [setSoundEnabled]);

  const playKey = useCallback(() => {
    soundSynth.playKeyClick(soundEnabled);
  }, [soundEnabled]);

  const playFlip = useCallback((index = 0) => {
    soundSynth.playFlip(index, soundEnabled);
  }, [soundEnabled]);

  const playWin = useCallback(() => {
    soundSynth.playWinFanfare(soundEnabled);
  }, [soundEnabled]);

  const playError = useCallback(() => {
    soundSynth.playErrorBuzz(soundEnabled);
  }, [soundEnabled]);

  const playGameOver = useCallback(() => {
    soundSynth.playGameOver(soundEnabled);
  }, [soundEnabled]);

  return {
    soundEnabled,
    toggleSound,
    playKey,
    playFlip,
    playWin,
    playError,
    playGameOver
  };
}
