// context/SocketContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

// Create the context
export const SocketContext = createContext();

// Custom hook to use the context
export const useSocket = () => useContext(SocketContext);

// Set the backend WebSocket server URL
const SOCKET_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null); // reactive socket
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ Socket connection failed:", err.message);
    });

    return () => {
      newSocket.disconnect();
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
        socket,
        isConnected,
        sendMessage,
        onMessage,
      }}
    >
      {/* Optionally delay rendering until socket is ready */}
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
