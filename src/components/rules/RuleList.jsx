import React from "react";

const rules = [
  "Se juega en un tablero cuadriculado con números en horizontal y letras en vertical (10×10).",
  "Cada jugador coloca sus barcos en el tablero sin que el otro jugador pueda verlos.",
  "Los jugadores se turnan para indicar las coordenadas de una casilla del tablero del oponente.",
  'Si el casillero está vacío, el oponente dice "agua".',
  'Si el casillero está ocupado por un barco del oponente, el oponente dice "tocado", "averiado" o "impacto".',
  "Un barco se hunde cuando todos los casilleros que ocupa han sido atacados.",
  "El jugador que hunda toda la flota de su oponente antes de que el oponente hunda la suya, gana el juego.",
];

const RuleList = () => {
  return (
    <ul className="list-disc ml-6 space-y-6 text-gray-800 text-lg">
      {rules.map((rule, index) => (
        <li key={index} className="font-bold text-xl">{rule}</li>
      ))}
    </ul>
  );
};

export default RuleList;
