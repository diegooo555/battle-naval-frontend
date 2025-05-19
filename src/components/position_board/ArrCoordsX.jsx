import React from 'react'
import { ARR_COORDS_X } from '../../lib/constants.js'

const ArrCoordsX = () => (
    Array.from({length: 11}).map((_, col) => (
        <div className="w-10 h-10 flex items-center justify-center font-bold select-none bg-[#534C4C] text-white text-xl" key={col}>
          {ARR_COORDS_X[col]}
        </div>
    ))
)

export default ArrCoordsX