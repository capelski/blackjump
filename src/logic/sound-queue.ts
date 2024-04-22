import { Audio } from 'expo-av';
import { playSound } from '../utils';

type SoundQueue = { isActive: boolean; sounds: Audio.Sound[] };

export const createSoundQueue = (): SoundQueue => ({
  isActive: false,
  sounds: [],
});

const playNextSound = (soundQueue: SoundQueue) => {
  const nextSound = soundQueue.sounds.pop();
  if (nextSound) {
    playSound(nextSound).then(() => {
      setTimeout(() => playNextSound(soundQueue), 250);
    });
  } else {
    soundQueue.isActive = false;
  }
};

export const pushSound = (soundQueue: SoundQueue, sound: Audio.Sound) => {
  soundQueue.sounds.push(sound);
  if (!soundQueue.isActive) {
    soundQueue.isActive = true;
    playNextSound(soundQueue);
  }
};
