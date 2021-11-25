/**
 * @module models/ball
 */

import soundPlayer from 'src/assets/sounds/pong_player.wav';
import soundWall from 'src/assets/sounds/pong_wall.wav';
import soundWin from 'src/assets/sounds/pong_win.wav';

/** Classe représentant la balle */
class Ball {
  /** Le composant de jeu */
  game;

  /** La taille de la balle en largeur et hauteur c'est un carré */
  size;

  /** La position en X de la balle */
  x;

  /** La position en Y de la balle */
  y;

  /** La direction en X de la balle */
  directionX = -1;

  /** La direction en Y de la balle */
  directionY = -1;

  /** La vitesse de la balle */
  speed = 0;

  /** Affiche ou masque la balle */
  isVisible = false;

  /**
   * Permet d'instancier la classe
   * @param {Component} game
   * @param {Number} size
   */
  constructor(game, size = 15) {
    this.game = game;
    this.size = size;
    this.x = 0;
    this.y = 0;

    this.soundPlayer = new Audio(soundPlayer);
    this.soundWall = new Audio(soundWall);
    this.soundWin = new Audio(soundWin);
  }

  /**
   * Permet de mettre à jour la position de la balle à chaque fois que la fonction est appellée
   */
  update() {
    if (!this.isVisible) {
      return;
    }
    const { props: { width: gameWidth, height: gameHeight }, player1, player2 } = this.game;

    const nextXPos = this.directionX * this.speed;
    const nextYPos = this.directionY * this.speed;
    // Vérification des collision
    if ((this.x + nextXPos) > gameWidth) {
      this.game.playerWin(player1);
      this.soundWin.play();
      return;
    }
    if ((this.x + nextXPos) < 0) {
      this.game.playerWin(player2);
      this.soundWin.play();
      return;
    }

    if ((this.y + nextYPos + this.size) > gameHeight || (this.y + nextYPos) < 0) {
      this.directionY = -this.directionY;
      this.soundWall.play();
    }

    this.x += nextXPos;
    this.y += nextYPos;

    [player1, player2].forEach((player) => {
      if (this.isPaddlePlayerCollision(player)) {
        this.playerBounce(player);
      }
    });
  }

  /**
   * La balle vient de heurter le paddle d'un joueur, elle va donc rebondir
   * Cette fonction défini vers où elle va aller suivant où elle a tapé
   * Et elle fait jouer un son aussi
   * @param {Player} player
   */
  playerBounce(player) {
    this.soundPlayer.play();
    if (this.speed < 12) {
      this.speed += 0.3;
    }

    if (this.isTopPaddlePlayerCollision(player)) {
      this.directionX = -this.directionX;
      this.directionY = -Math.abs(Ball.getRandomDirection());
    }
    else if (this.isBottomPaddlePlayerCollision(player)) {
      this.directionX = -this.directionX;
      this.directionY = Math.abs(Ball.getRandomDirection());
    }
    else {
      this.directionX = -this.directionX;
      this.directionY = 0;
    }
  }

  /**
   * Lance la balle, permet de visualiser les étapes grace à des setTimeout
   */
  throw() {
    this.isVisible = false;
    setTimeout(() => {
      const { props: { width: gameWidth, height: gameHeight } } = this.game;
      const playerZoneSize = gameWidth / 2;

      this.x = playerZoneSize - (this.size / 2);
      this.y = (gameHeight / 2) - (this.size / 2);
      this.directionX = 0;
      this.directionY = 0;
      this.isVisible = true;
      setTimeout(() => {
        this.directionY = Ball.getRandomDirection();
        this.directionX = this.directionY * 2;
        this.speed = 3;
      }, 1000);
    }, 1000);
  }

  /**
   * Renvoie une direction random ( -1, 0, 1)
   */
  static getRandomDirection() {
    return (Math.round(Math.random()) * (Math.random() >= 0.5 ? 1 : -1)) || 1;
  }

  /**
   * Défini si la balle vient d'entrer en collision avec le paddle d'un joueur
   */
  isPaddlePlayerCollision(player) {
    return player.x < this.x + this.size
      && player.y < this.y + this.size
      && this.x < player.x + player.paddleWidth
      && this.y < player.y + player.paddleHeight;
  }

  /**
   * Défini si la balle vient d'entrer en collision avec le haut du paddle d'un joueur
   */
  isTopPaddlePlayerCollision(player) {
    return player.x < this.x + this.size
      && player.y < this.y + this.size
      && this.x < player.x + player.paddleWidth
      && this.y < player.y + ((player.paddleHeight / 5) * 2);
  }

  /**
   * Défini si la balle vient d'entrer en collision avec le bas du paddle d'un joueur
   */
  isBottomPaddlePlayerCollision(player) {
    return player.x < this.x + this.size
      && (player.y + ((player.paddleHeight / 5) * 4)) < this.y + this.size
      && this.x < player.x + player.paddleWidth
      && this.y < player.y + player.paddleHeight;
  }

  /**
  * Dessine la balle dans le canvas de game, sauf si elle n'est pas visible
  */
  draw() {
    if (!this.isVisible) {
      return;
    }
    const { context } = this.game;

    context.rect(this.x, this.y, this.size, this.size);
    context.fill();
  }
}

export default Ball;
