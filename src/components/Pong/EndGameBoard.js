/**
 * @module src/components/EndGameBoard
 */
import PropType from 'prop-types';

const EndGameBoard = ({ player1, player2, onRestartPress, onScoreBoardPress }) => (
  <div className="endGameBoard">
    <h2 className="endGameBoard__title">Score</h2>
    <div className="endGameBoard__container">
      <div className="endGameBoard__player1">
        <h3>Player 1</h3>
        <h4>{player1.score}</h4>
      </div>
      <div className="endGameBoard__player2">
        <h3>Player 2</h3>
        <h4>{player2.score}</h4>
      </div>
    </div>
    <div className="endGameBoard__buttons">
      <button type="button" className="endGameBoard__button" onClick={onRestartPress}>Restart</button>
      <button type="button" className="endGameBoard__button" onClick={onScoreBoardPress}>ScoreBoard</button>
    </div>
  </div>
);

EndGameBoard.propTypes = {
  player1: PropType.object.isRequired,
  player2: PropType.object.isRequired,
  onRestartPress: PropType.func,
  onScoreBoardPress: PropType.func,
};

EndGameBoard.defaultProps = {
  onRestartPress: () => { },
  onScoreBoardPress: () => { },
};

export default EndGameBoard;
