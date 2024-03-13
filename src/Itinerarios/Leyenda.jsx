
import L from "leaflet";
import Gicon from "../img/marker-icon-green.png";
import Bicon from "../img/marker-icon-blue.png";
import { useMap } from "react-leaflet";
import { useEffect } from "react";


function Leyenda()  {

    const map = useMap();
    useEffect(() => {
        const legend = L.control({ position: "bottomright" });
        legend.onAdd = () => {
            const etiquetas = [];
            const div = L.DomUtil.create("div");
            etiquetas.push(
                '<img src="' + Gicon + '" style="width:15%"> Visitado'
            );
            etiquetas.push(
                '<img src="' + Bicon + '" style="width:15%"> No visitado'
            );

            div.innerHTML = etiquetas.join('<br><br>')
            div.style.background ='rgba(255, 255, 255, 0.8)';
            div.style.padding = '2em'
            div.style
            return div;
        }
        legend.addTo(map);
    }, [map])
    return null

}

export default Leyenda;
