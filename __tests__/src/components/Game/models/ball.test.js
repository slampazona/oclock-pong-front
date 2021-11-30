import Ball from 'src/components/Game/models/ball';

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

describe('Model Ball', () => {
  it('should get random direction -1, 0 or 1', () => {
    const randomDirection = Ball.getRandomDirection();
    expect(randomDirection).toBeGreaterThanOrEqual(-1);
    expect(randomDirection).toBeLessThanOrEqual(1);
  });
});
