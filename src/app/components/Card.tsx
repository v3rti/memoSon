'use client'

import { useState, useRef } from 'react';

export default function Card({cardValue, checked, onClick} : {cardValue: number; checked: boolean; onClick: Function;}){

  return <div onClick={onClick} className={`${checked ? 'bg-[#8C9BA5]' : 'bg-[#fcfcfc]'} w-[100px] h-[100px] rounded-full flex items-center justify-center text-3xl font-medium`}>{checked ? cardValue : ""}</div>
}
