import React from 'react';

function RowNumbers() {
  return (
    <div className='grid grid-cols-11'>
      <div className='bg-[#534C4C] w-full h-full' />
      {[...Array(10)].map((_, index) => (
        <div key={index + 1} className='bg-[#534C4C] w-full h-full flex items-center justify-center text-white text-xl font-bold'>
          {index + 1}
        </div>
      ))}
    </div>
  );
}

export default RowNumbers;