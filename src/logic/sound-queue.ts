import { AudioPlayer } from 'expo-audio';
import { playSound } from '../utils';

type SoundQueue = {
  isActive: boolean;
  items: {
    audio: AudioPlayer;
    timeout: number;
  }[];
};

export const createSoundQueue = (): SoundQueue => ({
  isActive: false,
  items: [],
});

const playNextSound = (soundQueue: SoundQueue) => {
  const nextSound = soundQueue.items.pop();
  if (nextSound) {
    playSound(nextSound.audio);
    setTimeout(() => playNextSound(soundQueue), nextSound.timeout);
  } else {
    soundQueue.isActive = false;
  }
};

export const pushSound = (soundQueue: SoundQueue, audio: AudioPlayer, timeout: number) => {
  soundQueue.items.push({ audio, timeout });
  if (!soundQueue.isActive) {
    soundQueue.isActive = true;
    playNextSound(soundQueue);
  }
};
