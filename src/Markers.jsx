
import { Marker, Popup, useMap } from "react-leaflet";


function Markers({ puntos }) {
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
                        <span>{marker.nombre}</span>
                    </Popup>
                </Marker>
            );
        })
    );
}

export default Markers;


