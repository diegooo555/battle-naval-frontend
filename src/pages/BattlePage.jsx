import React, { useEffect, useState } from "react";
import BoardPlayer from "../components/board_player/BoardPlayer";
import BoardOponent from "../components/board_oponent/BoardOponent";
import UsersProfiles from "../components/UsersProfiles";
import Waiting from "../components/Waiting";
import { useNavigate, useParams } from "react-router";
import { useWebSocket } from "../context/useWebSocket";
import TimeContext from "../context/TimeContext";


function BattlePage() {
  const {gameId, username, playerId, opponent} = useParams();
  const {stompClient, connect, disconnect, sendMessage} = useWebSocket();
  const [dataGameRoom, setDataGameRoom] = useState(null);
  const [time, setTime] = useState(0);
  const [isCurrentTurn, setIsCurrentTurn] = useState(false);
  const player = {
    username,
    gameId,
    playerId
  }

  const navigate = useNavigate();

  if(dataGameRoom != null){
    if(dataGameRoom.winner != null){
      if(dataGameRoom.winner.playerId === playerId){
        navigate("/winner/" + username);
      }else{
        navigate("/loser/" + username);
      }
    }
  }

  useEffect(() => {
    const startBattle = async () => {
      try {
        await connect(stompClient, username, gameId, setDataGameRoom);
        const player = {name: username, gameId}
        console.log(player)
        sendMessage(stompClient, player, "gameRoom");
      } catch (error) {
        console.error("❌ Error al conectar:", error);
      }
    }
    startBattle();
    return () => {
      disconnect(stompClient);
    }
  }, []);

  useEffect(() => {
    setIsCurrentTurn(dataGameRoom?.currentTurn == playerId);
    setTime(0);
  },[dataGameRoom, isCurrentTurn, playerId])

  const handleShot = (row, col) => {
    const shot = {
      position : {
        x: row,
        y: col,
      }, 
      result: "FAIL",
    }

    const dataShot = {
      player,
      shot
    }
    sendMessage(stompClient, dataShot, "shot");
    setTime(0);
  }

  return (   
    <TimeContext.Provider value={{time, setTime, isCurrentTurn, setIsCurrentTurn, player}}>
      {dataGameRoom ? 
      <div className="w-screen h-screen bg-[#EBE8DB] flex  flex-col">
        <UsersProfiles namePlayer1={username} namePlayer2={opponent} currentTurn={dataGameRoom?.currentTurn == playerId}/>
        <div className="w-full flex justify-center items-center">
          <BoardPlayer players={dataGameRoom.listPlayers} playerId={playerId}/>
          <BoardOponent sendShot={handleShot} players={dataGameRoom.listPlayers} playerId={playerId}/>
        </div>
      </div> : <Waiting/>}
    </TimeContext.Provider>
  );
}

export default BattlePage;