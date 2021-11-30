import Game from 'src/components/Game';
import Player from 'src/components/Game/models/player';

jest.mock('src/components/Game')

let game = null;
beforeAll(() => {
  game = {
    props: {
      width: 800,
      height: 600
    }
  };
});

describe('Model Player', () => {
  it('should be increment score if win', () => {
    const player = new Player(game, 1);
    expect(player.score).toBe(0);
    player.win();
    expect(player.score).toBe(1);
  });
  
  it('should be move if push up', () => {
    const player = new Player(game, 1);
    expect(player.directionY).toBe(0);
    player.directionUp(20);
    expect(player.directionY).toBe(-20);
  });

  it('should be move if push down', () => {
    const player = new Player(game, 1);
    expect(player.directionY).toBe(0);
    player.directionDown(20);
    expect(player.directionY).toBe(20);
  });

  it('should move twice if update', () => {
    const player = new Player(game, 1);
    const positionY = player.y;
    const velocity = 20;
    player.directionDown(velocity);
    // Update twice
    player.update();
    player.update();
    expect(player.directionY).toBe(velocity);
    expect(player.y).toBe(positionY + (velocity * 2));
  });
});
