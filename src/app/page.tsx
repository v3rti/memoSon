'use client'

import { useEffect, useState } from 'react';
import Card from "./components/Card";

export default function Home() {

  const [twoClicks, setTwoClicks] = useState(0);
  const [cards, setCards] = useState([{id: 0, num: 0, checked: false, revealed: false}]);
  const [nums, setNums] = useState([]);
  const [waiting, setWaiting] = useState(false);

  const numbers = [1,2,3,5,6,7,8,9,10,11,12,13];
  let newNumbers = [...numbers, ...numbers].sort();

  useEffect(() => {
    for(let i = 0; i < newNumbers.length; i++){
      let x = Math.floor(Math.random() * newNumbers.length);
      let temp = newNumbers[i];
      newNumbers[i] = newNumbers[x];
      newNumbers[x] = temp;
    }

    setNums(newNumbers);
    let id = 0;
    setCards(newNumbers.map(num => {
      id++;
      return {id: id, num: num, checked: false, revealed: false}
    }));

  }, [])

  useEffect(() => {
    console.log(nums)
    console.log(cards);
  }, [nums])

  const revealCard = (i: number) => {
    if(cards[i].checked || waiting){
      return;
    }

    let tempClicks = twoClicks + 1;

    setTwoClicks(twoClicks + 1);
    const cardsCopy = [...cards];
    cardsCopy[i].checked = true;

    if(tempClicks === 2){
      setWaiting(true);
      setTimeout(() => {
        cardsCopy.map((card) => {
          if(card.checked && card.num === cardsCopy[i].num && card.id !== cardsCopy[i].id){
            cardsCopy[i].revealed = true;
            card.revealed = true;
          }
          return card;
        })

        cardsCopy.map(card => {
          return card.revealed ? card.checked = true : card.checked = false
        })

        setTwoClicks(0);
        setCards(cardsCopy);
        setWaiting(false);
      }, 1500);
    }

    setCards(cardsCopy);
  }

  return (
   <div className="flex p-16 flex-col gap-6 h-screen items-center justify-center">
      <div className="flex gap-4 w-[45%] flex-wrap" aria-disabled="true">
        {cards && cards.map((card, i) => <Card onClick={() => {
          revealCard(i);
        }} key={i} checked={card.checked} cardValue={card.num} />)}
      </div>

   </div>
  );
}
