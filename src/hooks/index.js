/* eslint-disable import/prefer-default-export */
import { useContext } from 'react';
import { Context } from 'src/providers/BackgroundMusicProvider';

export const useBackgroundMusic = () => {
  const backgroundMusicContext = useContext(Context);
  return {
    setMusicButtonVisibleState: backgroundMusicContext.setBtnVisible,
    playMusic: backgroundMusicContext.playSound,
    stopMusic: backgroundMusicContext.stopSound,
  };
};
