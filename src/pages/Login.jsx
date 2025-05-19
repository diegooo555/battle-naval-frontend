import { useRef} from "react";
import ButtonLogin from "../components/ButtonLogin";
import { getGameId } from "../api/gameRequests";
import { useNavigate } from "react-router";

const Login = () => {
  const inputNameRef = useRef(null);

  const navigate = useNavigate();

  /** Conectar y luego enviar el mensaje cuando esté listo */
  const searchGame = async () => {
    try {
      const response = await getGameId(inputNameRef.current.value);
      if(response.status === 200){
        const {gameId, playerId} = response.data;
        navigate(`/position-ships/${gameId}/${playerId}/${inputNameRef.current.value}`);
      }

    } catch (error) {
      console.error("❌ Error al conectar:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="h-full flex-shrink-0">
        <img src="/logo.png" alt="Logo" className="h-full object-contain" />
      </div>

      <div className="flex-grow h-full flex flex-col items-center justify-center gap-y-14">
        <h1 className="text-[#25323A] font-bold text-6xl">¡Bienvenido!</h1>
        <form action="" className="flex flex-col w-[60%]">
          <label htmlFor="name-user">Ingresa tu Usuario</label>
          <input
            type="text"
            className="border-b-[#767039] border-b-2 outline-none focus:outline-none appearance-none text-[#767039] text-4xl"
            id="name-user"
            ref={inputNameRef}
          />
        </form>

        <div className="w-full flex justify-center gap-x-20">
          <ButtonLogin color={"brown"} text={"Buscar Partida"} onClick={searchGame} />
          <a href="/rules" className="bg-[#25323A] text-white text-bold rounded-[4px] p-3 cursor-pointer text-3xl">
            ¿Cómo jugar?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;