import { useEffect, useState } from 'react';

export interface ITimerProps {
  isRunning: boolean;
}

export function Timer({ isRunning }: ITimerProps) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    setTimer(0);

    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const minutes = Math.round(timer / 60);
  const seconds = timer % 60;

  return (
    <div>
      <div>
        <h1>
          Timer: {minutes < 10 && '0'}
          {minutes}: {seconds < 10 && '0'}
          {seconds}
        </h1>
      </div>
    </div>
  );
}
