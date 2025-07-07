// context/SocketContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

const SOCKET_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected:", socketRef.current.id);
      setIsConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (event, payload) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, payload);
    } else {
      console.warn("⚠️ Cannot send message: Socket not connected");
    }
  };

  const onMessage = (event, callback) => {
    if (!socketRef.current) return () => {};

    socketRef.current.on(event, callback);

    return () => {
      socketRef.current.off(event, callback);
    };
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        sendMessage,
        onMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
