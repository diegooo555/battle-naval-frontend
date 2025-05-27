import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import BattlePage from "./pages/BattlePage";
import PositionShipsPage from "./pages/PositionShipsPage";
import { WebSockerProvider } from "./context/WebSocketContext";
import RulesPage from "./pages/Rules";
import Winner from "./pages/Winner";
import Loser from "./pages/Loser";
import Disconnect from "./pages/Disconnect";

function App() {
  return (
    <BrowserRouter>
      <WebSockerProvider>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route  path="/position-ships/:gameId/:playerId/:username"element={<PositionShipsPage/>}/>
          <Route path="/battle/:gameId/:playerId/:username/:opponent" element={<BattlePage/>}/>
          <Route path="/rules" element={<RulesPage/>}/>
          <Route path="/winner/:username" element={<Winner/>}/>
          <Route path="/loser/:username" element={<Loser/>}/>
          <Route path="/disconnect/:username" element={<Disconnect/>}/>
          <Route path="*" element={<h1>Not Found</h1>}/>
        </Routes> 
      </WebSockerProvider>
  </BrowserRouter>
  );
}

export default App;