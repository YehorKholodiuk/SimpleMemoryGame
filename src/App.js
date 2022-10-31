import React, {useEffect, useState} from "react";
import "./App.css";
import Board from './Board'

const emoji = ['🐳', '🚵🏻‍♀️', '👼', '🏀', '🌷', '☔️',];

export default function App() {

  const [cards, setCards] = useState([
    {id: 1, emoji: '', open: false},
    {id: 2, emoji: '', open: false},
    {id: 3, emoji: '', open: false},
    {id: 4, emoji: '', open: false},
    {id: 5, emoji: '', open: false},
    {id: 6, emoji: '', open: false},
    {id: 7, emoji: '', open: false},
    {id: 8, emoji: '', open: false},
    {id: 9, emoji: '', open: false},
    {id: 10, emoji: '', open: false},
    {id: 11, emoji: '', open: false},
    {id: 12, emoji: '', open: false},
  ])

  const [startGameToggle, setStartGameToggle] = useState(true);
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [historyId, setHistoryId] = useState([]);
  const [openClickable, setOpenClickable] = useState(false);
  const [result, setResult] = useState(0)

  const createCards = () => {
    const newCards = [...cards];
    for (let i = 0; i < emoji.length; i++) {
      for (let tm = 1; tm <= 2; tm++) {
        let j = Math.floor(Math.random() * 12);
        if (newCards[j].emoji === '') {
          newCards[j].emoji = emoji[i];
        } else {
          while (newCards[j].emoji !== '')
            j = Math.floor(Math.random() * 12);
          if (newCards[j].emoji === '') {
            newCards[j].emoji = emoji[i];
          }
        }
      }
    }
    setCards(newCards);
    setStartGameToggle(!startGameToggle);
    setOpenClickable(!openClickable);
  }

  const openCard = (cardId) => {
    let intoHistory;
    let intoHistoryId;
    const newCards = cards.map(el => {
      if (el.id === cardId) {
        intoHistory = el.emoji;
        intoHistoryId = el.id;
        return {...el, open: true}
      };
      return el;
    })
    setCards(newCards)
    setCount(count + 1);
    setHistory([...history, intoHistory])
    setHistoryId([...historyId, intoHistoryId])
  }

  const checkEquality = () => {
    if (count !== 0 && count % 2 === 0) {
      if (history[history.length - 1] !== history[history.length - 2]) {
        let newCards = cards.map(el => {
          if (el.id === historyId[historyId.length - 1] || el.id === historyId[historyId.length - 2])
            return {...el, open: false};
          return el;
        })
        setCards(newCards)
      }
    }
  }

  const howManyMoves = () => {
    let allMoves = 0
    console.log(cards.map(el => el.open).includes(true))
    if (!(cards.map(el => el.open).includes(false))) {
      allMoves = count / 2;
    }
    setResult(allMoves)
  }

  useEffect(() => {
    setTimeout(() => {
      checkEquality();
    }, 1000);
  }, [count])

  useEffect(() => {
    if (count > 12) {
      setTimeout(() => {
        howManyMoves();
      }, 600);
    }
  }, [count])

  return (
      <div className="App">
        <h1>Memory Game</h1>
        <button disabled={!startGameToggle} className='button' onClick={createCards}> Start game</button>
        <Board cards={cards} openCard={openCard} openClickable={openClickable}/>
        {result ? <div>
          <h2>{`You won in ${result} moves!`}</h2>
        </div> : null}
      </div>
  );
}

