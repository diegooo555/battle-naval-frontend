import { Client } from "@stomp/stompjs";

const URL_SOCKET = import.meta.env.VITE_BACKEND_SOCKET_URL;

const disconnect = (stompClient) => {
    if (stompClient.current) {
      stompClient.current.deactivate();
    }
};

const disconnectGame = (stompClient, player) => {
  if(stompClient.current){
    sendMessage(stompClient, player, "disconnect");
  }
}

const connect = (stompClient, username, id, setResultServer) => {
  return new Promise((resolve, reject) => {
    if (!username)return;

    // Si ya hay una conexión activa, la desconectamos primero
    if (stompClient.current && stompClient.current.connected) {
      disconnect(stompClient);
    }

    stompClient.current = new Client({
      brokerURL: `${URL_SOCKET}/gs-guide-websocket?id=${id}`,
      onConnect: () => {
        stompClient.current.subscribe(
          "/user/queue/position-updates",
          (messageServer) => {
            const newMessage = JSON.parse(messageServer.body).content;
            setResultServer(newMessage);
          }
        );

        resolve(true); // Resolvemos con true para indicar que la conexión fue exitosa
      },
      onStompError: (frame) => {
        console.error("❌ Error en STOMP: ", frame.headers.message);
        reject(frame.headers.message);
      },
      onWebSocketError: (error) => {
        reject(error);
      },
    });

    stompClient.current.activate();
  });
};

const sendMessage = (stompClient, object, endpoint) => {
  if (stompClient.current && stompClient.current.connected) {
   
    stompClient.current.publish({
      destination: `/app/${endpoint}`,
      body: JSON.stringify(object),
    });
  } else {
    console.warn("⚠️ No se puede enviar el mensaje porque la conexión aún no está establecida.");
  }
};


export { connect, disconnect, sendMessage, disconnectGame };