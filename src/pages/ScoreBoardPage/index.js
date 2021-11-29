/**
* @module src/components/ScoreBoard
*/
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useBackgroundMusic } from 'src/hooks';
import ScoreBoard from 'src/components/ScoreBoard';
import api from 'src/api';
import './styles.scss';

const ScoreBoardPage = () => {
  const { playMusic } = useBackgroundMusic();
  const [statusMessage, setStatusMessage] = useState(null);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    playMusic();
    setStatusMessage('Récupération des données en cours ...');
    api.get('/score', { params: { limit: 15 } })
      .then((response) => response?.data?.data || [])
      .then((_scores) => {
        setStatusMessage(null);
        setScores(_scores);
      })
      .catch((error) => {
        setStatusMessage(error.message);
      });
  }, []);

  return (
    <div className="scoreBoardPage">
      <h2 className="scoreBoardPage__title">ScoreBoard</h2>
      <ScoreBoard
        message={statusMessage}
        scores={scores}
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
