import React from 'react'
import Time from './Time'

const Profile = ({namePlayer, resultServer}) => {
  return (
    <div className='flex justify-center items-center w-[50%] gap-5'>
    <img src="/general.png" alt="icon-user-1" className='w-20 h-20'/>
    <div className="flex flex-col items-center justify-center">
        <span className='text-[#1500FF] font-bold text-2xl'>{namePlayer}</span>
        <Time resultServer={resultServer}/>
    </div>
</div>
  )
}

export default Profile