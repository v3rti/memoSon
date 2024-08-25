'use client'

import { useState } from 'react';
import Card from "./components/Card";

export default function Home() {

  const numbers = [1,2,3,4,5,6,7,8,9,10];
  let newNumbers = [...numbers, ...numbers].sort();

  for(let i = 0; i < newNumbers.length; i++){
    let x = Math.floor(Math.random() * newNumbers.length);
    let temp = newNumbers[i];
    newNumbers[i] = newNumbers[x];
    newNumbers[x] = temp;
  }

  const [cloneClicked, setCloneClicked] = useState(0);
  const [clickedNumber, setClickedNumber] = useState([0,0]);
  const [doublesFound, setDoublesFound] = useState(false);

  const handleNumberClick = (e) => {
    clickedNumber[0] === 0 ? setClickedNumber([e.target, 0]) : setClickedNumber([clickedNumber[0], e.target]);
    clickedNumber[0] !== 0 && clickedNumber[0] === clickedNumber[1] ? setDoublesFound(true) : "";
    console.log(clickedNumber);
    console.log(doublesFound)
  }

  return (
   <div className="flex p-16 flex-col gap-6 h-screen items-center justify-center">
      <div className="flex gap-4 w-[45%] flex-wrap" >
        {newNumbers.map((num, i) => <Card key={i} cardValue={num} numberClick={(e) => handleNumberClick(e)}/>)}
      </div>

   </div>
  );
}
