import { Marker, Popup, useMap } from "react-leaflet";

function MarkersRutas({ puntos, puntosSeleccionados }) {
    const map = useMap();
    const puntosAUsar = (puntosSeleccionados.length > 0) ? puntosSeleccionados : puntos;

    return (
        puntosAUsar.length > 0 &&
        puntosAUsar.map((marker, index) => {
            return (
                <Marker
                    eventHandlers={{
                        click: () => {
                            map.setView(
                                [
                                    marker.latitud + 0.0005,
                                    marker.longitud + 0.001
                                ],
                                18
                            );
                        }
                    }}
                    key={index}
                    position={[marker.latitud, marker.longitud]}
                >
                    <Popup>
                        <div style={{ maxWidth: '350px', marginBottom: '1rem' }}>
                            <img style={{ maxWidth: '100%', height: 'auto' }} src={marker.imagen} alt={marker.nombre} />
                        </div>
                        <span><b>{marker.nombre}</b></span><br></br>
                        <span>{marker.descripcion}</span>
                    </Popup>
                </Marker>
            );
        })
    );
}

export default MarkersRutas;
