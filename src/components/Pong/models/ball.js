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
  }

  update() {
    if (!this.visible) {
      return false;
    }
    const { props: { width: gameWidth, height: gameHeight }, player1, player2 } = this.game;

    const nextXPos = this.directionX * this.speed;
    const nextYPos = this.directionY * this.speed;
    // Vérification des collision
    if ((this.x + nextXPos) > gameWidth) {
      return this.game.playerWin(player1);
    }
    if ((this.x + nextXPos) < 0) {
      return this.game.playerWin(player2);
    }

    if ((this.y + nextYPos) > gameHeight || (this.y + nextYPos) < 0) {
      this.directionY = -this.directionY;
    }

    this.x += nextXPos;
    this.y += nextYPos;

    if (this.isPaddlePlayerCollision(player1)) {
      this.directionX = -this.directionX;
      this.speed += 0.3;
    }
    if (this.isPaddlePlayerCollision(player2)) {
      this.directionX = -this.directionX;
      this.speed += 0.3;
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
      && this.x < player.x + (player.paddleWidth * (player.isPlayer1 ? 1 : 0))
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
