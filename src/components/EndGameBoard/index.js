/**
 * @module src/components/EndGameBoard
 */
import { useCallback, useState } from 'react';
import PropType from 'prop-types';
import PromptButton from 'src/components/PromptButton';
import './styles.scss';
import api from 'src/api';

const EndGameBoard = ({
  player1Score, player2Score, onRestartPress, onScoreBoardPress,
}) => {
  const [statusMessage, setStatusMessage] = useState(null);

  const onNewSaveScoreRequested = useCallback((pseudo) => {
    setStatusMessage('Sauvegarde du score en cours ...');
    api.post('/score', {
      player_1: player1Score,
      player_2: player2Score,
      pseudo,
    })
      .then(() => {
        setStatusMessage('Le score a été sauvegardé avec succès');
        setTimeout(() => {
          setStatusMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setStatusMessage(error.message);
      });
  }, []);

  return (
    <div className="endGameBoard">
      <h2 className="endGameBoard__title">Score</h2>
      {statusMessage && (<div className="endGameBoard__message">{statusMessage}</div>)}

      <div className="endGameBoard__container">
        <div className="endGameBoard__player1">
          <h3>Player 1</h3>
          <h4>{player1Score}</h4>
        </div>
        <div className="endGameBoard__player2">
          <h3>Player 2</h3>
          <h4>{player2Score}</h4>
        </div>
      </div>
      <div className="endGameBoard__buttons">
        <button type="button" className="endGameBoard__button button" onClick={onRestartPress}>Restart</button>
        <PromptButton
          message="Quel est ton pseudo ?"
          onValidation={onNewSaveScoreRequested}
        >Save
        </PromptButton>
        <button type="button" className="endGameBoard__button button" onClick={onScoreBoardPress}>ScoreBoard</button>
      </div>
    </div>
  );
};

EndGameBoard.propTypes = {
  player1Score: PropType.number.isRequired,
  player2Score: PropType.number.isRequired,
  onRestartPress: PropType.func,
  onScoreBoardPress: PropType.func,
};

EndGameBoard.defaultProps = {
  onRestartPress: () => { },
  onScoreBoardPress: () => { },
};

export default EndGameBoard;
