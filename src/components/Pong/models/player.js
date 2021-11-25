class Player {
  game;

  x;

  y;

  score = 0;

  paddleWidth = 10;

  paddleHeight = 75;

  constructor(game, number) {
    this.game = game;
    this.isPlayer1 = number === 1;

    const { canvasRef, props: { width: gameWidth, height: gameHeight } } = this.game;

    this.x = this.isPlayer1 ? 20 : (gameWidth - 75);
    this.y = this.isPlayer1 ? 10 : (gameHeight - 10 - this.paddleHeight);

    const rect = canvasRef.current.getBoundingClientRect();
    document.addEventListener('mousemove', (event) => {
      this.y = event.clientY - rect.top;
    });
  }

  update() {
    const { props: { height: gameHeight } } = this.game;

    if (this.y > gameHeight - this.paddleHeight) {
      this.y = gameHeight - this.paddleHeight;
    }
    if (this.y < 0) {
      this.y = 0;
    }
  }

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
    context.font = '6rem Monospace';
    const playerZoneSize = gameWidth / 2;
    if (this.isPlayer1) {
      context.fillText(this.score, playerZoneSize / 2, 100);
    }
    else {
      context.fillText(this.score, playerZoneSize + (playerZoneSize / 2), 100);
    }
    context.fillStyle = '#DEDEDE';
    // context.save();
  }

  win() {
    this.score += 1;
  }
}

export default Player;
