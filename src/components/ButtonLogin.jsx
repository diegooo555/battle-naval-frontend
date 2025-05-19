import React from 'react'

function ButtonLogin({text, color, onClick}) {

    const colorClass = {
        brown: "bg-[#767039]",
        blue: "bg-[#25323A]",
    };

  return (
    <button className={`${colorClass[color]} text-white text-bold rounded-[4px] p-3 cursor-pointer text-3xl`} onClick={() => onClick()}>
        {text}
    </button>
  )
}

export default ButtonLogin