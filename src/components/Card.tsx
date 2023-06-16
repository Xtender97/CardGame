import { useState } from 'react';
import { Card as ICard } from '../App';
import cls from 'classnames';
import './Card.css';

export interface ICardProps {
  card: ICard;
  isRunning: boolean;
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
}

export function Card({ card, isRunning, setCards }: ICardProps) {
  const [selected, setSelected] = useState(false);

  const setGuess = (answer: 'yes' | 'no') => {
    setCards((cards) =>
      cards.map((c) => {
        console.log(card === c);

        if (card.id === c.id) {
          return {
            ...card,
            guessedCorrectly: card.answer === answer,
          };
        }
        return c;
      })
    );
  };

  return (
    <div>
      <div
        className={cls('card', {
          correct: card.guessedCorrectly,
          wrong: card.guessedCorrectly === false,
        })}
        onClick={() => {
          if (!isRunning) return;
          setSelected(true);
        }}
      ></div>

      {selected && card.guessedCorrectly === null && (
        <div className="guess-buttons">
          <button
            onClick={() => {
              setGuess('yes');
              setSelected(false);
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setSelected(false);
              setGuess('no');
            }}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}
