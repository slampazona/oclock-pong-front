/**
* @module src/components/Pong
*/
import {
  Routes,
  Route,
} from 'react-router-dom';
import LaunchPage from 'src/pages/LaunchPage';
import GamePage from 'src/pages/GamePage';
import ScoreBoard from 'src/pages/ScoreBoardPage';

const Pong = () => (
  <Routes>
    <Route
      path="/"
      exact
      element={<LaunchPage />}
    />
    <Route
      path="/game"
      exact
      element={<GamePage />}
    />
    <Route
      path="/scoreboard"
      exact
      element={<ScoreBoard />}
    />
  </Routes>
);

export default Pong;
