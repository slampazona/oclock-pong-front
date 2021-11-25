/**
 * @module models/player
 */

/** Classe représentant le joueur 1 ou 2 */
class Player {
  /** Le composant de jeu */
  game;

  /** La position en X du paddle du joueur */
  x;

  /** La position en Y du paddle du joueur */
  y;

  /** La direction en Y du paddle du joueur */
  directionY = 0;

  /** Le score du joueur */
  score = 0;

  /** La largeur du paddle du joueur */
  paddleWidth = 15;

  /** La hauteur du paddle du joueur */
  paddleHeight = 90;

  /**
   * Permet l'instanciation
   * @param {Component} game - Le composant de jeu
   * @param {Number} number - Le numéro du joueur
   */
  constructor(game, number) {
    this.game = game;
    this.isPlayer1 = number === 1;

    const { props: { width: gameWidth, height: gameHeight } } = this.game;

    // On place le joueur 1 en haut et le 2 en bas
    this.x = this.isPlayer1 ? 0 : (gameWidth - this.paddleWidth);
    this.y = this.isPlayer1 ? 0 : (gameHeight - this.paddleHeight);
  }

  /**
   * Permet de mettre à jour la position du joueur à chaque fois que la fonction est appellée
   */
  update() {
    const { props: { height: gameHeight } } = this.game;

    this.y += this.directionY;

    if (this.y > gameHeight - this.paddleHeight) {
      this.y = gameHeight - this.paddleHeight;
    }
    if (this.y < 0) {
      this.y = 0;
    }
  }

  /**
   * Dessine le joueur dans le canvas de game
   */
  draw() {
    const { context, props: { width: gameWidth } } = this.game;
    context.rect(
      this.x,
      this.y,
      this.paddleWidth,
      this.paddleHeight,
    );
    context.fill();

    // Dessin du score
    context.font = '10rem VT323, Monospace';
    const playerZoneSize = gameWidth / 2;

    context.fillStyle = '#999999';
    if (this.isPlayer1) {
      context.fillText(this.score, playerZoneSize / 2, 120);
    }
    else {
      context.fillText(this.score, playerZoneSize + (playerZoneSize / 2), 120);
    }

    context.fillStyle = '#ffffff';
  }

  /**
   * Le joueur vient de marquer un point
   */
  win() {
    this.score += 1;
  }

  /**
   * Le joueur se dirige vers le haut
   * @param {Number} velocity - La vitesse à laquelle il monte
   */
  directionUp(velocity) {
    this.directionY = -velocity;
  }

  /**
   * Le joueur se dirige vers le bas
   * @param {Number} velocity - La vitesse à laquelle il descend
  */
  directionDown(velocity) {
    this.directionY = velocity;
  }
}

export default Player;
