import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import Flag from "../Flag";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([22.809674, 89.562997]);
  const { isLoading, position, getPosition } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([Number(mapLat), Number(mapLng)]);
    },
    [mapLat, mapLng]
  );

  console.log(position.lat);

  useEffect(
    function () {
      if (position) setMapPosition([position.lat || 40, position.lng || 0]);
    },
    [position]
  );

  return (
    // <div className={styles.mapContainer} onClick={() => navigate("form")}>
    <div className={styles.mapContainer}>
      <Button type={"position"} onClick={getPosition}>
        {isLoading ? "Loading...." : "Use Your Location"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((el) => (
          <Marker position={[el.position.lat, el.position.lng]} key={el.id}>
            <Popup>
              <span>{Flag(el.emoji)}</span>
              {el.cityName}
            </Popup>
          </Marker>
        ))}
        <ChangeCity position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCity({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
