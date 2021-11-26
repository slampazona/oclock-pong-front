/**
* @module src/pages/GamePage
*/
import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import PropType from 'prop-types';
import Game from 'src/components/Game';
import classNames from 'classnames';
import KeyboardKey from 'src/components/KeyboardKey';
import EndGameBoard from 'src/components/EndGameBoard';
import { useBackgroundMusic } from 'src/hooks';
import { NavLink, useNavigate } from 'react-router-dom';

import './styles.scss';

const GamePage = () => {
  const gameRef = useRef(null);
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const { setMusicButtonVisibleState, playMusic } = useBackgroundMusic();

  useEffect(() => {
    setMusicButtonVisibleState(false);
    return playMusic;
  }, []);

  const startGame = useCallback(() => {
    setGameFinished(false);
    setTimeout(() => {
      gameRef.current.startGame();
    });
  }, []);

  return (
    <div className="game">
      <div className="game__headerButtons">
        <NavLink to="/">
          <button
            type="button"
            className="launchPage__button button"
          >
            &lt; Main Menu
          </button>
        </NavLink>
        <NavLink to="/scoreboard">
          <button
            type="button"
            className="launchPage__button button"
          >
            &gt; Score Board
          </button>
        </NavLink>
      </div>
      <h1 className="gameTitle">O'Pong</h1>

      <div className="pongContainer">
        <div className={classNames('leftKeys', { paused: gameStarted })}>
          <KeyboardKey keyValue="Z" />
          <KeyboardKey keyValue="S" />
        </div>
        <div className="pong">
          {gameFinished ? (
            <EndGameBoard
              player1Score={gameFinished.player1Score}
              player2Score={gameFinished.player2Score}
              onScoreBoardPress={() => {
                navigate('/scoreboard');
              }}
              onRestartPress={startGame}
            />
          ) : (
            <Game
              ref={gameRef}
              onStart={() => setGameStarted(true)}
              onGameFinished={(player1Score, player2Score) => setGameFinished({
                player1Score,
                player2Score,
              })}
            />
          )}

          {!gameStarted && (
            <div className="pongContainer--start-button-container">
              <button type="button" className="button" onClick={startGame}>Start</button>
            </div>
          )}
        </div>
        <div className={classNames('rightKeys', { paused: gameStarted })}>
          <KeyboardKey keyValue="↑" />
          <KeyboardKey keyValue="↓" />
        </div>
      </div>
    </div>
  );
};

GamePage.propTypes = {};

export default GamePage;
