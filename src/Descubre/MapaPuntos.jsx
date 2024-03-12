import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import MarkersPuntos from "./MarkersPuntos";

function MapaPuntos({ setSelectPoint, selectPoint, CentrarMapa, latlong, latlongBase }) {
  const [puntos, setPuntos] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);
  const zoomLevel = 13;
  

  const ZoomReset = () => {
    const map = useMapEvents({
      contextmenu() {
        map.setView(latlongBase, zoomLevel);
        map.closePopup();
        setSelectPoint([])
      },
    });
  };


  useEffect(() => {
    let body = JSON.stringify({
      token: (cookies.session ? cookies.session.token : '')
    })
    fetch("http://127.0.0.1:8000/mapa-puntos", {
      method: "post", body: body,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => setPuntos(data.data));
  }, []);

  return (
    <>
      <MapContainer
        center={latlong}
        zoom={zoomLevel}
        minZoom={zoomLevel}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100%", border: '1px solid black', borderRadius: '4px' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkersPuntos puntos={puntos} selectPoint={selectPoint}></MarkersPuntos>
        <ZoomReset></ZoomReset>
        <CentrarMapa latlong={latlong}></CentrarMapa>
      </MapContainer>
    </>
  );
}

export default MapaPuntos;
