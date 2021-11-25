import soundPlayer from 'src/assets/sounds/pong_player.wav';
import soundWall from 'src/assets/sounds/pong_wall.wav';
import soundWin from 'src/assets/sounds/pong_win.wav';

class Ball {
  game;

  size;

  x;

  y;

  directionX = -1;

  directionY = -1;

  speed = 3;

  visible = false;

  constructor(game, size = 15) {
    this.game = game;
    this.size = size;
    this.x = 0;
    this.y = 0;

    this.soundPlayer = new Audio(soundPlayer);
    this.soundWall = new Audio(soundWall);
    this.soundWin = new Audio(soundWin);
  }

  update() {
    if (!this.visible) {
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

  throw() {
    this.visible = false;
    setTimeout(() => {
      const { props: { width: gameWidth, height: gameHeight } } = this.game;
      const playerZoneSize = gameWidth / 2;

      this.x = playerZoneSize - (this.size / 2);
      this.y = gameHeight / 2;
      this.directionX = 0;
      this.directionY = 0;
      this.visible = true;
      setTimeout(() => {
        this.directionY = Ball.getRandomDirection();
        this.directionX = this.directionY * 2;
        this.speed = 3;
      }, 1000);
    }, 1000);
  }

  static getRandomDirection() {
    return (Math.round(Math.random()) * (Math.random() >= 0.5 ? 1 : -1)) || 1;
  }

  isPaddlePlayerCollision(player) {
    return player.x < this.x + this.size
      && player.y < this.y + this.size
      && this.x < player.x + player.paddleWidth
      && this.y < player.y + player.paddleHeight;
  }

  isTopPaddlePlayerCollision(player) {
    return player.x < this.x + this.size
      && player.y < this.y + this.size
      && this.x < player.x + player.paddleWidth
      && this.y < player.y + ((player.paddleHeight / 5) * 2);
  }

  isBottomPaddlePlayerCollision(player) {
    return player.x < this.x + this.size
      && (player.y + ((player.paddleHeight / 5) * 4)) < this.y + this.size
      && this.x < player.x + player.paddleWidth
      && this.y < player.y + player.paddleHeight;
  }

  draw() {
    if (!this.visible) {
      return;
    }
    const { context } = this.game;

    context.rect(this.x, this.y, this.size, this.size);
    context.fill();
  }
}

export default Ball;
