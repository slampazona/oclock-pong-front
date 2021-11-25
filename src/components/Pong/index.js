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
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
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
    window.requestAnimationFrame(this.loop);
    this.update();
    this.draw();
  }

  /**
   * Initialise le jeu en créant les joueurs et la balle
   */
  initializeGame() {
    const { ballSize } = this.props;

    this.player1 = new Player(this, 1);
    this.player2 = new Player(this, 2);
    this.ball = new Ball(this, ballSize);
    this.startGame();
  }

  /**
   * Démarre le jeu
   */
  startGame() {
    this.loop();
    this.ball.throw();
  }

  /**
   * Permet de mettre à jour les différentes entitées
   * Comme les positions, ou les collisions
   */
  update() {
    this.ball.update();
    this.player1.update();
    this.player2.update();
  }

  /**
   * Fonction qui dessine 1 image du jeu dans le canvas,
   * elle est appellée autant de fois qu'on veut dessiner le jeu
   */
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
  }

  render() {
    const { width, height } = this.props;
    return (
      <>
        <h1 className="gameTitle">O'Pong</h1>

        <div className="pong">
          <canvas
            ref={this.canvasRef}
            width={width}
            height={height}
          />
        </div>
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
