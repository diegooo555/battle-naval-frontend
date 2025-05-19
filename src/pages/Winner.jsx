import React from 'react';
import { Link, useParams } from 'react-router';

const Winner = () => {


  const {username} = useParams();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-cyan-400 text-white p-4 gap-4">

      <h1 className="text-5xl font-bold mb-2 text-amber-300">¡Felicidades!</h1>
      <img src="/trophy.png" alt="trofeo" width="350px" height="350px"/>
      <p className="text-3xl text-white font-bold">🏅 {username} has ganado la partida 🏅</p>
      <Link to="/" className="mt-6 px-6 py-4 bg-white text-amber-500 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition">
        Jugar otra vez
      </Link>
    </div>
  );
};

export default Winner;
