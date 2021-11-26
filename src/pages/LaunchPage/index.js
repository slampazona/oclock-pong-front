/**
* @module src/pages/LaunchPage
*/
import { useState, useEffect, useCallback } from 'react';
import PropType from 'prop-types';
import { useBackgroundMusic } from 'src/hooks';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const LaunchPage = () => {
  const [started, setStarted] = useState(false);
  const { playMusic } = useBackgroundMusic();

  const launchGame = useCallback(() => {
    setStarted(true);
    playMusic();
  }, []);

  return (
    <div className="launchPage">
      <div className="launchPage__buttons">
        <h1 className="launchPage__title">O'Pong</h1>
        {started ? (
          <>
            <NavLink to="/game">
              <button
                type="button"
                className="launchPage__button button"
              >
                Start New Game
              </button>
            </NavLink>
            <NavLink to="/scoreboard">
              <button
                type="button"
                className="launchPage__button button"
              >
                Score Board
              </button>
            </NavLink>
          </>
        ) : (
          <button type="button" className="launchPage__button button" onClick={launchGame}>Launch Game</button>
        )}

      </div>
    </div>
  );
};

LaunchPage.propTypes = {};

export default LaunchPage;
