import React, { useContext } from 'react'
import TimePlayer from './board_player/TimePlayer';
import TimeContext from '../context/TimeContext';

const UsersProfiles = ({namePlayer1, namePlayer2}) => {

    const {isCurrentTurn} = useContext(TimeContext);
    
  return (
    <div className='w-full flex h-28 justify-around p-5'>
        <div className='flex justify-center items-center w-[50%] gap-5'>
            <img src="/general.png" alt="icon-user-1" className='w-20 h-20'/>
            <div className="flex flex-col items-center justify-center">
                <span className='text-[#1500FF] font-bold text-2xl'>{namePlayer1}</span>
                {!isCurrentTurn ? <TimePlayer/> : <span className="font-bold text-2xl">{" "}</span>}
            </div>
        </div>
        <img src="/vs.png" alt="vs-image" className='w-20 h-20'/>

        <div className='flex justify-center items-center w-[50%] gap-5'>
            <img src="/general2.png" alt="icon-user-2" className='w-20 h-20'/>
            <div className="flex flex-col items-center justify-center">
                <span className='text-[#FF0000] font-bold text-2xl'>{namePlayer2}</span>
                {isCurrentTurn ? <TimePlayer/> :  <span className="font-bold text-2xl">{" "}</span>}
            </div>
        </div>
    </div>
  )
}

export default UsersProfiles;