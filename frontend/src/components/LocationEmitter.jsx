import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";

const LocationEmitter = ({ user }) => {
  const { sendMessage } = useSocket();

  useEffect(() => {
    if (!user?._id) return;

    // Function to emit location updates
    const sendLocation = (pos) => {
      const { latitude, longitude } = pos.coords;

      sendMessage("location", {
        userId: user._id,
        lat: latitude,
        lng: longitude,
      });
    };

    // Start watching the user's location
    const watcherId = navigator.geolocation.watchPosition(
      sendLocation,
      (err) => console.error("Geolocation error:", err),
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000,
      }
    );

    // Clear the location watcher on unmount
    return () => {
      navigator.geolocation.clearWatch(watcherId);
    };
  }, [sendMessage, user]);

  return null;
};

export default LocationEmitter;
