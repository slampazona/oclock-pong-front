/**
 * @module src/components/EndGameBoard
 */
import PropType from 'prop-types';
import './styles.scss';

const EndGameBoard = ({
  player1Score, player2Score, onRestartPress, onScoreBoardPress,
}) => (
  <div className="endGameBoard">
    <h2 className="endGameBoard__title">Score</h2>
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
      <button type="button" className="endGameBoard__button button" onClick={onScoreBoardPress}>ScoreBoard</button>
    </div>
  </div>
);

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
