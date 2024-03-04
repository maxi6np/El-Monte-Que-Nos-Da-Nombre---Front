
import { Marker, Popup, useMap } from "react-leaflet";


function MarkersPuntos({ puntos }) {
    const map = useMap();
    return (
        puntos.length > 0 &&
        puntos.map((marker, index) => {
            return (
                <Marker
                    eventHandlers={{
                        click: () => {
                            map.setView(
                                [
                                    marker.latitud,
                                    marker.longitud
                                ],
                                20
                            );
                        }
                    }}
                    key={index}
                    position={[marker.latitud,marker.longitud]}
                >
                    <Popup>
                        <span><b>{marker.nombre}</b></span><br></br>
                        <span>{marker.descripcion}</span>
                    </Popup>
                </Marker>
            );
        })
    );
}

export default MarkersPuntos;


