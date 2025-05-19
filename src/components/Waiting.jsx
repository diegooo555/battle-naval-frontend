import React from "react";

const Waiting = () => (
  <div className="absolute w-full h-full flex items-center justify-center opacity-100 flex-col z-10">
    <img src="/loading.svg" alt="Cargando..." className="w-50 h-50" />
    <span className="text-[#25323A] font-bold text-4xl">Emparejando...</span>
  </div>
);

export default Waiting;
