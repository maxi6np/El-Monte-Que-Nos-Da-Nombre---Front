import { useEffect, useState } from "react";

 function Itinerarios(){
const [rutas, setRutas] = useState([]);

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/get-rutas', {method:'get'})
            .then(response => response.json())
            .then(data => {setRutas(data.data); console.log(rutas)});
    }, []);
 }


 export default Itinerarios