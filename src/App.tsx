import { useEffect, useState } from 'react';
import './App.css';
import { Timer } from './components/Timer';
import { api } from './api';
import { Card } from './components/Card';

export interface Card {
  id: string;
  answer: 'yes' | 'no';
  forced: boolean;
  image: string;
  guessedCorrectly: boolean | null;
}

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const promises = Array(9)
        .fill('')
        .map(() => {
          return api.get<Card>('');
        });

      const results = await Promise.all(promises);
      setCards(
        results.map((result) => ({
          ...result.data,
          guessedCorrectly: null,
          id: Math.random().toString(36).substring(7),
        }))
      );
    };
    isRunning && fetchData();

    return () => {};
  }, [isRunning]);

  useEffect(() => {
    if (
      cards.every((card) => card.guessedCorrectly !== null) &&
      cards.length > 0
    ) {
      setIsRunning(false);
    }
  }, [cards]);

  return (
    <div>
      <Timer isRunning={isRunning} />
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <div className="cards">
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            isRunning={isRunning}
            setCards={setCards}
          />
        ))}
      </div>

      <div className="">
        Correct: {cards.filter((card) => card.guessedCorrectly).length}
      </div>
    </div>
  );
}

export default App;
