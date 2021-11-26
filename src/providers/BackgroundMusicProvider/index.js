/**
* @module src/components/BackgroundMusicProvider
*/
import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import useSound from 'use-sound';

import bgMusic from 'src/assets/sounds/music.mp3';
import './style.scss';

export const Context = React.createContext({});

const BackgroundMusicProvider = ({ children }) => {
  const [playSound, { stop: stopSound }] = useSound(bgMusic, { volume: 0.2 });
  const [isSoundEnabled, setSoundState] = useState(false);
  const [isBtnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    if (isSoundEnabled) {
      playSound();
    }
    else {
      stopSound();
    }
  }, [isSoundEnabled]);

  useEffect(() => {
    if (!isBtnVisible) {
      stopSound();
      setSoundState(false);
    }
  }, [isBtnVisible]);

  return (
    <Context.Provider value={{
      setBtnVisible,
      playSound: () => {
        setBtnVisible(true);
        setSoundState(true);
      },
      stopSound: () => {
        setSoundState(false);
      },
    }}
    >
      {isBtnVisible && (
        <button
          type="button"
          className="button--sound button-icon"
          onClick={() => setSoundState(!isSoundEnabled)}
        >
          {isSoundEnabled ? '🔈' : '🔇'}
        </button>
      )}
      {children}
    </Context.Provider>
  );
};

BackgroundMusicProvider.propTypes = {
  children: PropType.any.isRequired,
};

export default BackgroundMusicProvider;
