// == Import
import './styles.scss';
import React from 'react';
import PropType from 'prop-types';
import Player from './models/player';
import Ball from './models/ball';

// == Composant
class Pong extends React.Component {
  state = {}

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.player1 = null;
    this.player2 = null;
    this.context = null;
  }

  componentDidMount() {
    this.context = this.canvasRef.current.getContext('2d');
    this.initializeGame();
  }

  componentWillUnmount() {
    clearInterval(this.gameLoop);
    this.gameLoop = null;
  }

  loop = () => {
    // C'est la boucle de jeu qui permet de raffraichir le canvas toutes les millisecondes
    this.update();
    this.draw();
    window.requestAnimationFrame(this.loop);
  }

  initializeGame() {
    const { ballSize } = this.props;

    this.player1 = new Player(this, 1);
    this.player2 = new Player(this, 2);
    this.ball = new Ball(this, ballSize);
    this.startGame();
  }

  startGame() {
    this.loop();
    this.ball.throw();
  }

  update() {
    this.ball.update();
    this.player1.update();
    this.player2.update();
  }

  draw() {
    const { context, props } = this;
    const { width, height } = props;

    // Calcul de la taille d'une zone de joueur
    const playerZoneSize = width / 2;

    // On vide le dessin précédent
    context.clearRect(0, 0, width, height);

    // Dessin de la ligne verticale
    context.beginPath();
    context.setLineDash([10, 15]);
    context.moveTo(playerZoneSize, 10);
    context.lineTo(playerZoneSize, height);
    context.stroke();
    context.strokeStyle = '#fff';
    context.save();

    // Dessin des joueurs
    this.player1.draw();
    this.player2.draw();

    // Dessin de la balle
    this.ball.draw();
  }

  playerWin(player) {
    player.win();
    this.ball.throw();
  }

  render() {
    const { width, height } = this.props;
    return (
      <div className="pong">
        <canvas
          ref={this.canvasRef}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

Pong.propTypes = {
  width: PropType.number,
  height: PropType.number,
  ballSize: PropType.number,
};

Pong.defaultProps = {
  width: 800,
  height: 600,
  ballSize: 15,
};

// == Export
export default Pong;
