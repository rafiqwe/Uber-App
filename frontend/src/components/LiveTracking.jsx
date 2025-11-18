import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

const LiveLocationMarker = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng]);
    }
  }, [location, map]);
  return location ? <Marker position={[location.lat, location.lng]} /> : null;
};

export const LiveTracking = () => {
  const [location, setLocation] = useState(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Geolocation error:", err);
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <MapContainer
      center={location ? [location.lat, location.lng] : [23.8103, 90.4125]}
      zoom={15}
      className="h-screen w-full"
      style={{ height: "100vh", width: "100%" }}
      scrollWheelZoom={true}
      dragging={true}
      zoomControl={true}
      doubleClickZoom={true}
      touchZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LiveLocationMarker location={location} />
    </MapContainer>
  );
};
