import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import MarkersRutas from "./MarkersRutas";

function MapaRutas({puntosSeleccionados, setPuntosSeleccionados}) {
  const [puntos, setPuntos] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);
  const zoomLevel = 13;
  const latlong = [43.3885, -5.8112];

  const ZoomReset = () => {
    const map = useMapEvents({
      contextmenu() {
        map.setView(latlong, zoomLevel);
        map.closePopup();
        setPuntosSeleccionados([])
      },
    });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/mapa-puntos", { method: "get" })
      .then((response) => response.json())
      .then((data) => setPuntos(data));
  }, []);

  return (
    <>
      <MapContainer
        center={latlong}
        zoom={zoomLevel}
        minZoom={zoomLevel}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkersRutas puntos={puntos} puntosSeleccionados={puntosSeleccionados}></MarkersRutas>
        <ZoomReset/>
      </MapContainer>
    </>
  );
}

export default MapaRutas;
