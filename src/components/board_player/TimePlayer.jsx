import React, { useEffect, useContext } from "react";
import TimeContext from "../../context/TimeContext";
import { useWebSocket } from "../../context/useWebSocket.js";

function TimePlayer() {
  const { isCurrentTurn, setIsCurrentTurn, time, setTime, player } = useContext(TimeContext);
  const {stompClient, sendMessage} = useWebSocket();


  useEffect(() => {
    let timer;

    if (time >= 15) {
      setTime(0);
      setIsCurrentTurn(false);
      const objectPlayer = {
        name: player.username,
        gameId: player.gameId
      }
      sendMessage(stompClient, objectPlayer, "gameRoom");
      return;
    }

    if (time < 15 ) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [time, isCurrentTurn]);

  return (
    <span className={`${isCurrentTurn ? 'text-red-500' : 'text-[#1500FF]'} font-bold text-2xl`}>{15 - time}</span>
  ) 
}

export default TimePlayer;