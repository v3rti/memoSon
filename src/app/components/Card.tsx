'use client'

import { useState, useRef } from 'react';

export default function Card({checked, cardValue, numberClick} : {checked: boolean; cardValue: number; numberClick: Function}){

  const [isChecked, setIsChecked] = useState(false);

  const handleClick = (e) => {
    setIsChecked(!isChecked);
    console.log(cardValue);
  }

  return <div onClick={e => {
    handleClick(e);
    numberClick(e);
  }} className={`${isChecked ? 'bg-[#8C9BA5]' : 'bg-[#fcfcfc]'} w-[100px] h-[100px] rounded-full flex items-center justify-center text-3xl font-medium`}>{isChecked ? cardValue : ""}</div>
}
