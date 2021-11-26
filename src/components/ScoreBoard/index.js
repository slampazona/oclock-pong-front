/**
* @module src/components/ScoreBoard
*/
import PropType from 'prop-types';
import dayjs from 'dayjs';
import './styles.scss';

const ScoreBoard = ({ scores }) => (
  <div className="scoreBoard">
    <div className="scoreBoard__container scores">
      <div className="score score--header">
        <div className="score__player1">P1</div>
        <div className="score__player2">P2</div>
        <div className="score__date">Date</div>
      </div>
      {!scores.length && 'Aucun score à afficher'}
      {scores.map((score) => (
        <div className="score" key={score.id}>
          <div className="score__player1">{score.player_1}</div>
          <div className="score__player2">{score.player_2}</div>
          <div className="score__date">{dayjs(score.date).format('DD/MM/YYYY')}</div>
        </div>
      ))}
    </div>
  </div>
);

ScoreBoard.propTypes = {
  scores: PropType.arrayOf(
    PropType.shape({
      id: PropType.number.isRequired,
      player_1: PropType.number,
      player_2: PropType.number,
      date: PropType.oneOfType([PropType.string, PropType.object]),
    }),
  ),
};

ScoreBoard.defaultProps = {
  scores: [],
};

export default ScoreBoard;
