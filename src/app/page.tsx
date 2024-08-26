'use client'

import { useEffect, useState } from 'react';
import Card from "./components/Card";

export default function Home() {

  const [reveal, setReveal] = useState(0);
  const [cards, setCards] = useState([{num: 0, checked: false, revealed: false}]);
  const [nums, setNums] = useState([]);

  const numbers = [1,2,3,5,6,7,8];
  let newNumbers = [...numbers, ...numbers].sort();

  useEffect(() => {
    for(let i = 0; i < newNumbers.length; i++){
      let x = Math.floor(Math.random() * newNumbers.length);
      let temp = newNumbers[i];
      newNumbers[i] = newNumbers[x];
      newNumbers[x] = temp;
    }

    setNums(newNumbers);

    setCards(newNumbers.map(num => {
      return {num: num, checked: false, revealed: false}
    }));

  }, [])

  useEffect(() => {
    console.log(nums)
    console.log(cards);
  }, [nums])

  const revealCard = (i: number) => {

    const cardsCopy = [...cards];
    const checkCard = cards[i];
    checkCard.checked = true;
    cardsCopy[i] = checkCard;
    setReveal(reveal + 1);
    console.log(i)
    if(reveal < 2){
      setCards(cardsCopy);
    }else{
      const newCards = cardsCopy.map((card, idx) => {
        if(card.num === cardsCopy[i].num && i !== idx && card.checked === true){
          card.revealed = true;
          cardsCopy[i].revealed = true;
        }
        card.revealed ? card.checked = true : card.checked = false;
        return card;
      })
      setCards(newCards)
      console.log(newCards)
      setReveal(0);
    }
  }

  return (
   <div className="flex p-16 flex-col gap-6 h-screen items-center justify-center">
      <div className="flex gap-4 w-[45%] flex-wrap" >
        {cards && cards.map((card, i) => <Card onClick={() => {
          revealCard(i);
        }} key={i} checked={card.checked} cardValue={card.num} />)}
      </div>

   </div>
  );
}
