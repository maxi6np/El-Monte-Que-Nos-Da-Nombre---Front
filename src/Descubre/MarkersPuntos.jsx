import { Marker, Popup, useMap } from "react-leaflet";
import Bicon from "../img/marker-icon-blue.png";
import { Icon } from "leaflet";

function MarkersPuntos({ puntos, selectPoint }) {
    const map = useMap();
    const puntosAUsar = (selectPoint != '') ? [selectPoint] : puntos;

    return (
        puntosAUsar.map((marker, index) => (
            <Marker
                key={index}
                icon={new Icon({iconUrl:Bicon})}
                position={[marker.latitud, marker.longitud]}
                
                eventHandlers={{
                    click: () => {
                        map.setView(
                            [marker.latitud, marker.longitud],
                            20
                        );
                    }
                }}
            >
                <Popup>
                    <span><b>{marker.nombre}</b></span><br></br>
                    <span>{marker.descripcion}</span>
                </Popup>
            </Marker>
        ))
    );
}

export default MarkersPuntos;
