import React from "react";
import RuleList from "../components/rules/RuleList";
import CannonImage from "../components/rules/CannonImage";

const RulesPage = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#f4f1e9] h-screen w-screen max-md:flex-col max-md:h-auto">
      <div className="w-[60%] p-6 flex flex-col justify-around items-center max-md:w-full">
        <h1 className="text-3xl font-bold text-white bg-[#6b6d40] px-4 py-2 mb-4 rounded font-itim">
          REGLAS DEL JUEGO
        </h1>
        <RuleList />
        <a href="/" className="mt-6 px-6 py-2 bg-[#6b6d40] text-white rounded shadow hover:bg-[#5a5b36] transition font-itim text-2xl">
          Atrás
        </a>
      </div>
      <div className="w-[40%] h-full flex justify-center items-center max-md:w-full">
        <CannonImage />
      </div>
    </div>
  );
};

export default RulesPage;
