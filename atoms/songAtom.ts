import { atom } from 'recoil';

export const currentTrackIdState = atom({
  key: 'currentTrackIdState',
  default: null
});

export const isPLayingState = atom({
  key: 'isPlayingState',
  default: false
});

export const isMuteState = atom({
  key: 'isMuteState',
  default: false
});
