import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapaPuntos() {
    const [puntos, setPuntos] = useState(null)

    useEffect(() => {
        const map = L.map('map').setView([43.3736, -5.8500], 13);
        const tiles = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        let marker = null;
        const myIcon = L.icon({
            iconUrl: './img/balon.svg',
            iconSize: [35, 35],
            iconAnchor: [17, 35],
            popupAnchor: [0, -35]
        });

        fetch('http://127.0.0.1:8000/mapa-puntos')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPuntos(data);

                // Iterar sobre puntos aquí, después de que puntos esté definido
                data.forEach(punto => {
                    marker = L.marker([punto.latitud, punto.longitud]).addTo(map)
                        .bindPopup(`<b>${punto.nombre}</b>`);
                    marker.on('click', function (e) {
                        map.setView(this.getLatLng(), 20);
                    });
                });
            })
            .catch(error => {
                console.error('Error en la solicitud fetch:', error);
            });

        map.on('contextmenu', () => {
            map.setView([40, -3.7], 6);
            map.closePopup();
        });

        // Clean up function
        return () => {
            map.off(); // Remove all event listeners
            map.remove(); // Remove the map instance
        };

    }, []); // Run this effect only once on mount

    return (
        <div id="map" style={{ width: '80%', height: '80vh' }}></div>
    );
}

export default MapaPuntos;
