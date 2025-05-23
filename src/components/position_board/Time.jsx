import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { IN_PROGRESS, POSIOTIONING } from "../../lib/constants";
import { getNameOponent } from "../../api/gameRequests.js";

function Time({ resultServer }) {
  const { gameId, playerId, username } = useParams();
  const navigate = useNavigate();

  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer;

    const handleNavigation = async () => {
      try {
        const response = await getNameOponent(username, gameId);
        const opponent = response.status === 200 ? response.data : "Oponente";
        navigate(`/battle/${gameId}/${playerId}/${username}/${opponent}`);
      } catch (error) {
        console.error("Error al obtener el nombre del oponente:", error);
        navigate(`/battle/${gameId}/${playerId}/${username}/Oponente`);
      }
    };

    if (resultServer === IN_PROGRESS || time === 90) {
      handleNavigation();
    }

    if (time < 90 && resultServer === POSIOTIONING) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [time, resultServer, navigate, gameId, playerId, username]);

  return resultServer === POSIOTIONING && time < 90 ? (
    <span className="text-[#1500FF] font-bold text-2xl">{90 - time}</span>
  ) : (
    <span className="text-red-500 font-bold text-2xl">Tiempo Agotado</span>
  );
}

export default Time;
