import { MouseEventHandler } from "react";

export default function Card({cardValue, checked, onClick} : {cardValue: number; checked: boolean; onClick: MouseEventHandler<HTMLDivElement>;}){

  return <div onClick={onClick} className={`${checked ? 'bg-[#8C9BA5]' : 'bg-[#fcfcfc]'} cursor-pointer w-[50px] h-[50px] md:w-[100px] md:h-[100px] rounded-full flex items-center justify-center text-xl sm:text-3xl font-medium`}>{checked ? cardValue : ""}</div>
}
