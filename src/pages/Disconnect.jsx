import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { useWebSocket } from '../context/useWebSocket.js';

const Disconnect = () => {
  const {username} = useParams();

    const {restoreInitialState} = useWebSocket();
  
    useEffect(() => {
      restoreInitialState();
    }
    , []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-400 to-gray-300 text-white p-4 gap-4">

      <h1 className="text-5xl font-bold mb-2 text-amber-300">Tu Oponente se desconecto!</h1>
      <img src="/sad.png" alt="trofeo" width="350px" height="350px"/>
      <p className="text-3xl text-white font-bold">{username} ha terminado la partida.</p>
      <Link to="/" className="mt-6 px-6 py-4 bg-white text-amber-500 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition">
        Jugar otra vez
      </Link>
    </div>
  );
};

export default Disconnect;
