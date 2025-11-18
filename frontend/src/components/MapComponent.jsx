import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MAPTILER_KEY = "boSOFm5q5pXNVPyyoyHi"; // replace with your real key

const LiveLocationMarker = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng]);
    }
  }, [location, map]);
  return location ? <Marker position={[location.lat, location.lng]} /> : null;
};

const MapComponent = () => {
  const [location, setLocation] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Initial fetch
      navigator.geolocation.getCurrentPosition(
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

      // Poll every 10 seconds
      intervalRef.current = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
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
      }, 10000);
    } else {
      alert("Geolocation is not supported by your browser.");
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <MapContainer
      center={location ? [location.lat, location.lng] : [23.8103, 90.4125]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-screen w-full -z-10 "
    >
      <TileLayer
        url={`https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.webp?key=${MAPTILER_KEY}`}
        attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> & <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <LiveLocationMarker location={location} />
    </MapContainer>
  );
};

export default MapComponent;
