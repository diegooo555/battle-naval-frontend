import React from "react";
import { useNavigate } from "react-router";

const WaitingBattle = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="absolute w-full h-full flex items-center justify-center opacity-100 flex-col z-10 bg-white">
      <img src="/loading.svg" alt="Cargando..." className="w-40 h-40 mb-6 animate-spin" />
      <span className="text-[#25323A] font-bold text-4xl mb-6">Emparejando...</span>
      <button
        onClick={handleGoHome}
        className="bg-[#25323A] text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg hover:bg-[#1c282f] transition-all duration-200"
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default WaitingBattle;
