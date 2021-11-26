// == Import : npm
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

// == Import : local
import Pong from 'src/components/Pong';
import BackgroundMusicProvider from 'src/providers/BackgroundMusicProvider';

render(
  <Router>
    <BackgroundMusicProvider>
      <Pong />
    </BackgroundMusicProvider>
  </Router>,
  document.getElementById('root'),
);
