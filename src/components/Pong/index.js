// == Import
import './styles.scss';
import React from 'react';
import PropType from 'prop-types';

// == Composant
class Pong extends React.Component {
  state = {
    player1Score: 0,
    player2Score: 0,
  }

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.context = null;
  }

  componentDidMount() {
    this.context = this.canvasRef.current.getContext('2d');
    this.startGame();
  }

  componentWillUnmount() {
    clearInterval(this.gameLoop);
    this.gameLoop = null;
  }

  startGame() {
    // C'est la boucle de jeu qui permet de raffraichir le canvas toutes les millisecondes
    this.gameLoop = setInterval(() => {
      this.draw();
    }, 1);
  }

  draw() {
    const { context, props, state } = this;
    const { width, height, ballSize } = props;

    // Calcul de la taille d'une zone de joueur
    const playerZoneSize = width / 2;

    // Dessin du score
    context.font = '6rem Monospace';
    context.fillText(state.player1Score, playerZoneSize / 2, 100);
    context.fillText(state.player2Score, playerZoneSize + (playerZoneSize / 2), 100);
    context.fillStyle = '#DEDEDE';
    context.save();

    // Dessin de la ligne verticale
    context.beginPath();
    context.setLineDash([10, 15]);
    context.moveTo(playerZoneSize, 10);
    context.lineTo(playerZoneSize, height);
    context.stroke();
    context.strokeStyle = '#fff';
    context.save();

    // Dessin d'un joueur
    context.rect(10, 10, 10, 75);
    context.fill();

    // Dessin du joueur 2
    context.rect(width - 20, 10, 10, 75);
    context.fill();

    // Dessin de la balle
    context.rect(playerZoneSize - (ballSize / 2), height / 2, ballSize, ballSize);
    context.fill();
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
