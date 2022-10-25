import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [color, setColor] = useState('');
  const [answers, setAnswers] = useState([]);
  const [wrong, setWrong] = useState(null);
  const [correct, setCorrect] = useState(null);

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function pickColor() {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => Math.random() - 0.5
      )
    );
  }

  function handleClick(answer) {
    if (color === answer) {
      setCorrect(true);
      setWrong(false);
      pickColor();
    } else {
      setWrong(true);
      setCorrect(false);
      pickColor();
    }
  }

  useEffect(() => {
    pickColor();
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="guessMe" style={{ background: color }}></div>
        <div>
          {answers.map((answer) => (
            <button onClick={() => handleClick(answer)} key={answer}>
              {answer}
            </button>
          ))}
        </div>
        <div>
          {correct && <h1 className="correct">Correct!</h1>}
          {wrong && <h1 className="wrong">Worng!</h1>}
        </div>
      </div>
    </div>
  );
}
