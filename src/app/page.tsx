'use client'

import { useEffect, useState } from 'react';
import Card from "./components/Card";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [twoClicks, setTwoClicks] = useState(0);
  const [cards, setCards] = useState([{id: 0, num: 0, checked: false, revealed: false}]);
  const [waiting, setWaiting] = useState(false);
  const [restart, setRestart] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [players, setPlayers] = useState([{id: 1, score: 0}, {id: 2, score: 0}]);
  const [turn, setTurn] = useState(1);
  const [maxPlayers, setMaxPlayers] = useState(2)
  const [mode, setMode] = useState("classic");
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(0);

  const numbers = [1,2,3,5,6,7,8,9,10];
  let newNumbers = [...numbers, ...numbers].sort();

  useEffect(() => {
    for(let i = 0; i < newNumbers.length; i++){
      let x = Math.floor(Math.random() * newNumbers.length);
      let temp = newNumbers[i];
      newNumbers[i] = newNumbers[x];
      newNumbers[x] = temp;
    }

    let id = 0;
    setCards(newNumbers.map(num => {
      id++;
      return {id: id, num: num, checked: false, revealed: false}
    }));

    setPlayers([{id: 1, score: 0}, {id: 2, score: 0}]);
    setTurn(1);
    setMoves(0);
    setGameWon(0);
  }, [restart])

  const revealCard = (i: number) => {
    setGameStart(true);
    if(cards[i].checked || waiting){
      return;
    }

    let tempClicks = twoClicks + 1;

    setTwoClicks(twoClicks + 1);
    const cardsCopy = [...cards];
    cardsCopy[i].checked = true;

    console.log(`current player: ${turn}`)

    if(tempClicks === 2){
      setMoves(moves + 1);
      setWaiting(true);
      setTimeout(() => {
        const prevRevealed = cardsCopy.filter(card => card.revealed);
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
        const newRevealed = cardsCopy.filter(card => card.revealed);

        if(newRevealed > prevRevealed){
          const playersTemp = [...players];
          playersTemp.map(player => {
            player.id === turn ? player.score = player.score + 1 : player.score
            return player;
          })
          setPlayers(playersTemp);
          setTurn(turn);
          cards.filter(card => card.revealed).length === newNumbers.length && setGameWon(1);
        }else{
          turn === maxPlayers ? setTurn(1) : setTurn(turn + 1);
        }

        console.log(players);

        setTwoClicks(0);
        setCards(cardsCopy);
        setWaiting(false);
      }, 1000);
    }
  }

  return (
   <div className="relative mt-6 flex p-16 flex-col gap-6 h-screen items-center justify-center w-[380px] md:w-[1000px] 2xl:w-[810px] mx-auto">
      <div className={`${gameWon ? '' : 'hidden'} text-4xl bg-white p-6 rounded-2xl absolute border border-black`}>Player {players[0].score > players[1].score ? "1" : "2"} Won!</div>
      <div className={`${inter.className} text-base sm:text-xl text-white font-medium flex justify-center md:justify-end gap-4 w-full mb-4`}>
        <div className={`${gameStart ? "block" : "hidden"}  px-5 py-2 text-black bg-white font-semibold rounded-3xl cursor-pointer`} onClick={() => {
          setRestart(!restart);
          setGameStart(false);
        }}>Restart</div>
        <div className="px-5 py-2 bg-[#8C9BA5] rounded-3xl">Players: 2</div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {cards && cards.map((card, i) => <Card onClick={() => {
          revealCard(i);
        }} key={i} checked={card.checked} cardValue={card.num} />)}
      </div>
      <div className='w-full mt-4 text-base sm:text-2xl text-white font-medium flex justify-between'>
        <div className='flex bg-black w-fit px-4 py-2 rounded-xl gap-6'>
          <p>Time:</p>
          <p>00:00</p>
        </div>
        <div className='flex bg-black w-fit px-4 py-2 rounded-xl gap-6'>
          Moves: {moves}
        </div>
      </div>
      <div>
        <div className='flex gap-4'>
          {players && players.map(player => {
            return <div key={player.id} className={`${turn === player.id ? "bg-green-700" : "bg-black"}  h-[80px] sm:h-[120px] w-[120px] text-white text-base sm:text-xl font-bold text-center py-2 sm:py-3 rounded-2xl`}>
              <p>Player {player.id}</p>
              <p className='mt-2 sm:mt-4 text-lg sm:text-3xl'>{player.score}</p>
            </div>
          }
          )}
        </div>
      </div>
   </div>
  );
}
