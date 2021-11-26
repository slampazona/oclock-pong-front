/**
* @module src/components/ScoreBoard
*/
import { useEffect } from 'react';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useBackgroundMusic } from 'src/hooks';
import ScoreBoard from 'src/components/ScoreBoard';
import './styles.scss';

const ScoreBoardPage = () => {
  const { playMusic } = useBackgroundMusic();

  useEffect(() => {
    playMusic();
  }, []);

  return (
    <div className="scoreBoardPage">
      <h2 className="scoreBoardPage__title">ScoreBoard</h2>
      <ScoreBoard
        scores={[
          {
            id: 1,
            player_1: 1,
            player_2: 12,
            date: new Date(),
          },
          {
            id: 2,
            player_1: 4,
            player_2: 1,
            date: new Date(),
          },
          {
            id: 3,
            player_1: 32,
            player_2: 11,
            date: new Date(),
          },
          {
            id: 4,
            player_1: 18,
            player_2: 5,
            date: new Date(),
          },
        ]}
      />
      <div className="scoreBoardPage__buttons">
        <NavLink to="/">
          <button
            type="button"
            className="launchPage__button button"
          >
            &lt; Main Menu
          </button>
        </NavLink>
      </div>
    </div>
  );
};

ScoreBoardPage.propTypes = {};

export default ScoreBoardPage;
