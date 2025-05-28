import React, { useEffect, useState } from "react";
import BoardPlayer from "../components/board_player/BoardPlayer";
import BoardOponent from "../components/board_oponent/BoardOponent";
import UsersProfiles from "../components/UsersProfiles";
import WaitingBattle from "../components/WaitingBattle";
import { useNavigate, useParams } from "react-router";
import { useWebSocket } from "../context/useWebSocket";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TimeContext from "../context/TimeContext";


function BattlePage() {
  const {gameId, username, playerId, opponent} = useParams();
  const {stompClient, connect, disconnect, sendMessage, disconnectGame, restoreInitialState} = useWebSocket();
  const [dataGameRoom, setDataGameRoom] = useState(null);
  const [time, setTime] = useState(0);
  const [isCurrentTurn, setIsCurrentTurn] = useState(false);
  const [lastSunkShip, setLastSunkShip] = useState(null);

  const player = {
    username,
    gameId,
    playerId
  }

  const navigate = useNavigate();

useEffect(() => {
  if (dataGameRoom?.winner != null) {
    disconnect(stompClient);
    if (dataGameRoom.winner.playerId === playerId) {
      navigate("/winner/" + username);
    } else {
      navigate("/loser/" + username);
    }
  }

  if (dataGameRoom?.gameStatus === "DISCONNECTED") {
    navigate("/disconnect/" + username);
    disconnectGame(stompClient, player);
  }
}, [dataGameRoom]);


  useEffect(() => {
    const startBattle = async () => {
      try {
        await connect(stompClient, username, gameId, setDataGameRoom);
        const player = {name: username, gameId}
        sendMessage(stompClient, player, "gameRoom");
      } catch (error) {
        console.error("❌ Error al conectar:", error);
      }
    }
    startBattle();
  
    return () => {
      disconnect(stompClient);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      disconnectGame(stompClient, player);
      restoreInitialState();
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  
  

  useEffect(() => {
    setIsCurrentTurn(dataGameRoom?.currentTurn == playerId);
    setTime(0);

    if (dataGameRoom?.lastSunkShip !== null && dataGameRoom?.lastSunkShip !== undefined && dataGameRoom.lastSunkShip !== lastSunkShip) {
      const shipNames = ["Acorazado", "Destructor", "Cruzero", "Submarino", "Navío"];
      const shipName = shipNames[dataGameRoom.lastSunkShip] || "Barco";
      toast.success(`🚢 ¡${shipName} hundido!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      
      setLastSunkShip(dataGameRoom.lastSunkShip);
    }
  },[dataGameRoom, isCurrentTurn, lastSunkShip, playerId])

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
      <ToastContainer/>
      </div> : <WaitingBattle/>}
    </TimeContext.Provider>
  );
}

export default BattlePage;