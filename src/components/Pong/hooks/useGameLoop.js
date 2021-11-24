import { useEffect, useCallback } from 'react';

export default (onLoop) => {
  useEffect(() => {
    const gameLoop = setInterval(onLoop, 1);
    return () => clearInterval(gameLoop);
  }, []);
};
