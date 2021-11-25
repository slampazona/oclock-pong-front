// == Import
import './styles.scss';
import React from 'react';
import PropType from 'prop-types';
import classNames from 'classnames';
import Player from './models/player';
import Ball from './models/ball';
import KeyboardKey from './KeyboardKey';
import EndGameBoard from './EndGameBoard';

// == Composant
class Pong extends React.Component {
  state = {
    gameStarted: false,
    gameFinished: false,
  }

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.requestAF = null;
    this.player1 = null;
    this.player2 = null;
    this.context = null;
  }

  componentDidMount() {
    this.context = this.canvasRef.current.getContext('2d');
    this.initializeGame();
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
    cancelAnimationFrame(this.requestAF);
  }

  /**
   * Permet de récupérer les entrées clavier afin de faire bouger les paddles
   * @param {KeyboardEvent} event
   */
  onKeyDown = (event) => {
    if (event.code === 'KeyW') {
      this.player1.directionUp(15);
    }
    else if (event.code === 'KeyS') {
      this.player1.directionDown(15);
    }

    if (event.code === 'ArrowUp') {
      this.player2.directionUp(15);
    }
    else if (event.code === 'ArrowDown') {
      this.player2.directionDown(15);
    }
  }

  /**
   * Permet de récupérer le laché d'une entrées clavier
   * afin d'arreter de faire bouger les paddles
   * @param {KeyboardEvent} event
   */
  onKeyUp = (event) => {
    if (event.code === 'KeyW') {
      this.player1.directionUp(0);
    }
    else if (event.code === 'KeyS') {
      this.player1.directionDown(0);
    }

    if (event.code === 'ArrowUp') {
      this.player2.directionUp(0);
    }
    else if (event.code === 'ArrowDown') {
      this.player2.directionDown(0);
    }
  }

  /**
   * C'est la boucle de jeu qui permet de raffraichir le canvas toutes les millisecondes
   */
  loop = () => {
    // eslint-disable-next-line react/destructuring-assignment
    if (!this.state.gameStarted) return;
    this.requestAF = window.requestAnimationFrame(this.loop);
    this.update();
    this.draw();
  }

  /**
   * Initialise le jeu en créant les joueurs et la balle
   */
  initializeGame = () => {
    const { ballSize } = this.props;

    this.player1 = new Player(this, 1);
    this.player2 = new Player(this, 2);
    this.ball = new Ball(this, ballSize);
    this.draw();
    this.startGame();
  }

  /**
   * Démarre le jeu
   */
  startGame = () => {
    this.setState({
      gameStarted: true,
      gameFinished: false,
    }, () => {
      this.loop();
      this.ball.throw();
    });
  }

  stopGame = () => {
    cancelAnimationFrame(this.requestAF);
    this.setState({
      gameStarted: false,
      gameFinished: true,
    }, () => {
      // setTimeout(this.drawFinish);
    });
  }

  drawFinish = () => {
    const context = this.canvasRef.current.getContext('2d');
    const { props } = this;
    const { width, height } = props;

    const rectWidth = width * 0.66;

    // On vide le dessin précédent
    context.clearRect((0), 0, width, height);

    // Dessin de la ligne verticale
    context.strokeStyle = '#fff';
    context.beginPath();
    context.setLineDash([10, 15]);
    context.strokeRect((width * 0.3) / 2, 30, rectWidth, 150);
    context.fillStyle = '#ffffff';
    context.font = '10rem VT323, Monospace';
    context.fillText('SCORE', (width / 2) - 175, 150);

    context.font = '5rem VT323, Monospace';
    context.fillText('Player 1', 100, 250);
    context.fillText('Player 2', width - 350, 250);
    context.font = '10rem VT323, Monospace';
    context.fillText(this.player1.score, 175, 400);
    context.fillText(this.player2.score, width - 275, 400);
    // context.moveTo(playerZoneSize, 10);
    // context.lineTo(playerZoneSize, height);
    // context.stroke();
  }

  /**
   * Permet de mettre à jour les différentes entitées
   * Comme les positions, ou les collisions
   */
  update = () => {
    this.ball.update();
    this.player1.update();
    this.player2.update();
  }

  /**
   * Fonction qui dessine 1 image du jeu dans le canvas,
   * elle est appellée autant de fois qu'on veut dessiner le jeu
   */
  draw = () => {
    const context = this.canvasRef?.current?.getContext('2d');
    if (!context) return;
    const { props } = this;
    const { width, height } = props;

    // Calcul de la taille d'une zone de joueur
    const playerZoneSize = width / 2;

    // On vide le dessin précédent
    context.clearRect(0, 0, width, height);

    // Dessin de la ligne verticale
    context.strokeStyle = '#fff';
    context.beginPath();
    context.setLineDash([10, 15]);
    context.moveTo(playerZoneSize, 10);
    context.lineTo(playerZoneSize, height);
    context.stroke();

    // Dessin des joueurs
    this.player1.draw();
    this.player2.draw();

    // Dessin de la balle
    this.ball.draw();
  }

  /**
   * En cas de point marqué par un joueur
   * @param {Player} player - Le joueur qui a marqué le point
   */
  playerWin(player) {
    player.win();
    this.ball.throw();
    if (player.score >= 3) {
      this.stopGame();
    }
  }

  render() {
    const { width, height } = this.props;
    const { gameStarted, gameFinished } = this.state;

    return (
      <>
        <h1 className="gameTitle">O'Pong</h1>

        {gameFinished ? (
          <EndGameBoard
            player1={this.player1}
            player2={this.player2}
            onRestartPress={this.initializeGame}
          />
        ) : (
          <div className="pongContainer">
            <div className={classNames('leftKeys', { paused: gameStarted })}>
              <KeyboardKey keyValue="Z" />
              <KeyboardKey keyValue="S" />
            </div>
            <div className="pong">
              <canvas
                ref={this.canvasRef}
                width={width}
                height={height}
              />
            </div>

            <div className={classNames('rightKeys', { paused: gameStarted })}>
              <KeyboardKey keyValue="↑" />
              <KeyboardKey keyValue="↓" />
            </div>
          </div>
        )}

      </>
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
